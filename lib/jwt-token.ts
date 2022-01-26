import jwt from 'jsonwebtoken'

const KEY = process.env.JWT_CRYPT_KEY as string

const getJWT = (data: object) => {
	const token = jwt.sign({ ...data }, KEY, { expiresIn: '1d' })
	return token
}

const isJWTVerified = (token: string) => jwt.verify(token, KEY)

export { getJWT, isJWTVerified }
