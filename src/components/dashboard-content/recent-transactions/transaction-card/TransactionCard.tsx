import './transaction-card.style.css'
import logo from '@/assets/images/avatar.png'
import { GoDotFill } from 'react-icons/go'

interface TransactionCardProps {}

const TransactionCard = () => {
	return (
		<div className='transaction-card'>
			<img src={logo} alt='transaction card logo' />
			<div>
				<div className='transaction-card-info'>
					<div>
						<h4>Netflix</h4>
						<p>June 27, 2025 at 10:45 AM</p>
					</div>
				</div>
				<div className='transaction-category'>
					<GoDotFill color='var(--clr-expense-fixed)' />
					<span>Entertainment</span>
				</div>
				<div className='transaction-value'>
					<h4>-200$</h4>
				</div>
			</div>
		</div>
	)
}

export default TransactionCard
