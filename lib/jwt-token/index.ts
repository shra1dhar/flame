import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const KEY = process.env.JWT_CRYPT_KEY as string

const getJWT = (data: object) => {
	const token = jwt.sign({ ...data }, KEY, { algorithm: 'RS256', expiresIn: '1d' })
	return token
}

const verifyJWT = (token: string) => {
	try {
		const decoded = jwt.verify(token, KEY)
		return decoded || ''
	} catch (err) {
		console.log(err)
		return ''
	}
}

const setJWTCookie = (req: NextRequest, res: NextResponse) => {
	// res.headers()
}

export { getJWT, verifyJWT }
