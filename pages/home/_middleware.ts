import { USER_TOKEN } from '@lib/jwt/constants'
import { verifyJWT } from '@lib/jwt/jwt-token'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	// Only rewrite requests to `/home`, as _middleware on the `/pages` root will be executed in every request of the app.
	if (req.nextUrl.pathname === '/home') {
		debugger
		const hasCookie = req.cookies[USER_TOKEN]
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
	return NextResponse.redirect('/signup')
}
