import React from 'react'
import style from './style.module.scss'

const Dash = () => {
	// const style = {
	// 	height: '2px',
	// 	width: '5px',
	// }
	return (
		<div className={style.dashes}>
			{Array(10)
				.fill(0)
				.map((_, index) => (
					<span key={index} className={style.dash} />
				))}
		</div>
	)
}

export default Dash
