const getUserGithubDetails = async (accessToken: string) => {
	let hasError = false
	let data = {
		username: '',
		avatarUrl: '',
	}

	try {
		const requestOptions = {
			method: 'GET',
			headers: getHeaders(accessToken),
		}

		const response = await fetch('https://api.github.com/user', requestOptions)
		const user = await response.json()
		data.username = user.login
		data.avatarUrl = user.avatar_url
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
