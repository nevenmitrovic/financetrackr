import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import Loading from '@/components/common/loading/Loading'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const SignIn = lazy(() => import('@/pages/SignIn'))

const Router = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route index element={<Dashboard />} />
				<Route path='/signin' element={<SignIn />} />
			</Routes>
		</Suspense>
	)
}

export default Router
