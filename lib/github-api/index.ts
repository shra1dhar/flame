const getUserGithubDetails = async (accessToken: string) => {
	let hasError = false
	let data = {
		name: '',
		username: '',
		avatarUrl: '',
		reposUrl: '',
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
		}
	} catch (err) {
		hasError = true
		console.log('Github user request not successful', err)
	}
	return { hasError, data }
}

// async function fetchRepos(accessToken: string, username: string) {
//   @TODO
// }

function getHeaders(accessToken: string) {
	const myHeaders = new Headers()
	myHeaders.append('Authorization', `Bearer ${accessToken}`)
	return myHeaders
}

export { getUserGithubDetails }
