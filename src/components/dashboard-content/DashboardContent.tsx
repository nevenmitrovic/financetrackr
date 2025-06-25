import { useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/useIsMobile'
import PageHeader from '@/components/common/page-header/PageHeader'

import './dashboard-content-container.style.css'

const DashboardContent = () => {
	const { open } = useSidebarContext()
	const isMobile = useIsMobile()

	return (
		<div
			className={`container ${open && isMobile ? 'hidden' : ''} ${isMobile ? 'mobile-layout' : ''}`}
		>
			<PageHeader />
			<div className='dashboard-content-container'>
				<div className='income-managment'>INCOME</div>
				<div className='budget-control'>BUDGET</div>
				<div className='recent-transaction'>RECENT TRANSACTION</div>
				<div className='expense-recap'>EXPENSE RECAP</div>
			</div>
		</div>
	)
}

export default DashboardContent
