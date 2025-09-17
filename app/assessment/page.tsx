"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Heart, Brain, Moon, Users, BookOpen, Zap } from "lucide-react"

interface AssessmentData {
  stressLevel: number
  anxietyLevel: number
  depressionLevel: number
  sleepQuality: number
  academicPressure: number
  socialSupport: number
  copingMechanisms: string[]
  additionalConcerns: string
}

const copingOptions = [
  "Exercise/Physical Activity",
  "Meditation/Mindfulness",
  "Talking to Friends/Family",
  "Listening to Music",
  "Reading/Journaling",
  "Gaming/Entertainment",
  "Creative Activities (Art, Music, etc.)",
  "Spending Time in Nature",
  "Professional Counseling",
  "Religious/Spiritual Practices",
]

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    stressLevel: 0,
    anxietyLevel: 0,
    depressionLevel: 0,
    sleepQuality: 0,
    academicPressure: 0,
    socialSupport: 0,
    copingMechanisms: [],
    additionalConcerns: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const totalSteps = 7
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleScaleChange = (field: keyof AssessmentData, value: number) => {
    setAssessmentData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCopingMechanismChange = (mechanism: string, checked: boolean) => {
    setAssessmentData((prev) => ({
      ...prev,
      copingMechanisms: checked
        ? [...prev.copingMechanisms, mechanism]
        : prev.copingMechanisms.filter((m) => m !== mechanism),
    }))
  }

  const calculateRiskLevel = (data: AssessmentData): string => {
    const averageNegative = (data.stressLevel + data.anxietyLevel + data.depressionLevel + data.academicPressure) / 4
    const positiveFactors = (data.sleepQuality + data.socialSupport) / 2

    const overallScore = averageNegative - positiveFactors * 0.3

    if (overallScore <= 3) return "low"
    if (overallScore <= 5) return "moderate"
    if (overallScore <= 7) return "high"
    return "severe"
  }

  const submitAssessment = async () => {
    setIsLoading(true)

    setTimeout(() => {
      router.push("/companion-assignment")
    }, 1000)
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      submitAssessment()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const ScaleQuestion = ({
    title,
    description,
    icon: Icon,
    field,
    lowLabel,
    highLabel,
  }: {
    title: string
    description: string
    icon: any
    field: keyof AssessmentData
    lowLabel: string
    highLabel: string
  }) => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto p-3 bg-emerald-100 rounded-full w-fit">
          <Icon className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 max-w-md mx-auto">{description}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleScaleChange(field, value)}
              className={`w-12 h-12 rounded-full border-2 font-semibold transition-all ${
                assessmentData[field] === value
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-emerald-400"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="text-center">
          <span className="text-lg font-semibold text-emerald-600">
            {assessmentData[field] > 0 ? `Selected: ${assessmentData[field]}` : "Please select a rating"}
          </span>
        </div>
      </div>
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ScaleQuestion
            title="Stress Level"
            description="How would you rate your current stress level?"
            icon={Zap}
            field="stressLevel"
            lowLabel="Very Low Stress"
            highLabel="Extremely High Stress"
          />
        )
      case 1:
        return (
          <ScaleQuestion
            title="Anxiety Level"
            description="How often do you experience anxiety or worry?"
            icon={Brain}
            field="anxietyLevel"
            lowLabel="Rarely Anxious"
            highLabel="Constantly Anxious"
          />
        )
      case 2:
        return (
          <ScaleQuestion
            title="Mood & Depression"
            description="How would you describe your overall mood lately?"
            icon={Heart}
            field="depressionLevel"
            lowLabel="Very Positive"
            highLabel="Very Low/Depressed"
          />
        )
      case 3:
        return (
          <ScaleQuestion
            title="Sleep Quality"
            description="How would you rate your sleep quality?"
            icon={Moon}
            field="sleepQuality"
            lowLabel="Very Poor Sleep"
            highLabel="Excellent Sleep"
          />
        )
      case 4:
        return (
          <ScaleQuestion
            title="Academic Pressure"
            description="How much academic pressure are you currently feeling?"
            icon={BookOpen}
            field="academicPressure"
            lowLabel="Very Low Pressure"
            highLabel="Overwhelming Pressure"
          />
        )
      case 5:
        return (
          <ScaleQuestion
            title="Social Support"
            description="How supported do you feel by friends, family, or peers?"
            icon={Users}
            field="socialSupport"
            lowLabel="No Support"
            highLabel="Very Supported"
          />
        )
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto p-3 bg-emerald-100 rounded-full w-fit">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Coping Strategies</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                What methods do you currently use to manage stress? (Select all that apply)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {copingOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={assessmentData.copingMechanisms.includes(option)}
                    onCheckedChange={(checked) => handleCopingMechanismChange(option, checked as boolean)}
                  />
                  <Label htmlFor={option} className="text-sm text-gray-700 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="concerns" className="text-gray-700">
                Additional concerns or specific areas you'd like help with (optional):
              </Label>
              <Textarea
                id="concerns"
                placeholder="Share any specific challenges, goals, or areas where you'd like support..."
                value={assessmentData.additionalConcerns}
                onChange={(e) => setAssessmentData((prev) => ({ ...prev, additionalConcerns: e.target.value }))}
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                rows={4}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return assessmentData.stressLevel > 0
      case 1:
        return assessmentData.anxietyLevel > 0
      case 2:
        return assessmentData.depressionLevel > 0
      case 3:
        return assessmentData.sleepQuality > 0
      case 4:
        return assessmentData.academicPressure > 0
      case 5:
        return assessmentData.socialSupport > 0
      case 6:
        return true // Optional step
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mental Health Assessment</h1>
          <p className="text-gray-600">
            This assessment helps us understand your current wellbeing and match you with the right support.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-gray-900">Assessment Questions</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Please answer honestly - your responses are completely confidential
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceed() || isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isLoading ? "Submitting..." : currentStep === totalSteps - 1 ? "Complete Assessment" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Your responses are encrypted and secure. This assessment takes about 5-7 minutes to complete.</p>
        </div>
      </div>
    </div>
  )
}
