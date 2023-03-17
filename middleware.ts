import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Clone the request headers
  // You can modify them with headers API: https://developer.mozilla.org/en-US/docs/Web/API/Headers
  const requestHeaders = new Headers(request.headers)

  // Add new request headers
  requestHeaders.set(
    "user-agent",
    "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"
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
