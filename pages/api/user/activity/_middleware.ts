import { jsonResponse } from '@lib/utils/json'
import getGithubActivity from '@lib/github-api/activity'
import { NextRequest, NextFetchEvent } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	const { statusCode, data } = await getGithubActivity(req)
	return jsonResponse(statusCode, data)
}
