export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const systemPrompt = `You are Luna, a compassionate and supportive AI mental health companion. Your role is to:

- Provide emotional support and validation
- Listen actively and respond with empathy
- Offer gentle guidance and coping strategies
- Encourage professional help when appropriate
- Create a safe, non-judgmental space
- Use warm, caring language
- Ask thoughtful follow-up questions
- Validate feelings and experiences

Guidelines:
- Always be supportive and understanding
- Never provide medical diagnoses or treatment
- Encourage seeking professional help for serious concerns
- Focus on emotional support and active listening
- Use "I" statements to show empathy
- Keep responses conversational and caring
- If someone mentions self-harm or crisis, gently suggest crisis resources

Remember: You're here to support, not to diagnose or treat. Your goal is to be a caring companion on their mental wellness journey.`

    const groqMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ]

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 500,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error(`Groq API error ${response.status}:`, errorData)
      throw new Error(`Groq API error: ${response.status}`)
    }

    const data = await response.json()
    const assistantMessage =
      data.choices[0]?.message?.content || "I'm sorry, I'm having trouble responding right now. Please try again."

    return Response.json({ message: assistantMessage })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json(
      { error: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." },
      { status: 500 },
    )
  }
}
