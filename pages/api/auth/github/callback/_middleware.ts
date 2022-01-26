import { NextRequest, NextResponse } from 'next/server'
import { getJWT } from '../../../../../lib/jwt-token'

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

	console.log('working =====> ')
	// Github has authorized us. Onboard the user now
	const { code, hasError } = await getGithubAccessToken(githubCode)
	if (hasError || !code) {
		return new Response('Not authorised', {
			status: 401,
		})
	}

	const jwtToken = getJWT({ code })
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
		console.log(data)
		return { code: '', hasError: true }
	} catch (e) {
		return { code: '', hasError: true }
	}
}
