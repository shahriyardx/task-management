import type { NextApiRequest, NextApiResponse } from "next"

const user = {
	username: "admin",
	password: "password",
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res
			.status(400)
			.json({ success: false, error: "bad request", user: null })
	}

	const body = req.body as typeof user
	if (body.username === user.username && body.password === user.password) {
		return res.json({ success: true, user: { username: user.username } })
	}

	res
		.status(403)
		.json({ success: false, error: "invalid username or password", user: null })
}

export default handler
