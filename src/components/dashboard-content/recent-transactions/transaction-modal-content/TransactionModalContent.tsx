import { useTransactionContext } from '@/contexts/RecentTransactionContext'
import { useExpenseCategories } from '@/hooks/common/useExpenseCategories'
import { useState } from 'react'
import { useForm, type SubmitErrorHandler } from 'react-hook-form'
import type { ExpenseFormValue } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { expenseTransactionSchema } from '@/validations'
import { useCreateExpenseTransaction } from '@/hooks/recent-transactions/useCreateExpenseTransaction'
import { toast } from 'react-toastify'

import './transaction-modal-content.style.css'

const TransactionModalContent = () => {
	const { toggleTransactionModal } = useTransactionContext()
	const createExpenseTransaction = useCreateExpenseTransaction()
	const {
		expenseCategories,
		handleCategoryValue,
		categoryValue,
		filteredSubcategories,
		resetCategoryValue,
	} = useExpenseCategories()
	const [subcategoryValue, setSubcategoryValue] = useState(0)
	const { register, handleSubmit, reset, setValue } = useForm<ExpenseFormValue>({
		resolver: yupResolver(expenseTransactionSchema),
	})

	const handleSubcategoryValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSubcategoryValue(Number(e.target.value))
	}
	const closeModalAndResetValues = () => {
		reset()
		setSubcategoryValue(0)
		resetCategoryValue()
		setValue('value', 0)
		toggleTransactionModal()
	}
	const onSubmit = (data: ExpenseFormValue) => {
		createExpenseTransaction(data)
		closeModalAndResetValues()
	}
	const onError: SubmitErrorHandler<ExpenseFormValue> = (errors) => {
		const id = 'react-query-toast'
		const errorMessage = Object.values(errors).filter((error) => error.message)

		toast(errorMessage[0].message, { toastId: id })
	}

	return (
		<>
			<h3 className='transaction-modal-header'>Add a new transaction</h3>
			<div className='transaction-modal-body'>
				<div>
					<select
						{...register('category')}
						name='category'
						id='category'
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
						{...register('subcategory')}
						name='subcategory'
						id='subcategory'
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
							{...register('value')}
							type='number'
							name='value'
							id='value'
							className='input'
							disabled={!categoryValue || !subcategoryValue}
						/>
					</div>
				</div>
			</div>
			<div className='transaction-modal-footer'>
				<button className='button' onClick={handleSubmit(onSubmit, onError)}>
					Add
				</button>
				<button className='button' onClick={closeModalAndResetValues}>
					Cancel
				</button>
			</div>
		</>
	)
}

export default TransactionModalContent
