import { IoSettings } from 'react-icons/io5'
import { useExpense } from '@/hooks/common/useExpense'
import ProgressStripe from './progress-stripe/ProgressStripe'
import AlertMessage from './alert-message/AlertMessage'
import { useBudget } from '@/hooks/budget-control/useBudget'
import { useBudgetContext } from '@/contexts/BudgetControlContext'

import './budget-control.style.css'

const BudgetControl = () => {
	const { userBudgetMax, getBudgetControlPercentage } = useBudget()
	const { currentMonthTotal } = useExpense()
	const { toggleBudgetModal } = useBudgetContext()

	return (
		<div className='budget-control content-card'>
			<div className='budget-control-header'>
				<div>
					<h3>Budget Control</h3>
					<button className='button' onClick={toggleBudgetModal}>
						<IoSettings />
					</button>
				</div>
				<div className='limit'>
					{userBudgetMax && <p>Monthly Transaction Limit</p>}
					{!userBudgetMax ? (
						<p>Please set your budget limit!</p>
					) : (
						<div>
							<h3>${currentMonthTotal}</h3> of ${userBudgetMax.budgetMax}
						</div>
					)}
				</div>
			</div>
			{userBudgetMax && (
				<div className='budget-control-view'>
					<ProgressStripe
						percentage={getBudgetControlPercentage(currentMonthTotal, userBudgetMax.budgetMax)}
					/>
					<AlertMessage
						percentage={getBudgetControlPercentage(currentMonthTotal, userBudgetMax.budgetMax)}
					/>
				</div>
			)}
		</div>
	)
}

export default BudgetControl
