import { IoSettings } from 'react-icons/io5'

import ProgressStripe from './progress-stripe/ProgressStripe'
import AlertMessage from './alert-message/AlertMessage'
import { useBudget } from '@/hooks/budget-control/useBudget'
import { useBudgetContext } from '@/contexts/BudgetControlContext'

import './budget-control.style.css'

const BudgetControl = () => {
	const userBudgetMax = useBudget()
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
							<h3>2170.00$</h3> of {userBudgetMax.budget_max}$
						</div>
					)}
				</div>
			</div>
			{userBudgetMax && (
				<div className='budget-control-view'>
					<ProgressStripe percentage={91} />
					<AlertMessage percentage={91} />
				</div>
			)}
		</div>
	)
}

export default BudgetControl
