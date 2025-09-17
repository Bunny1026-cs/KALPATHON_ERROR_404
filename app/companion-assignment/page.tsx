"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Heart, Brain, Sparkles, BookOpen, Loader2 } from "lucide-react"

interface CompanionType {
  type: "supportive" | "motivational" | "mindful" | "academic"
  name: string
  description: string
  personality: string[]
  icon: any
  color: string
  bgColor: string
}

const companionTypes: CompanionType[] = [
  {
    type: "supportive",
    name: "Luna",
    description:
      "A gentle, empathetic companion who provides emotional support and understanding during difficult times.",
    personality: ["Empathetic", "Patient", "Nurturing", "Good Listener"],
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    type: "motivational",
    name: "Phoenix",
    description: "An energetic, encouraging companion who helps you build confidence and overcome challenges.",
    personality: ["Encouraging", "Optimistic", "Goal-oriented", "Resilient"],
    icon: Sparkles,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    type: "mindful",
    name: "Sage",
    description: "A calm, wise companion focused on mindfulness, meditation, and finding inner peace.",
    personality: ["Peaceful", "Wise", "Mindful", "Balanced"],
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    type: "academic",
    name: "Atlas",
    description: "A knowledgeable, organized companion who helps with study strategies and academic stress management.",
    personality: ["Organized", "Analytical", "Supportive", "Strategic"],
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

export default function CompanionAssignmentPage() {
  const [recommendedCompanion, setRecommendedCompanion] = useState<CompanionType | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [isAssigning, setIsAssigning] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      // Default to supportive companion
      const companion = companionTypes.find((c) => c.type === "supportive")!
      setRecommendedCompanion(companion)
      setIsAnalyzing(false)
    }, 3000)
  }, [])

  const assignCompanion = async (companionType: CompanionType) => {
    setIsAssigning(true)

    setTimeout(() => {
      router.push("/companion")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meet Your AI Companion</h1>
          <p className="text-gray-600">
            Based on your assessment, we've analyzed your needs to find the perfect mental health companion for you.
          </p>
        </div>

        {isAnalyzing ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12">
              <div className="text-center space-y-4">
                <div className="mx-auto p-4 bg-emerald-100 rounded-full w-fit">
                  <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Analyzing Your Assessment</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Our AI is carefully reviewing your responses to match you with the most suitable companion...
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>✓ Processing stress and anxiety levels</p>
                  <p>✓ Evaluating sleep and academic factors</p>
                  <p>✓ Analyzing coping mechanisms</p>
                  <p>✓ Matching personality traits</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          recommendedCompanion && (
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900">Your Recommended Companion</CardTitle>
                  <CardDescription className="text-gray-600">
                    Based on your assessment results, here's your personalized AI companion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-6">
                    <div className={`mx-auto p-6 ${recommendedCompanion.bgColor} rounded-full w-fit`}>
                      <recommendedCompanion.icon className={`h-12 w-12 ${recommendedCompanion.color}`} />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-gray-900">{recommendedCompanion.name}</h2>
                      <p className="text-gray-600 max-w-2xl mx-auto text-lg">{recommendedCompanion.description}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Personality Traits</h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {recommendedCompanion.personality.map((trait) => (
                          <span
                            key={trait}
                            className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button
                        onClick={() => assignCompanion(recommendedCompanion)}
                        disabled={isAssigning}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg"
                      >
                        {isAssigning ? "Assigning..." : `Meet ${recommendedCompanion.name}`}
                      </Button>

                      <p className="text-sm text-gray-500">
                        You can always change your companion later in your settings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Don't worry - you can explore other companion types or retake your assessment anytime.
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
