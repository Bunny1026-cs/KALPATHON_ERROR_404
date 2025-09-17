"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Phone, MessageCircle, Clock, ExternalLink } from "lucide-react"

const crisisResources = [
  {
    name: "988 Suicide & Crisis Lifeline",
    description: "Free, confidential support 24/7 for people in suicidal crisis or emotional distress.",
    contact: "988",
    contactType: "phone",
    hours: "24/7",
    website: "https://988lifeline.org",
  },
  {
    name: "Crisis Text Line",
    description: "Free, 24/7 crisis support via text message with trained crisis counselors.",
    contact: "Text HOME to 741741",
    contactType: "text",
    hours: "24/7",
    website: "https://crisistextline.org",
  },
  {
    name: "Emergency Services",
    description: "For immediate life-threatening emergencies requiring immediate medical attention.",
    contact: "911",
    contactType: "phone",
    hours: "24/7",
  },
  {
    name: "National Sexual Assault Hotline",
    description: "Free, confidential support for survivors of sexual violence.",
    contact: "1-800-656-4673",
    contactType: "phone",
    hours: "24/7",
    website: "https://rainn.org",
  },
  {
    name: "National Domestic Violence Hotline",
    description: "Support for those experiencing domestic violence or abuse.",
    contact: "1-800-799-7233",
    contactType: "phone",
    hours: "24/7",
    website: "https://thehotline.org",
  },
  {
    name: "Trans Lifeline",
    description: "Crisis support specifically for transgender individuals.",
    contact: "877-565-8860",
    contactType: "phone",
    hours: "24/7",
    website: "https://translifeline.org",
  },
]

const warningSignsData = [
  "Talking about wanting to die or kill themselves",
  "Looking for ways to kill themselves",
  "Talking about feeling hopeless or having no purpose",
  "Talking about feeling trapped or in unbearable pain",
  "Talking about being a burden to others",
  "Increasing use of alcohol or drugs",
  "Acting anxious, agitated, or reckless",
  "Sleeping too little or too much",
  "Withdrawing or feeling isolated",
  "Showing rage or talking about seeking revenge",
  "Displaying extreme mood swings",
]

const howToHelpData = [
  "Take all talk of suicide seriously",
  "Listen without judgment",
  "Ask directly about suicide",
  "Don't promise to keep it a secret",
  "Stay with the person or ensure they're not alone",
  "Remove any means of self-harm if possible",
  "Help them connect with professional help",
  "Follow up and stay connected",
]

export default function CrisisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto p-4 bg-red-100 rounded-full w-fit mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crisis Resources</h1>
            <p className="text-gray-600">Immediate help is available. You are not alone.</p>
          </div>

          {/* Immediate Help */}
          <Card className="border-0 shadow-lg mb-8 border-l-4 border-l-red-500 bg-red-50">
            <CardHeader>
              <CardTitle className="text-xl text-red-900">Need Help Right Now?</CardTitle>
              <CardDescription className="text-red-700">
                If you're in immediate danger or having thoughts of suicide, please reach out now.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white h-12">
                  <a href="tel:988" className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    Call 988
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-red-300 text-red-700 h-12 bg-transparent">
                  <a href="sms:741741" className="flex items-center justify-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Text 741741
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-red-300 text-red-700 h-12 bg-transparent">
                  <a href="tel:911" className="flex items-center justify-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Call 911
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Crisis Resources */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Crisis Support Resources</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {crisisResources.map((resource, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{resource.name}</CardTitle>
                    <CardDescription className="text-gray-600">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {resource.contactType === "phone" ? (
                          <Phone className="h-4 w-4 text-gray-500" />
                        ) : (
                          <MessageCircle className="h-4 w-4 text-gray-500" />
                        )}
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
              ))}
            </div>
          </div>

          {/* Warning Signs and How to Help */}
          <div className="grid gap-8 md:grid-cols-2 mb-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Warning Signs</CardTitle>
                <CardDescription className="text-gray-600">
                  Signs that someone may be considering suicide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {warningSignsData.map((sign, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      {sign}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">How to Help</CardTitle>
                <CardDescription className="text-gray-600">Ways to support someone in crisis</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {howToHelpData.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Safety Planning */}
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Create a Safety Plan</CardTitle>
              <CardDescription className="text-gray-600">
                A safety plan can help you stay safe during difficult times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Include in your safety plan:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Warning signs that crisis may be developing</li>
                    <li>• Coping strategies that help you feel better</li>
                    <li>• People and social settings that distract you</li>
                    <li>• People you can ask for help</li>
                    <li>• Professional contacts and agencies</li>
                    <li>• Ways to make your environment safe</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Emergency contacts to save:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 988 - Suicide & Crisis Lifeline</li>
                    <li>• 741741 - Crisis Text Line</li>
                    <li>• 911 - Emergency Services</li>
                    <li>• Your therapist or counselor</li>
                    <li>• Trusted friend or family member</li>
                    <li>• Campus counseling center</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to Help */}
          <div className="text-center">
            <Button asChild variant="outline" className="bg-transparent">
              <a href="/help">View All Professional Help Resources</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
