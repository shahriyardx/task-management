import type { LoginForm } from "@/components/LoginForm"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export type User = {
	username: string
}

export type AuthResponse = {
	success: boolean
	error?: string
	user: User | null
}

export const useAuth = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState<User | null>(null)
	const [authError, setAuthError] = useState<string | null>(null)

	useEffect(() => {
		const userData = localStorage.getItem("user")
		if (userData) {
			setUser(JSON.parse(userData))
		}

		setLoading(false)
	}, [])

	const login = async (data: LoginForm) => {
		const response = await fetch("/api/auth", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})

		const userData = (await response.json()) as AuthResponse
		if (!userData.success) return setAuthError(userData.error as string)
		localStorage.setItem("user", JSON.stringify(userData.user))
		setUser(userData.user)

		router.push("/dashboard/projects")
	}

	const logout = () => {
		setUser(null)
		localStorage.removeItem("user")
		router.push("/")
	}

	return { user, login, authError, loading, logout }
}

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()
	const { user, loading } = useAuth()

	if (loading) return <div>Loading...</div>
	if (!user) {
		router.push("/")
		return <div>Please Login</div>
	}
	return children
}
