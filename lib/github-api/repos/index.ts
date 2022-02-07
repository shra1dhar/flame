import { getCookieData } from '@lib/jwt/get-session-cookie-data'
import { NextRequest } from 'next/server'
import { getHeaders } from '..'

interface Repos {
	id: number
	name: string
	language: string
	pushedAt: string
	description: string
	starGazersCount: number
	size: string // change from number to string (KB/MB etc)
}

interface RepoResponse {}

const getGithubRepos = async (req: NextRequest) => {
	const { hasError, jwtPayload } = getCookieData(req)
	if (hasError) {
		return { data: [] }
	}

	const URI = `${jwtPayload.reposUrl}?sort=pushed&per_page=6`
	const githubCode = jwtPayload.code

	try {
		const res = await fetch(URI, {
			method: 'GET',
			headers: {
				...getHeaders(githubCode),
				Accept: 'application/vnd.github.v3+json',
			},
		})

		const repos = await res.json()
		return { data: repos }
	} catch (err) {
		console.log('Cannot fetch github repos', err)
		return { data: [] }
	}
}

export { getGithubRepos }
