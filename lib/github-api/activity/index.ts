import { url } from 'inspector'

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

const getGithubActivity = async (username: string, headers: object) => {
	const URI = `https://api.github.com/users/${username}/events`

	try {
		const res = await fetch(URI, {
			method: 'GET',
			headers: {
				Accept: 'application/vnd.github.v3+json',
			},
		})
		const data = await res.json()
		return parseGithubActivity(data)
	} catch (err) {
		console.log('Could not fetch/process push activity', err)
		return []
	}
}

function parseGithubActivity(data: any): PushActivity[] {
	return (data || []).map((val: any) => {
		const { commits } = data.payload
		return {
			id: data.id,
			actor: {
				username: data.actor.login,
				avatarUrl: data.actor.avatar_url,
			},
			repo: {
				id: data.repo.login,
				name: data.repo.name,
				url: data.repo.url,
			},
			payload: {
				pushId: data.payload.push_id,
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
