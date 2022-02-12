import React, { FC } from 'react'
import style from './style.module.scss'

const DataBlock: FC = ({ children }) => {
	return <div className={style.container}>{children}</div>
}

export default DataBlock
