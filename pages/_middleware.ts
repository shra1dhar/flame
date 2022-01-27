import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { JWT_COOKIE_NAME } from '../lib/jwt-token/constants'
import jwt from 'jsonwebtoken'
import { isJWTVerified } from '../lib/jwt-token'

const KEY = process.env.JWT_CRYPT_KEY as string

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	// Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
	if (req.nextUrl.pathname === '/') {
		// Parse the cookie
		const hasCookie = JSON.parse(req.cookies[JWT_COOKIE_NAME] || 'false')

		if (!hasCookie && !isJWTVerified(hasCookie)) {
			return redirectToSignup()
		}
	}
}

function redirectToSignup() {
	return NextResponse.rewrite('/signup')
}
