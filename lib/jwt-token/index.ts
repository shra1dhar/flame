import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const KEY = process.env.JWT_CRYPT_KEY as string

const getJWT = (data: object) => {
	const token = jwt.sign({ ...data }, KEY, { expiresIn: '1d' })
	return token
}

const isJWTVerified = (token: string) => jwt.verify(token, KEY)

const setJWTCookie = (req: NextRequest, res: NextResponse) => {
	// res.headers()
}

export { getJWT, isJWTVerified }
