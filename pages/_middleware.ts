import type { NextFetchEvent, NextRequest } from 'next/server'
import cors from '../lib/cors'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	// `cors` also takes care of handling OPTIONS requests
	return cors(
		req,
		new Response(JSON.stringify({ message: 'Hello World!' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		}),
	)
}
