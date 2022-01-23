import { NextRequest, NextResponse } from 'next/server'

// https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
export function middleware(req: NextRequest) {
	const scope = 'public_repo write:repo_hook read:repo_hook'
	const GITHUB_OAUTH_URI = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=${scope}`
	return NextResponse.redirect(GITHUB_OAUTH_URI)
}
