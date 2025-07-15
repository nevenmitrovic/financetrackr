import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import Loading from '@/components/common/loading/Loading'

const Dashboard = lazy(() => import('@/pages/Dashboard'))

const Router = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route index element={<Dashboard />} />
			</Routes>
		</Suspense>
	)
}

export default Router
