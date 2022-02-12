import React, { FC } from 'react'
import Tab from '@components/tab'
import Repository from './Repository'
import { useQuery } from 'react-query'
import Activity from './Activity'
import { ActivityData } from '@lib/github-api/activity'

interface Props {
	css: string
	activities: ActivityData
}

const UserDashActivity: FC<Props> = ({ css, activities }) => {
	const repos = useQuery<any>('repos', fetchRepos, {})

	async function fetchRepos() {
		let statusCode = 200
		try {
			const response = await fetch('/api/user/repos')
			statusCode = response.status
			const data = await response.json()
			return { data, statusCode }
		} catch (err) {
			console.log('Could not fetch repos properly, err')
			return { data: [], statusCode }
		}
	}

	return (
		<section className={css}>
			<Tab
				list={[
					{ name: 'Repos', component: <Repository isLoading={repos.isLoading} data={repos?.data?.data || []} /> },
					{ name: 'Activity', component: <Activity data={activities} /> },
				]}
			/>
		</section>
	)
}

export default UserDashActivity
