import React from 'react'
import Dash from './dash'
import Image from 'next/image'
import GithubImg from '@components/svg/github'
import logo from '../../public/assets/images/gitflame_logo.png'

const LogoAnimation = () => {
	return (
		<div className="p-10 flex justify-center align-middle gap-3">
			<div className="rounded-full">
				<GithubImg />
			</div>

			<Dash />

			<div>
				<Image className="rounded-full" src={logo.src} layout="fixed" width={100} height={100} />
			</div>
		</div>
	)
}

export default LogoAnimation
