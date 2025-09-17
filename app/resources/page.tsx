"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Heart,
  Brain,
  Dumbbell,
  BookOpen,
  Moon,
  Apple,
  Users,
  Search,
  Clock,
  Star,
  Play,
  FileText,
  Headphones,
  Target,
} from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  category: string
  content_type: string
  content: string
  url?: string
  difficulty_level: string
  estimated_time: number
  created_at: string
}

interface UserInteraction {
  resource_id: string
  interaction_type: string
  rating?: number
}

const categoryIcons = {
  mindfulness: Brain,
  exercise: Dumbbell,
  study_tips: BookOpen,
  sleep: Moon,
  nutrition: Apple,
  social: Users,
}

const contentTypeIcons = {
  article: FileText,
  video: Play,
  audio: Headphones,
  exercise: Target,
  tool: Target,
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
}

export default function ResourcesPage() {
  const [user, setUser] = useState<any>(null)
  const [resources, setResources] = useState<Resource[]>([])
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [userInteractions, setUserInteractions] = useState<UserInteraction[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeResources = async () => {
      const supabase = createClient()

      // Check user authentication
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)

      // Load resources
      const { data: resourcesData } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false })

      if (resourcesData) {
        setResources(resourcesData)
        setFilteredResources(resourcesData)
      }

      // Load user interactions
      const { data: interactionsData } = await supabase
        .from("user_resource_interactions")
        .select("resource_id, interaction_type, rating")
        .eq("user_id", user.id)

      if (interactionsData) {
        setUserInteractions(interactionsData)
      }

      setIsLoading(false)
    }

    initializeResources()
  }, [router])

  useEffect(() => {
    let filtered = resources

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((resource) => resource.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredResources(filtered)
  }, [resources, activeCategory, searchQuery])

  const trackInteraction = async (resourceId: string, interactionType: string, rating?: number) => {
    if (!user) return

    const supabase = createClient()

    try {
      await supabase.from("user_resource_interactions").upsert(
        {
          user_id: user.id,
          resource_id: resourceId,
          interaction_type: interactionType,
          rating: rating,
        },
        {
          onConflict: "user_id,resource_id,interaction_type",
        },
      )

      // Update local state
      setUserInteractions((prev) => {
        const filtered = prev.filter(
          (interaction) =>
            !(interaction.resource_id === resourceId && interaction.interaction_type === interactionType),
        )
        return [...filtered, { resource_id: resourceId, interaction_type: interactionType, rating }]
      })
    } catch (error) {
      console.error("Error tracking interaction:", error)
    }
  }

  const hasInteraction = (resourceId: string, interactionType: string) => {
    return userInteractions.some(
      (interaction) => interaction.resource_id === resourceId && interaction.interaction_type === interactionType,
    )
  }

  const getUserRating = (resourceId: string) => {
    const interaction = userInteractions.find(
      (interaction) => interaction.resource_id === resourceId && interaction.interaction_type === "rated",
    )
    return interaction?.rating || 0
  }

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const CategoryIcon = categoryIcons[resource.category as keyof typeof categoryIcons] || Heart
    const ContentIcon = contentTypeIcons[resource.content_type as keyof typeof contentTypeIcons] || FileText
    const isViewed = hasInteraction(resource.id, "viewed")
    const isBookmarked = hasInteraction(resource.id, "bookmarked")
    const isCompleted = hasInteraction(resource.id, "completed")
    const userRating = getUserRating(resource.id)

    return (
      <Card className={`border-0 shadow-lg transition-all hover:shadow-xl ${isViewed ? "bg-gray-50" : "bg-white"}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-full">
                <CategoryIcon className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">{resource.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <ContentIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 capitalize">{resource.content_type}</span>
                  <Clock className="h-4 w-4 text-gray-500 ml-2" />
                  <span className="text-sm text-gray-500">{resource.estimated_time} min</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={difficultyColors[resource.difficulty_level as keyof typeof difficultyColors]}>
                {resource.difficulty_level}
              </Badge>
              {isCompleted && <Badge className="bg-green-100 text-green-700">Completed</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 mb-4">{resource.description}</CardDescription>

          {resource.content && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 whitespace-pre-line">{resource.content}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => trackInteraction(resource.id, "viewed")}
                className={`${isViewed ? "bg-emerald-100 text-emerald-700" : "bg-transparent"}`}
              >
                {isViewed ? "Viewed" : "View"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={
                  () => trackInteraction(resource.id, isBookmarked ? "viewed" : "bookmarked") // Toggle bookmark
                }
                className={`${isBookmarked ? "bg-yellow-100 text-yellow-700" : "bg-transparent"}`}
              >
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              {resource.content_type === "exercise" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => trackInteraction(resource.id, isCompleted ? "viewed" : "completed")}
                  className={`${isCompleted ? "bg-green-100 text-green-700" : "bg-transparent"}`}
                >
                  {isCompleted ? "Completed" : "Mark Complete"}
                </Button>
              )}
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => trackInteraction(resource.id, "rated", star)} className="p-1">
                  <Star
                    className={`h-4 w-4 ${
                      star <= userRating ? "text-yellow-400 fill-current" : "text-gray-300"
                    } hover:text-yellow-400 transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user || isLoading) {
    return <div>Loading...</div>
  }

  const categories = [
    { id: "all", label: "All Resources", icon: Heart },
    { id: "mindfulness", label: "Mindfulness", icon: Brain },
    { id: "exercise", label: "Exercise", icon: Dumbbell },
    { id: "study_tips", label: "Study Tips", icon: BookOpen },
    { id: "sleep", label: "Sleep", icon: Moon },
    { id: "nutrition", label: "Nutrition", icon: Apple },
    { id: "social", label: "Social", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Wellbeing Resources</h1>
            <p className="text-gray-600">
              Discover tools, exercises, and strategies to support your mental health and academic success.
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 bg-white border border-gray-200">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <TabsContent value={activeCategory} className="mt-6">
              {filteredResources.length === 0 ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="py-12 text-center">
                    <div className="mx-auto p-4 bg-gray-100 rounded-full w-fit mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
                    <p className="text-gray-600">
                      {searchQuery
                        ? "Try adjusting your search terms or browse different categories."
                        : "No resources available in this category yet."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Quick Stats */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-emerald-600">
                    {userInteractions.filter((i) => i.interaction_type === "viewed").length}
                  </p>
                  <p className="text-sm text-gray-600">Resources Viewed</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-yellow-600">
                    {userInteractions.filter((i) => i.interaction_type === "bookmarked").length}
                  </p>
                  <p className="text-sm text-gray-600">Bookmarked</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-green-600">
                    {userInteractions.filter((i) => i.interaction_type === "completed").length}
                  </p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-purple-600">
                    {userInteractions.filter((i) => i.interaction_type === "rated").length}
                  </p>
                  <p className="text-sm text-gray-600">Rated</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
