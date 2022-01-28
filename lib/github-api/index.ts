const getUserGithubDetails = async (accessToken: string) => {
	let hasError = false
	let data = {
		username: '',
		avatarUrl: '',
	}

	try {
		const myHeaders = new Headers()
		myHeaders.append('Authorization', `Bearer ${accessToken}`)

		const requestOptions = {
			method: 'GET',
			headers: myHeaders,
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

export { getUserGithubDetails }
