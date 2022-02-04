import Navbar from '@components/navbar'
import React from 'react'

export interface GithubUser {
	username: string
	avatarUrl: string
	repoUrl: string
	followersCount: string
	followingCount: string
}

const HomePage = () => {
	return (
		<section>
			<Navbar />
		</section>
	)
}

export default HomePage
