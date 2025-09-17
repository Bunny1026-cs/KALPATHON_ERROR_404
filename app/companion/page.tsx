"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect, useRef } from "react"
import { Send, Heart, User } from "lucide-react"

interface Message {
  id: string
  message: string
  sender: "user" | "companion"
  created_at: string
}

export default function CompanionPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      message:
        "Hi there! I'm Luna, and I'm here to support you through whatever you're going through. I want you to know that this is a safe space where you can share your thoughts and feelings without judgment. How are you feeling today?",
      sender: "companion",
      created_at: new Date().toISOString(),
    }
    setMessages([welcomeMessage])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const generateCompanionResponse = (userMessage: string): string => {
    // Simple response system
    const responses = [
      "I hear you, and I want you to know that your feelings are completely valid. It's okay to feel this way.",
      "Thank you for sharing that with me. It takes courage to open up about difficult feelings.",
      "I'm here with you through this. You don't have to face these challenges alone.",
      "Your feelings matter, and so do you. Let's work through this together.",
      "That sounds really challenging. How are you coping with these feelings?",
      "I appreciate you trusting me with this. What would be most helpful for you right now?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    setIsLoading(true)

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      message: newMessage,
      sender: "user",
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])

    // Generate and add companion response
    const companionResponse = generateCompanionResponse(newMessage)

    // Simulate thinking time
    setTimeout(() => {
      const companionMsg: Message = {
        id: (Date.now() + 1).toString(),
        message: companionResponse,
        sender: "companion",
        created_at: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, companionMsg])
      setIsLoading(false)
    }, 1500)

    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 rounded-full">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Luna</CardTitle>
                <p className="text-sm text-gray-600">Your supportive AI companion</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Chat Area */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === "companion" && (
                          <div className="p-1 bg-pink-100 rounded-full flex-shrink-0 mt-1">
                            <Heart className="h-3 w-3 text-pink-600" />
                          </div>
                        )}
                        {message.sender === "user" && (
                          <div className="p-1 bg-emerald-700 rounded-full flex-shrink-0 mt-1">
                            <User className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <p className="text-sm">{message.message}</p>
                      </div>
                      <p className="text-xs opacity-70 mt-1">{new Date(message.created_at).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100 text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-pink-100 rounded-full">
                          <Heart className="h-3 w-3 text-pink-600" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts with Luna..."
                  className="flex-1 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || isLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send • This is a supportive space for your mental wellness journey
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
