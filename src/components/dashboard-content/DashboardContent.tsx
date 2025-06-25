import { useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/useIsMobile'
import PageHeader from '@/components/common/page-header/PageHeader'
import IncomeManagment from '@/components/dashboard-content/income-managment/IncomeManagment'
import BudgetControl from '@/components/dashboard-content/budget-control/BudgetControl'

import './dashboard-content.style.css'

const DashboardContent = () => {
	const { open } = useSidebarContext()
	const isMobile = useIsMobile()

	return (
		<div
			className={`container ${open && isMobile ? 'hidden' : ''} ${isMobile ? 'mobile-layout' : ''}`}
		>
			<PageHeader />
			<div className='dashboard-content-container'>
				<IncomeManagment />
				<BudgetControl />
				<div className='recent-transaction'>RECENT TRANSACTION</div>
				<div className='expense-recap'>EXPENSE RECAP</div>
			</div>
		</div>
	)
}

export default DashboardContent
