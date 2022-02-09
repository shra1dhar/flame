import classNames from 'classnames'
import e from 'cors'
import React, { FC, useState } from 'react'
import style from './style.module.scss'

interface Tab {
	name: string
	default?: boolean
	component: JSX.Element
}

interface Props {
	list: Tab[]
}

const Tab: FC<Props> = ({ list }) => {
	const [activeIndex, setActiveIndex] = useState<number>(0)

	function setTabIndex(index: number) {
		setActiveIndex(index)
	}

	return (
		<div>
			<div className="w-full">
				{list.map(({ name }, index) => {
					const css = classNames(style.tabName, { [style.active]: activeIndex === index })
					return (
						<div key={name} className={css} onClick={() => setTabIndex(index)}>
							<h2>{name}</h2>
						</div>
					)
				})}
			</div>

			<div className="w-full">{list[activeIndex]}</div>
		</div>
	)
}

export default Tab
