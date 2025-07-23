import TransactionCard from '@/components/dashboard-content/recent-transactions/transaction-card/TransactionCard'
import { useTransactionContext } from '@/contexts/RecentTransactionContext'
import { FaPlus } from 'react-icons/fa6'

import './recent-transactions.style.css'

const RecentTransactions = () => {
	const { toggleTransactionModal } = useTransactionContext()

	return (
		<div className='recent-transactions content-card'>
			<div className='recent-transactions-header'>
				<h3>Recent Transactions</h3>
				<button className='button' onClick={toggleTransactionModal}>
					<FaPlus /> Add new
				</button>
			</div>
			<div className='transactions-container'>
				<div className='transactions-per-date'>
					<p>June 27, 2025</p>
					<div className='transactions-cards-container'>
						<TransactionCard />
						<TransactionCard />
						<TransactionCard />
						<TransactionCard />
						<TransactionCard />
						<TransactionCard />
						<TransactionCard />
						<TransactionCard />
						<TransactionCard />
					</div>
				</div>
			</div>
		</div>
	)
}

export default RecentTransactions
