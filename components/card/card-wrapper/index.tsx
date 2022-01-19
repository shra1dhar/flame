import classNames from 'classnames'
import React, { FC } from 'react'
import style from './style.module.scss'

interface Props {
	css?: string
}

const CardWrapper: FC<Props> = ({ css, children }) => {
	const cssClass = classNames(css, style.card)
	return <div className={cssClass}>{children}</div>
}

export default CardWrapper
