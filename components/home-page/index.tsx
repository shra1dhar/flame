import React, { FC } from 'react'
import Image from 'next/image'
import { HomeUser } from 'pages/home'
import style from './style.module.scss'
import Navbar from '@components/navbar'
import Tab from '@components/tab'
import UserDashActivity from './user-dash-activity'

const HomePage: FC<HomeUser> = ({ user, activities }) => {
	const { name, username, avatarUrl, repoUrl, followersCount, followingCount } = user
	const finalName = name || username

	return (
		<>
			<Navbar />
			<div className={style.homeBody}>
				<section className={style.mainSection}>
					<div className="flex flex-initial text-gray-300">
						<div>
							<Image src={avatarUrl} width={150} height={150} className={style.avatar} alt="profile avatar" />
						</div>
						<div className="p-5 flex flex-col flex-grow justify-evenly">
							<h1 className="text-4xl">{finalName}</h1>
							<div>
								<span>Followers: {followersCount}</span>
								<span className="ml-5">Following: {followingCount}</span>
							</div>
						</div>
						<div className="text-5xl">
							<span className="invert">🔥</span>
							&nbsp;
							<span>0</span>
						</div>
					</div>
				</section>

				<UserDashActivity css={style.mainSection} activities={activities} />
			</div>
		</>
	)
}

export default HomePage
