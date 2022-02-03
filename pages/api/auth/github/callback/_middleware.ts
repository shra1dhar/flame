import { NextRequest, NextResponse } from 'next/server'
import { getUserGithubDetails } from '../../../../../lib/github-api'
import { createJWTToken } from '../../../../../lib/jwt/jwt-token'
import { setUserCookie } from '../../../../../lib/jwt/set-jwt-cookie'

// @TODO - To prevent CSRF attack, add an unguessable string as 'state' parameter
// check the value of state and compare in this middlewareMore on here:
// https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
export async function middleware(req: NextRequest) {
	const { searchParams } = req.nextUrl
	const githubCode = searchParams.get('code')

	if (!githubCode || typeof githubCode !== 'string') {
		return new Response('Unable to process request. F**k y**', {
			status: 422,
		})
	}

	// Github has authorized us. Onboard the user now
	const { code, hasError } = await getGithubAccessToken(githubCode)
	if (hasError || !code) {
		return new Response('Not authorised', {
			status: 401,
		})
	}
	console.log(code)
	const { hasError: hasGithubApiFailed, data: user } = await getUserGithubDetails(code)
	if (hasGithubApiFailed) {
		return new Response('Internal Server Error. Try after sometime', {
			status: 404,
		})
	}

	const jwtToken = createJWTToken({ code, ...user })

	// set JWT cookie in response
	const res = NextResponse.redirect('/home')
	setUserCookie(req, res, jwtToken)
	return res
}

interface AccessToken {
	code: string
	hasError: boolean
}

async function getGithubAccessToken(code: string): Promise<AccessToken> {
	const URI = 'https://github.com/login/oauth/access_token'
	const body = {
		client_id: process.env.GITHUB_CLIENT_ID!,
		client_secret: process.env.GITHUB_CLIENT_SECRET!,
		code,
	}

	try {
		const response = await fetch(URI, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})

		const data = await response.json()
		return { code: data.access_token, hasError: false }
	} catch (e) {
		return { code: '', hasError: true }
	}
}
