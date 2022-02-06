import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { USER_TOKEN } from '../lib/jwt/constants'
import { verifyJWT } from '../lib/jwt/jwt-token'

const publicRoutes = ['/signup']

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	const { pathname } = req.nextUrl
	const isPublicRoute = pathname.startsWith('/api/auth/github') || publicRoutes.includes(pathname)

	if (isPublicRoute) {
		return NextResponse.next()
	}

	try {
		const hasCookie = req.cookies[USER_TOKEN]
		if (!hasCookie) {
			return redirectToSignup()
		}

		const jwtToken = verifyJWT(hasCookie)
		if (!jwtToken) {
			return redirectToSignup()
		}

		;(req as any).githubCode = typeof jwtToken !== 'string' ? jwtToken.code : undefined
	} catch (err) {
		console.log('Failed to verify JWT Token', err)
		return redirectToSignup()
	}
}

function redirectToSignup() {
	return NextResponse.redirect('/signup')
}
