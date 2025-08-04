import { useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/common/useIsMobile'
import PageHeader from '@/components/common/page-header/PageHeader'
import ExpenseCard from '@/components/expense-content/expense-card/ExpenseCard'

import '@/components/dashboard-content/dashboard-content.style.css'
import './expense-content.style.css'

const ExpenseLayoutContent = () => {
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
					<div className='expense-content-container'>
						<div className='expense-top-cards'>
							<ExpenseCard
								iconColor='var(--clr-income-paycheck)'
								title='Top Expense Category'
								type='increase'
								value={2134}
								percentage={13}
							/>
							<ExpenseCard
								iconColor='var(--clr-income-gift)'
								title='Top Expense Subcategory'
								type='decrease'
								value={1886}
								percentage={11}
							/>
							<ExpenseCard
								iconColor='var(--clr-expense-transfers)'
								title='Total Expense All Time'
								type='decrease'
								value={3400}
								percentage={33}
							/>
							<ExpenseCard
								iconColor='var(--clr-info)'
								title='Total Expense Today'
								type='increase'
								value={2008}
								percentage={4}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ExpenseLayoutContent
