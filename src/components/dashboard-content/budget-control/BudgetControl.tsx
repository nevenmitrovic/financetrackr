import { IoSettings } from 'react-icons/io5'

import './budget-control.style.css'
import ProgressStripe from './progress-stripe/ProgressStripe'
import AlertMessage from './alert-message/AlertMessage'

const BudgetControl = () => {
	return (
		<div className='budget-control content-card'>
			<div className='budget-control-header'>
				<div>
					<h3>Budget Control</h3>
					<button className='button'>
						<IoSettings />
					</button>
				</div>
				<div className='limit'>
					<p>Monthly Transaction Limit</p>
					<div>
						<h3>2170.00$</h3> of 2700.00$
					</div>
				</div>
			</div>
			<div className='budget-control-view'>
				<ProgressStripe percentage={91} />
				<AlertMessage percentage={91} />
			</div>
		</div>
	)
}

export default BudgetControl
