import TransactionCard from '@/components/dashboard-content/recent-transactions/transaction-card/TransactionCard'
import { useTransactionContext } from '@/contexts/RecentTransactionContext'
import { FaPlus } from 'react-icons/fa6'
import { useInfiniteTransactions } from '@/hooks/recent-transactions/useInfiniteTransactions'
import Spinner from '@/components/common/loading/Spinner'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef } from 'react'
import { useIsMobile } from '@/hooks/common/useIsMobile'

import './recent-transactions.style.css'
import { sum } from '@/utils'
import type { IExpense, IMonthlyIncome } from '@/types'

const RecentTransactions = () => {
	const { toggleTransactionModal } = useTransactionContext()
	const isMobile = useIsMobile()
	const loadButtonRef = useRef<HTMLButtonElement>(null)
	const { inView, ref } = useInView({
		threshold: 1,
	})
	const { transactions, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteTransactions()

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView, fetchNextPage, hasNextPage])

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
					<div className='transactions-cards-container'>
						{!transactions || transactions.pages[0].length === 0 ? (
							<p>Currently you don't have any transactions.</p>
						) : (
							transactions.pages.map((page) =>
								page.map((transaction) =>
									transaction.type! === 'income' ? (
										<TransactionCard
											category='Income transaction'
											subcategory='Income'
											transactionDate={transaction.transactionDate}
											value={sum(
												(transaction as IMonthlyIncome).partTime,
												(transaction as IMonthlyIncome).gift,
												(transaction as IMonthlyIncome).paycheck
											)}
											key={transaction.id}
											type={transaction.type!}
										/>
									) : (
										<TransactionCard
											category={(transaction as IExpense).category}
											subcategory={(transaction as IExpense).subcategory}
											value={(transaction as IExpense).value}
											transactionDate={transaction.transactionDate}
											key={transaction.id}
											type={transaction.type!}
										/>
									)
								)
							)
						)}

						<div ref={ref}>{isFetchingNextPage && <Spinner />}</div>
						{!isFetchingNextPage && !isMobile && inView && hasNextPage && (
							<button ref={loadButtonRef} className='button' onClick={() => fetchNextPage()}>
								Load more
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default RecentTransactions
