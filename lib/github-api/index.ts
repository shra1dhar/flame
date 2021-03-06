const getUserGithubDetails = async (accessToken: string) => {
	let hasError = false
	let data = {
		name: '',
		username: '',
		avatarUrl: '',
		reposUrl: '',
		followersCount: 0,
		followingCount: 0,
	}

	try {
		const requestOptions = {
			method: 'GET',
			headers: getHeaders(accessToken),
		}

		const response = await fetch('https://api.github.com/user', requestOptions)
		const user = await response.json()

		data = {
			name: user.name,
			username: user.login,
			avatarUrl: user.avatar_url,
			reposUrl: user.repos_url,
			followersCount: user.followers,
			followingCount: user.following,
		}
	} catch (err) {
		hasError = true
		console.log('Github user request not successful', err)
	}
	return { hasError, data }
}

function getHeaders(accessToken: string) {
	const headers = new Headers()
	headers.append('Authorization', `Bearer ${accessToken}`)
	headers.append('Accept', 'application/vnd.github.v3+json')
	return headers
}

export { getUserGithubDetails, getHeaders }
