import React from 'react'
import CardWrapper from '@components/card/card-wrapper'

const Signup = () => {
	return (
		<section>
			<form>
				<CardWrapper>
					<div className="p-10">
						<h1 className="text-4xl text-center text-sky-50">Signup to GitFlame 🔥</h1>
					</div>

					<hr className="opacity-10" />

					<div>Details are here</div>
				</CardWrapper>
			</form>
		</section>
	)
}

export default Signup
