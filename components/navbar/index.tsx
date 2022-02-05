import React, { FC } from 'react'
import Image from 'next/image'
import logo from 'public/assets/images/gitflame_logo.png'

interface Props {}

const Navbar: FC<Props> = () => {
	return (
		<nav className="flex justify-center sticky top-0 w-screen bg-gray-800 shadow-xl">
			<div className="w-5/6">
				<div className="p-5 flex flex-nowrap items-center">
					<Image className="rounded-md" src={logo.src} width={40} height={40} objectFit="scale-down" alt="logo" />
					<div className="ml-3">
						<h2 className="text-slate-100 text-2xl">Gitflame</h2>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
