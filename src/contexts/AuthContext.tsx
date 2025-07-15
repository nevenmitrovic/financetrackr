import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { type Session, type User, AuthError } from '@supabase/supabase-js'
import { supabaseClient } from '@/services/supabaseClient'

interface IAuthContext {
	session: Session | null
	user: User | null
	loading: boolean
}

interface AuthProviderProps {
	children: ReactNode
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [session, setSession] = useState<Session | null>(null)
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	const getSession = async () => {
		try {
			const {
				data: { session },
				error,
			} = await supabaseClient.auth.getSession()

			if (error) {
				throw new AuthError(error.message)
			}

			setSession(session)
			setUser(session?.user ?? null)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getSession()

		const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, newSession) => {
			setSession(newSession)
			setUser(newSession?.user ?? null)
			setLoading(false)
		})

		return () => {
			listener.subscription.unsubscribe()
		}
	}, [])

	const value: IAuthContext = { session, user, loading }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): IAuthContext => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
