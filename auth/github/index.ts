import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github'

function initialiseGithubAuth() {
	passport.use(
		new GitHubStrategy(
			{
				clientID: process.env.GITHUB_CLIENT_ID!,
				clientSecret: process.env.GITHUB_CLIENT_SECRET!,
				callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
			},
			function (accessToken, refreshToken, profile, cb) {
				console.log(profile)
			},
		),
	)
}

export default initialiseGithubAuth
