import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import HomePage from '@components/home-page'
import { getCookieData } from '@lib/jwt/get-session-cookie-data'
import getGithubActivity, { ActivityData } from '@lib/github-api/activity'

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
	activities: ActivityData
}

const Home: FC<HomeUser> = ({ user, activities }) => {
	return (
		<div>
			<HomePage user={user} activities={activities} />
		</div>
	)
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { req } = ctx as any
	const { hasError, jwtPayload, redirectToSignup } = getCookieData(req)

	try {
		if (hasError) {
			return {
				redirect: redirectToSignup,
			}
		}

		const activityResponse = await getGithubActivity(req)

		const user = {
			name: jwtPayload.name,
			username: jwtPayload.username,
			avatarUrl: jwtPayload.avatarUrl,
			reposUrl: jwtPayload.reposUrl,
			followersCount: jwtPayload.followersCount,
			followingCount: jwtPayload.followingCount,
		}

		return {
			props: {
				user,
				activities: activityResponse.data,
			},
		}
	} catch (err) {
		console.log('Failed to verify JWT Token', err)
		return { redirect: redirectToSignup }
	}
}
