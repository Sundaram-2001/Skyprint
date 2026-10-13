import "dotenv/config"
import { createRemoteJWKSet, jwtVerify } from "jose"

const supabaseUrl = process.env.SUPABASE_URL

export function createAuthMiddleware(supabaseUrl) {
	if (!supabaseUrl) {
		throw new Error("Supabase URL is required to initialize the auth middleware!")
	}

	const JWKS = createRemoteJWKSet(new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`))

	return async function verifyUser(req, res, next) {
		const authHeader = req.headers.authorization

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				error: "Unauthorized",
				message: "No token provided"
			})
		}

		const token = authHeader.split(" ")[1]

		try {
			const { payload } = await jwtVerify(token, JWKS, {
				issuer: `${supabaseUrl}/auth/v1`,
				audience: "authenticated"
			})

			req.userId = payload.sub
			next()
		} catch (err) {
			console.error("Backend JWT Verification Failure:", err.code, err.message)
			return res.status(401).json({
				error: "Unauthorized",
				message: "Invalid, forged, or expired token"
			})
		}
	}
}

export const verifyUser = createAuthMiddleware(supabaseUrl)
