import { useTransactionContext } from '@/contexts/RecentTransactionContext'

import './transaction-modal-content.style.css'

const TransactionModalContent = () => {
	const { toggleTransactionModal } = useTransactionContext()

	return (
		<>
			<h3 className='transaction-modal-header'>Add a new transaction</h3>
			<div className='transaction-modal-body'></div>
			<div className='transaction-modal-footer'>
				<button className='button' onClick={() => {}}>
					Add
				</button>
				<button className='button' onClick={toggleTransactionModal}>
					Cancel
				</button>
			</div>
		</>
	)
}

export default TransactionModalContent
