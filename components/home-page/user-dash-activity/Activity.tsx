import getGithubActivity, { ActivityData } from '@lib/github-api/activity'
import { getCookieData } from '@lib/jwt/get-session-cookie-data'
import { GetServerSideProps } from 'next'
import React, { FC } from 'react'
import DataBlock from './DataBlock'
import style from './style.module.scss'
import Image from 'next/image'

interface Props {
	data: ActivityData
}

const Activity: FC<Props> = ({ data }) => {
	const { pushActivity } = data

	return (
		<DataBlock>
			{pushActivity.map((activity) => {
				const dateAndTime = new Date(activity.createdAt).toLocaleString()
				const { commits } = activity.payload

				return (
					<div key={activity.id} className={style.activity}>
						<div className="flex flex-nowrap">
							<div>
								<Image src={activity.actor.avatarUrl} width={32} height={32} className="rounded-md" />
							</div>

							<div className="flex-grow pl-5">
								<h3 className="text-lg">
									<strong>{activity.repo.name}</strong>
								</h3>
								<div>
									<ul className="pl-2">
										{commits.map((commit) => (
											<a key={commit.sha} href={commit.url}>
												<li>- {commit.message}</li>
											</a>
										))}
									</ul>
									<div></div>
								</div>
							</div>

							<div>
								<span className={style.dimText}>{dateAndTime}</span>
							</div>
						</div>
						{/* <div className="flex justify-between mb-2">
							<span>
								
								<div>
									<h3 className="text-lg">{activity.actor.username}</h3>
								</div>
							</span>
							<span>
								<h3 className="text-lg">
									<strong>{activity.repo.name}</strong>
								</h3>
							</span>
							<span className={style.dimText}>{dateAndTime}</span>
						</div> */}

						{/* <div>
							<ul>
								{commits.map((commit) => (
									<a key={commit.sha} href={commit.url}>
										<li>- {commit.message}</li>
									</a>
								))}
							</ul>
						</div> */}
					</div>
				)
			})}
		</DataBlock>
	)
}

export default Activity

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// 	const { req } = ctx as any
// 	const { hasError, redirectToSignup } = getCookieData(req)

// 	try {
// 		if (hasError) {
// 			return { redirect: redirectToSignup }
// 		}
// 		const res = await getGithubActivity(req)
// 		return {
// 			props: { activities: res },
// 		}
// 	} catch (err) {
// 		return {
// 			props: {
// 				activities: [],
// 			},
// 		}
// 	}
// }
