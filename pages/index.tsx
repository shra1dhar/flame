import type { NextPage } from 'next'
import Head from 'next/head'
import { CommonLinks } from '../components/head/CommonLinks'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Gitflame</title>
				<meta name="description" content="Generated by create next app" />
				<CommonLinks />
			</Head>
			<main>Home. Logged. Flame.</main>

			<footer></footer>
		</div>
	)
}

export default Home
