import Cors from 'cors'
import initMiddleware from './init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
	// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
	Cors({
		// Only allow requests with GET, POST and OPTIONS
		methods: ['GET', 'POST', 'OPTIONS'],
		origin: process.env.HOSTNAME,
	}),
)

export default async function handler(req: any, res: any, next: any) {
	// Run cors
	await cors(req, res)

	// Rest of the API logic
	next(req, res)
}
