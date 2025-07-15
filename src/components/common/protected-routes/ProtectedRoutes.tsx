import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Loading from '@/components/common/loading/Loading'

const ProtectedRoutes = () => {
	const { loading, user } = useAuth()

	if (loading) return <Loading />

	return user ? <Outlet /> : <Navigate to={'/signin'} />
}

export default ProtectedRoutes
