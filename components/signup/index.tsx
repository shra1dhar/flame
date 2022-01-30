import React from 'react'
import Image from 'next/image'
import style from './style.module.scss'
import backImg from '../../public/assets/images/mountain_background.jpg'
import logo from '../../public/assets/images/gitflame_logo.png'
import GithubImg from '@components/svg/github'

const Signup = () => {
	return (
		<main>
			<div>
				<Image src={backImg.src} objectFit="cover" layout="fill" placeholder="empty" alt="Background image" priority />
				<form className="absolute flex justify-center align-middle w-full h-full">
					{/* <CardWrapper css="w"> */}
					<section className={style.glasscard}>
						<div className="p-10">
							<h1 className={style.heading}>Signup</h1>
						</div>

						<hr className="opacity-10" />

						<div className="p-10 flex justify-center">
							<div className="rounded-full">
								<GithubImg />
							</div>
							<div className="m-1">
								<Image className="rounded-full" src={logo.src} layout="fixed" width={128} height={128} />
							</div>
						</div>

						<div className="flex justify-center align-middle w-full mt-20">
							<button className="bg-amber-900 px-10 py-2 rounded-lg">Let's flame</button>
						</div>
					</section>
				</form>
			</div>
		</main>
	)
}

export default Signup
