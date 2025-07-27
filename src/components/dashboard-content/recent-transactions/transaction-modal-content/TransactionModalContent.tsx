import { useTransactionContext } from '@/contexts/RecentTransactionContext'
import { useExpenseCategories } from '@/hooks/common/useExpenseCategories'
import { useState } from 'react'

import './transaction-modal-content.style.css'

const TransactionModalContent = () => {
	const { toggleTransactionModal } = useTransactionContext()
	const { expenseCategories, handleCategoryValue, categoryValue, filteredSubcategories } =
		useExpenseCategories()
	const [subcategoryValue, setSubcategoryValue] = useState(0)

	const handleSubcategoryValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSubcategoryValue(Number(e.target.value))
	}

	return (
		<>
			<h3 className='transaction-modal-header'>Add a new transaction</h3>
			<div className='transaction-modal-body'>
				<div>
					<select
						name='transactionCategory'
						id='transactionCategory'
						className='input'
						value={categoryValue}
						onChange={handleCategoryValue}
					>
						<option value={0}>Select a transaction category</option>
						{expenseCategories &&
							expenseCategories.map((category) => {
								return (
									<option key={category.id} value={category.id}>
										{category.category}
									</option>
								)
							})}
					</select>
				</div>
				<div>
					<select
						name='transactionSubcategory'
						id='transactionSubcategory'
						className='input'
						value={subcategoryValue}
						onChange={handleSubcategoryValue}
						disabled={!categoryValue}
					>
						<option value={0}>
							{!categoryValue ? 'Select a category first' : 'Select a transaction subcategory'}
						</option>
						{filteredSubcategories.map((subcategory) => {
							return (
								<option key={subcategory.id} value={subcategory.id}>
									{subcategory.subcategory}
								</option>
							)
						})}
					</select>
				</div>
				<div>
					<div>
						<label htmlFor='expenseValue'>Expense value</label>
						<input
							type='number'
							name='expenseValue'
							id='expenseValue'
							className='input'
							disabled={!categoryValue || !subcategoryValue}
						/>
					</div>
				</div>
			</div>
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
