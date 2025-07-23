import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import Loading from '@/components/common/loading/Loading'
import ProtectedRoutes from '@/components/common/protected-routes/ProtectedRoutes'
import { IncomeManagmentProvider } from '@/contexts/IncomeManagmentContext'
import { BudgetControlProvider } from '@/contexts/BudgetControlContext'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const SignIn = lazy(() => import('@/pages/SignIn'))

const Router = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route element={<ProtectedRoutes />}>
					<Route
						index
						element={
							<BudgetControlProvider>
								<IncomeManagmentProvider>
									<Dashboard />
								</IncomeManagmentProvider>
							</BudgetControlProvider>
						}
					/>
				</Route>

				<Route path='/signin' element={<SignIn />} />
			</Routes>
		</Suspense>
	)
}

export default Router
