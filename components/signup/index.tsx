import React from 'react'
import Image from 'next/image'
import style from './style.module.scss'
import LogoAnimation from './logo-animation'
import backImg from '../../public/assets/images/mountain_background.jpg'
import { useRouter } from 'next/router'

const Signup = () => {
	const router = useRouter()

	function onSignup(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault()
		console.log('clicked to submit')
		router.push('/api/auth/github/signup')
	}

	return (
		<main>
			<div>
				<Image src={backImg.src} objectFit="cover" layout="fill" placeholder="empty" alt="Background image" priority />
				<form onSubmit={onSignup} className={style.signupForm}>
					{/* <CardWrapper css="w"> */}
					<section className={style.glasscard}>
						<div className="p-10">
							<h1 className={style.heading}>Signup</h1>
						</div>

						<hr className="opacity-10" />

						<LogoAnimation />

						<div className="flex justify-center align-middle w-full mt-20">
							<button className={style.btn}>
								Let's flame <span>🔥</span>
							</button>
						</div>
					</section>
				</form>
			</div>
		</main>
	)
}

export default Signup
