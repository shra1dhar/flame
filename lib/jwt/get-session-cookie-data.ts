import { JwtPayload } from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { Redirect } from 'next/types'
import { USER_TOKEN } from './constants'
import { verifyJWT } from './jwt-token'

interface SessionCookiePayload extends JwtPayload {
	name: string
	username: string
	avatarUrl: string
	reposUrl: string
	followersCount: number
	followingCount: number
	code: string
}

interface SessionCookieResponse {
	hasError: boolean
	jwtPayload: SessionCookiePayload
	redirectToSignup: Redirect
}

const redirect = {
	destination: '/signup',
	permanent: false,
}

const fallbackJWTData = {
	name: '',
	username: '',
	avatarUrl: '',
	reposUrl: '',
	followersCount: 0,
	followingCount: 0,
	code: '',
} as const

const invalidCaseResponse: SessionCookieResponse = {
	hasError: true,
	jwtPayload: fallbackJWTData,
	redirectToSignup: redirect,
} as const

const getCookieData = (req: NextRequest): SessionCookieResponse => {
	try {
		const hasCookie = req.cookies[USER_TOKEN]
		if (!hasCookie) {
			return { ...invalidCaseResponse }
		}

		const jwtPayload: any = verifyJWT(hasCookie)

		if (!jwtPayload || jwtPayload === 'string') {
			throw new Error('Invalid JWT token')
		}

		return { hasError: false, jwtPayload, redirectToSignup: redirect }
	} catch (err) {
		console.log('Parsing Github Access Code', err)
		return invalidCaseResponse
	}
}

export { getCookieData }
