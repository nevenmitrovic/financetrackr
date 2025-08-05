import { useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/common/useIsMobile'
import PageHeader from '@/components/common/page-header/PageHeader'
import ExpenseCard from '@/components/expense-content/expense-card/ExpenseCard'
import { useExpenses } from '@/hooks/common/useExpense'
import ExpenseHistory from '@/components/expense-content/expense-history/ExpenseHistory'

import '@/components/dashboard-content/dashboard-content.style.css'
import './expense-content.style.css'

const ExpenseLayoutContent = () => {
	const { open } = useSidebarContext()
	const isMobile = useIsMobile()
	const { topExpenseCategory, topExpenseSubcategory, totalExpenseAllTime, totalExpenseToday } =
		useExpenses()

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
								level='category'
								category={topExpenseCategory.category}
								trendType={topExpenseCategory.trendType}
								value={topExpenseCategory.total}
								percentage={topExpenseCategory.percentage}
							/>
							<ExpenseCard
								iconColor='var(--clr-income-gift)'
								title='Top Expense Subcategory'
								level='subcategory'
								category={topExpenseSubcategory.subcategory}
								trendType={topExpenseSubcategory.trendType}
								value={topExpenseSubcategory.total}
								percentage={topExpenseSubcategory.percentage}
							/>
							<ExpenseCard
								iconColor='var(--clr-expense-transfers)'
								title='Total Expense All Time'
								level='noLevel'
								category={totalExpenseAllTime.category}
								trendType={totalExpenseAllTime.trendType}
								value={totalExpenseAllTime.total}
								percentage={totalExpenseAllTime.percentage}
							/>
							<ExpenseCard
								iconColor='var(--clr-info)'
								title='Total Expense Today'
								level='noLevel'
								category={totalExpenseToday.category}
								trendType={totalExpenseToday.trendType}
								value={totalExpenseToday.total}
								percentage={totalExpenseToday.percentage}
								today={true}
							/>
						</div>
						<ExpenseHistory />
					</div>
				</div>
			</div>
		</>
	)
}

export default ExpenseLayoutContent
