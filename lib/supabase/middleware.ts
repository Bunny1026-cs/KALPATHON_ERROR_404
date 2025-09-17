import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // In a production app, you'd want proper session management here
  return NextResponse.next({
    request,
  })
}
