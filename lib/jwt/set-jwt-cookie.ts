import { NextRequest, NextResponse } from 'next/server'
import { USER_TOKEN } from './constants'

function setUserCookie(req: NextRequest, res: NextResponse, token: string) {
	// const cookie = req.cookies[USER_TOKEN]
	res.cookie(USER_TOKEN, token, { httpOnly: false, secure: false })
}

export { setUserCookie }
