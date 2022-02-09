import { getGithubRepos } from '@lib/github-api/repos'
import { jsonResponse } from '@lib/utils/json'
import { NextRequest, NextFetchEvent } from 'next/server'

const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
	const { statusCode, data } = await getGithubRepos(req)
	return jsonResponse(statusCode, data)
}

export { middleware }
