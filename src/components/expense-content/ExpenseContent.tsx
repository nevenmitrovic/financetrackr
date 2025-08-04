import { useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/common/useIsMobile'
import PageHeader from '@/components/common/page-header/PageHeader'
import ExpenseCard from '@/components/expense-content/expense-card/ExpenseCard'
import { useExpenses } from '@/hooks/common/useExpense'

import '@/components/dashboard-content/dashboard-content.style.css'
import './expense-content.style.css'

const ExpenseLayoutContent = () => {
	const { open } = useSidebarContext()
	const isMobile = useIsMobile()
	const { topExpenseCategory } = useExpenses()

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
								category={topExpenseCategory.category}
								trendType={topExpenseCategory.trendType}
								value={topExpenseCategory.total}
								percentage={topExpenseCategory.percentage}
							/>
							<ExpenseCard
								iconColor='var(--clr-income-gift)'
								title='Top Expense Subcategory'
								category='Random'
								trendType='decrease'
								value={1886}
								percentage={11}
							/>
							<ExpenseCard
								iconColor='var(--clr-expense-transfers)'
								title='Total Expense All Time'
								category='Random'
								trendType='decrease'
								value={3400}
								percentage={33}
							/>
							<ExpenseCard
								iconColor='var(--clr-info)'
								title='Total Expense Today'
								category='Random'
								trendType='noChange'
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
