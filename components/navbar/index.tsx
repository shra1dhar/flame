import React, { FC } from 'react'
import Image from 'next/image'
import logo from '../../public/assets/images/gitlame_logo_light.png'

interface Props {}

const Navbar: FC<Props> = () => {
	return (
		<nav className="flex justify-center fixed top-0">
			<div className="w-80">
				<div>
					<Image src={logo.src} width={30} height={30} objectFit="scale-down" /> &nbsp; <div>Gitflame</div>
				</div>
				<div>Yo</div>
			</div>
		</nav>
	)
}

export default Navbar
