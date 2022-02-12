import { RepoResponse, Repos } from '@lib/github-api/repos'
import React, { FC } from 'react'
import style from './style.module.scss'

interface Props extends Pick<RepoResponse, 'data'> {
	isLoading?: boolean
	data: Repos[]
}

const Repository: FC<Props> = ({ isLoading, data }) => {
	return (
		<div className={style.container}>
			{data.map((repo) => {
				const dateAndTime = new Date(repo.pushedAt).toLocaleString()
				// const hasDescription = !!repo.description

				return (
					<div key={repo.id} className={style.repo}>
						<div className="flex justify-between mb-2">
							<span>
								<h3 className="text-lg">
									<strong>{repo.name}</strong>
								</h3>
							</span>
							<span className={style.dimText}>{dateAndTime}</span>
						</div>

						{/* {hasDescription && <div className="mb-2">{repo.description}</div>} */}

						<div className={`flex justify-between ${style.dimText}`}>
							<div className="flex justify-between">
								<span>
									<em>{repo.language}</em>
								</span>
								{/* <span>{repo.size}</span> */}
							</div>
							<div>⭐ {repo.starGazersCount}</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Repository
