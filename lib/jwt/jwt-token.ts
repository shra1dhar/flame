import jwt from 'jsonwebtoken'

const KEY = process.env.JWT_CRYPT_KEY as string

// require('crypto').randomBytes(64).toString('hex')
const createJWTToken = (data: object) => {
	const token = jwt.sign(data, KEY, { expiresIn: '1d' })
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

export { createJWTToken, verifyJWT }
