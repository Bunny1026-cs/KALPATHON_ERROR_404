"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  AlertTriangle,
  Heart,
  Users,
  Building,
  ExternalLink,
  Shield,
  Headphones,
} from "lucide-react"

interface HelpResource {
  id: string
  name: string
  description: string
  type: "crisis" | "counseling" | "support_group" | "online" | "campus"
  contact: string
  hours: string
  cost: string
  location?: string
  website?: string
  isEmergency?: boolean
}

const helpResources: HelpResource[] = [
  // Crisis Resources
  {
    id: "988",
    name: "988 Suicide & Crisis Lifeline",
    description: "24/7 free and confidential support for people in distress and crisis prevention.",
    type: "crisis",
    contact: "988",
    hours: "24/7",
    cost: "Free",
    website: "https://988lifeline.org",
    isEmergency: true,
  },
  {
    id: "crisis-text",
    name: "Crisis Text Line",
    description: "Free, 24/7 crisis support via text message.",
    type: "crisis",
    contact: "Text HOME to 741741",
    hours: "24/7",
    cost: "Free",
    website: "https://crisistextline.org",
    isEmergency: true,
  },
  {
    id: "emergency",
    name: "Emergency Services",
    description: "For immediate life-threatening emergencies.",
    type: "crisis",
    contact: "911",
    hours: "24/7",
    cost: "Varies",
    isEmergency: true,
  },

  // Professional Counseling
  {
    id: "betterhelp",
    name: "BetterHelp",
    description: "Online therapy platform with licensed therapists.",
    type: "online",
    contact: "Online Platform",
    hours: "Flexible",
    cost: "$60-90/week",
    website: "https://betterhelp.com",
  },
  {
    id: "talkspace",
    name: "Talkspace",
    description: "Text, audio, and video therapy with licensed therapists.",
    type: "online",
    contact: "Online Platform",
    hours: "Flexible",
    cost: "$69-109/week",
    website: "https://talkspace.com",
  },
  {
    id: "campus-counseling",
    name: "Campus Counseling Center",
    description: "Free or low-cost counseling services for students.",
    type: "campus",
    contact: "Contact your university",
    hours: "Varies by campus",
    cost: "Free or low-cost",
    location: "On campus",
  },

  // Support Groups
  {
    id: "nami",
    name: "NAMI Support Groups",
    description: "Peer support groups for mental health conditions.",
    type: "support_group",
    contact: "Find local chapter",
    hours: "Varies",
    cost: "Free",
    website: "https://nami.org",
  },
  {
    id: "anxiety-depression",
    name: "Anxiety and Depression Association",
    description: "Support groups and resources for anxiety and depression.",
    type: "support_group",
    contact: "Online and in-person",
    hours: "Varies",
    cost: "Free",
    website: "https://adaa.org",
  },

  // Online Resources
  {
    id: "7cups",
    name: "7 Cups",
    description: "Free emotional support and online therapy.",
    type: "online",
    contact: "Online Platform",
    hours: "24/7",
    cost: "Free basic, paid premium",
    website: "https://7cups.com",
  },
  {
    id: "mindfulness-apps",
    name: "Mental Health Apps",
    description: "Headspace, Calm, Insight Timer for meditation and mindfulness.",
    type: "online",
    contact: "Mobile Apps",
    hours: "24/7",
    cost: "Free and paid options",
  },
]

const typeIcons = {
  crisis: AlertTriangle,
  counseling: Heart,
  support_group: Users,
  online: MessageCircle,
  campus: Building,
}

const typeColors = {
  crisis: "bg-red-100 text-red-700 border-red-200",
  counseling: "bg-blue-100 text-blue-700 border-blue-200",
  support_group: "bg-purple-100 text-purple-700 border-purple-200",
  online: "bg-green-100 text-green-700 border-green-200",
  campus: "bg-orange-100 text-orange-700 border-orange-200",
}

export default function HelpPage() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("crisis")
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
      } else {
        setUser(user)
      }
    }
    checkUser()
  }, [router])

  const HelpResourceCard = ({ resource }: { resource: HelpResource }) => {
    const TypeIcon = typeIcons[resource.type]
    const typeColorClass = typeColors[resource.type]

    return (
      <Card
        className={`border-0 shadow-lg transition-all hover:shadow-xl ${
          resource.isEmergency ? "border-l-4 border-l-red-500" : ""
        }`}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${resource.isEmergency ? "bg-red-100" : "bg-emerald-100"}`}>
                <TypeIcon className={`h-5 w-5 ${resource.isEmergency ? "text-red-600" : "text-emerald-600"}`} />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">{resource.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={typeColorClass}>{resource.type.replace("_", " ")}</Badge>
                  {resource.isEmergency && <Badge className="bg-red-100 text-red-700">Emergency</Badge>}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 mb-4">{resource.description}</CardDescription>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                <strong>Contact:</strong> {resource.contact}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                <strong>Hours:</strong> {resource.hours}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                <strong>Cost:</strong> {resource.cost}
              </span>
            </div>

            {resource.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  <strong>Location:</strong> {resource.location}
                </span>
              </div>
            )}

            {resource.website && (
              <div className="pt-2">
                <Button asChild variant="outline" size="sm" className="bg-transparent">
                  <a href={resource.website} target="_blank" rel="noopener noreferrer">
                    Visit Website <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const tabs = [
    { id: "crisis", label: "Crisis Support", icon: AlertTriangle },
    { id: "counseling", label: "Professional Help", icon: Heart },
    { id: "support_group", label: "Support Groups", icon: Users },
    { id: "online", label: "Online Resources", icon: MessageCircle },
    { id: "campus", label: "Campus Resources", icon: Building },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Help & Support</h1>
            <p className="text-gray-600">
              Find professional mental health resources, crisis support, and community help when you need it most.
            </p>
          </div>

          {/* Emergency Alert */}
          <Card className="border-0 shadow-lg mb-8 border-l-4 border-l-red-500 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-900">In Crisis? Get Help Now</h3>
                  <p className="text-red-700 text-sm">
                    If you're having thoughts of suicide or self-harm, please reach out immediately.
                  </p>
                  <div className="flex gap-4 mt-2">
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <a href="tel:988">Call 988</a>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="border-red-300 text-red-700 bg-transparent">
                      <a href="sms:741741">Text 741741</a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resource Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white border border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {helpResources
                    .filter((resource) => resource.type === tab.id)
                    .map((resource) => (
                      <HelpResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Additional Information */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-lg">Your Privacy Matters</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• All conversations with mental health professionals are confidential</li>
                  <li>• Crisis hotlines are anonymous and free</li>
                  <li>• Your personal information is protected by privacy laws</li>
                  <li>• You have the right to choose your level of care</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-lg">What to Expect</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Initial assessment to understand your needs</li>
                  <li>• Collaborative treatment planning</li>
                  <li>• Regular check-ins and progress monitoring</li>
                  <li>• Referrals to additional resources when needed</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Back to Dashboard */}
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="bg-transparent">
              <a href="/dashboard">Return to Dashboard</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
