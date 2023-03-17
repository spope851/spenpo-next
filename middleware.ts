import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Clone the request headers
  // You can modify them with headers API: https://developer.mozilla.org/en-US/docs/Web/API/Headers
  const requestHeaders = new Headers(request.headers)

  // Add new request headers
  requestHeaders.set(
    "content-length",
    JSON.stringify(request.body).length.toString()
  )

  // Delete an existing request header
  //   requestHeaders.delete('x-from-client')

  // You can also set request headers in NextResponse.rewrite
  return NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })
}
