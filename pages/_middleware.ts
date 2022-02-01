import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { USER_TOKEN } from '../lib/jwt/constants'
import { verifyJWT } from '../lib/jwt/jwt-token'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	// Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
	// if (req.nextUrl.pathname === '/asdasd') {
	// 	const hasCookie = JSON.parse(req.cookies[USER_TOKEN] || 'false')
	// 	if (!hasCookie) {
	// 		return redirectToSignup()
	// 	}
	// 	const jwtToken = verifyJWT(hasCookie)
	// 	if (!jwtToken) {
	// 		return redirectToSignup()
	// 	}
	// }
}

function redirectToSignup() {
	return NextResponse.redirect('/signup')
}
