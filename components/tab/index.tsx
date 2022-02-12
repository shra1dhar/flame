import React, { FC, useState } from 'react'
import style from './style.module.scss'
import classNames from 'classnames'

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
			<div className={style.tabSection}>
				{list.map(({ name }, index) => {
					const css = classNames(style.tab, { [style.active]: activeIndex === index })
					return (
						<div key={name} className={css} onClick={() => setTabIndex(index)}>
							{name}
						</div>
					)
				})}
			</div>

			<div className={style.tabBody}>{list[activeIndex].component}</div>
		</div>
	)
}

export default Tab
