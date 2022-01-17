import React from 'react'

const CardWrap = () => {
	return (
		<div className="bg-gray-600 flex p-5 mt-8 space-x-4 items-center shadow-xl max-w-sm rounded-md">
			<img src="https://avatars.githubusercontent.com/u/5550850?v=4" alt="image" className="h-14 w-14 rounded-full" />
			<div>
				<h2 className="text-white font-semibold text-xl">Shravan Dhar</h2>
				<p className="mt-1 text-gray-400 text-sm cursor-pointer">Visit Profile</p>
			</div>
		</div>
	)
}

export default CardWrap
