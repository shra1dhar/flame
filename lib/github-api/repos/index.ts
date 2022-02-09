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
	size: number // later change from number to string (KB/MB etc)
}

interface RepoResponse {
	data: Repos[]
	statusCode: number
}

const getGithubRepos = async (req: NextRequest): Promise<RepoResponse> => {
	const { hasError, jwtPayload } = getCookieData(req)
	if (hasError) {
		return { data: [], statusCode: 401 }
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
		return { data: parseRepos(repos), statusCode: 200 }
	} catch (err) {
		console.log('Cannot fetch github repos', err)
		return { data: [], statusCode: 200 }
	}
}

function parseRepos(repos: any): Repos[] {
	return repos.map((repo: any) => ({
		id: repo.id,
		name: repo.name,
		language: repo.language,
		pushedAt: repo.pushed_at,
		description: repo.description,
		starGazersCount: repo.stargazers_count,
		size: repo.size,
	}))
}

export { getGithubRepos }
