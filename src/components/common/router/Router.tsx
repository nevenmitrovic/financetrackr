import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import Loading from '@/components/common/loading/Loading'
import ProtectedRoutes from '@/components/common/protected-routes/ProtectedRoutes'
import { IncomeManagmentProvider } from '@/contexts/IncomeManagmentContext'
import { BudgetControlProvider } from '@/contexts/BudgetControlContext'
import { RecentTransactionProvider } from '@/contexts/RecentTransactionContext'

const Documents = lazy(() => import('@/pages/Documents'))
const Expense = lazy(() => import('@/pages/Expense'))
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
							<RecentTransactionProvider>
								<BudgetControlProvider>
									<IncomeManagmentProvider>
										<Dashboard />
									</IncomeManagmentProvider>
								</BudgetControlProvider>
							</RecentTransactionProvider>
						}
					/>
					<Route path='/expense' element={<Expense />} />
					<Route path='/documents' element={<Documents />} />
				</Route>

				<Route path='/signin' element={<SignIn />} />
			</Routes>
		</Suspense>
	)
}

export default Router
