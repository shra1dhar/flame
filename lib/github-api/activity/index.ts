import { NextRequest } from 'next/server'
import { getCookieData } from '@lib/jwt/get-session-cookie-data'
import { getHeaders } from '..'

interface Commits {
	sha: string
	url: string
	message: string
}

interface PushActivity {
	id: string
	actor: {
		username: string
		avatarUrl: string
	}
	repo: {
		id: string
		name: string
		url: string
	}
	payload: {
		pushId: string
		commits: Commits
	}
}

interface ActivityApiResponse {
	response: {
		data: PushActivity[]
		pollingInterval: number
	}
	statusCode: number
}

const getGithubActivity = async (req: NextRequest): Promise<ActivityApiResponse> => {
	let pollingInterval = 60 // seconds
	const { hasError, jwtPayload } = getCookieData(req)

	if (hasError) {
		return {
			response: { data: [], pollingInterval },
			statusCode: 401,
		}
	}

	let statusCode = 200
	const URI = `https://api.github.com/users/${jwtPayload.username}/events`

	try {
		const res = await fetch(URI, {
			method: 'GET',
			headers: {
				...getHeaders(jwtPayload.code),
				Accept: 'application/vnd.github.v3+json',
			},
		})

		statusCode = res.status
		const intervalTime = res.headers.get('X-Poll-Interval')
		pollingInterval = !!intervalTime ? parseInt(intervalTime, 10) : pollingInterval
		const activities = await res.json()

		return {
			response: { data: parseGithubActivity(activities), pollingInterval },
			statusCode,
		}
	} catch (err) {
		console.log('Could not fetch/process push activity', err)
		return {
			response: { data: [], pollingInterval },
			statusCode,
		}
	}
}

function parseGithubActivity(data: any): PushActivity[] {
	const pushActivity = []
	for (const event of data || []) {
		if (pushActivity.length === 5) {
			break
		}
		if (event.type === 'PushEvent') {
			pushActivity.push(event)
		}
	}

	return pushActivity.map((activity: any) => {
		const { commits = [] } = activity.payload
		return {
			id: activity.id,
			actor: {
				username: activity.actor.login,
				avatarUrl: activity.actor.avatar_url,
			},
			repo: {
				id: activity.repo.login,
				name: activity.repo.name,
				url: activity.repo.url,
			},
			payload: {
				pushId: activity.payload.push_id,
				commits: commits.map((commit: any) => ({
					sha: commit.sha,
					url: commit.url,
					message: commit.message,
				})),
			},
		}
	})
}

export default getGithubActivity
