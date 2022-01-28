import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { JWT_COOKIE_NAME } from '../lib/jwt-token/constants'
import { verifyJWT } from '../lib/jwt-token'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	// Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
	if (req.nextUrl.pathname === '/') {
		const hasCookie = JSON.parse(req.cookies[JWT_COOKIE_NAME] || 'false')

		if (!hasCookie) {
			return redirectToSignup()
		}

		const jwtToken = verifyJWT(hasCookie)
		if (!jwtToken) {
			return redirectToSignup()
		}
	}
}

function redirectToSignup() {
	return NextResponse.rewrite('/signup')
}
