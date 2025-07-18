import { useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/common/useIsMobile'
import PageHeader from '@/components/common/page-header/PageHeader'
import IncomeManagment from '@/components/dashboard-content/income-managment/IncomeManagment'
import BudgetControl from '@/components/dashboard-content/budget-control/BudgetControl'
import RecentTransactions from '@/components/dashboard-content/recent-transactions/RecentTransactions'
import ExpenseRecap from '@/components/dashboard-content/expense-recap/ExpenseRecap'

import './dashboard-content.style.css'

const DashboardContent = () => {
	const { open } = useSidebarContext()
	const isMobile = useIsMobile()

	return (
		<>
			<div
				className={`dashboard-content-wrapper ${open && isMobile ? 'hidden' : ''} ${
					isMobile ? 'mobile-layout' : ''
				}`}
			>
				<div className='dashboard-content-header'>
					<PageHeader />
				</div>
				<div className='dashboard-content-scrollable'>
					<div className='dashboard-content-container'>
						<IncomeManagment />
						<BudgetControl />
						<RecentTransactions />
						<ExpenseRecap />
					</div>
				</div>
			</div>
		</>
	)
}

export default DashboardContent
