import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import { verifyJWT } from '@lib/jwt/jwt-token'
import { USER_TOKEN } from '@lib/jwt/constants'
import HomePage from '@components/home-page'

interface GithubUser {
	name: string
	username: string
	avatarUrl: string
	repoUrl: string
	followersCount: string
	followingCount: string
}

export interface HomeUser {
	user: GithubUser
}

const Home: FC<HomeUser> = ({ user }) => {
	return (
		<div>
			<HomePage user={user} />
			This is home{JSON.stringify(user)}
		</div>
	)
}

export default Home

const redirect = {
	destination: '/signup',
	permanent: false,
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { req } = ctx as any
	try {
		const hasCookie = req.cookies[USER_TOKEN]
		if (!hasCookie) {
			return {
				redirect,
			}
		}

		const jwtToken: any = verifyJWT(hasCookie)
		if (!jwtToken || jwtToken === 'string') {
			return { redirect }
		}

		const user = {
			name: jwtToken.name,
			username: jwtToken.username,
			avatarUrl: jwtToken.avatarUrl,
			reposUrl: jwtToken.reposUrl,
			followersCount: jwtToken.followersCount,
			followingCount: jwtToken.followingCount,
		}

		return {
			props: {
				user,
			},
		}
	} catch (err) {
		console.log('Failed to verify JWT Token', err)
		return { redirect }
	}
}
