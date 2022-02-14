const c = new faunadb.Client({
	secret: 'your secret',
	fetch: (url, params) => {
		const signal = params.signal
		delete params.signal
		const abortPromise = new Promise((resolve) => {
			if (signal) {
				signal.onabort = resolve
			}
		})
		return Promise.race([abortPromise, fetch(url, params)])
	},
})
