import { USER_TOKEN } from '@lib/jwt/constants'
import { verifyJWT } from '@lib/jwt/jwt-token'
import { JwtPayload } from 'jsonwebtoken'
import { GetServerSideProps, NextPageContext } from 'next'
import React, { FC } from 'react'

const Home = () => {
	return <div>This is home</div>
}

export default Home

interface Data {
	username: string
	avatarUrl: string
	repoUrl: string[]
}

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
			username: jwtToken.username,
			avatarUrl: jwtToken.avatarUrl,
		}
	} catch (err) {
		console.log('Failed to verify JWT Token', err)
		return { redirect }
	}

	return {
		props: {}, // will be passed to the page component as props
	}
}
