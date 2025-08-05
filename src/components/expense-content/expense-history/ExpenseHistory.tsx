import { useExpenses } from '@/hooks/common/useExpense'
import dayjs from 'dayjs'
import { useExpenseCategories } from '@/hooks/common/useExpenseCategories'

import './expense-history.style.css'

const ExpenseHistory = () => {
	const {
		paginatedExpenses,
		handlePreviousPage,
		handleNextPage,
		handleItemsPerPage,
		checkNextPage,
		checkPreviousPage,
	} = useExpenses()
	const { getCategoryNameById, getSubcategoryNameById } = useExpenseCategories()

	const renderPaginatedExpenses = () => {
		if (paginatedExpenses.length === 0) {
			return (
				<tr>
					<td colSpan={5}>You don't have any expenses!</td>
				</tr>
			)
		}
		return paginatedExpenses.map((expense) => {
			return (
				<tr>
					<td>{getCategoryNameById(expense.category)}</td>
					<td>{getSubcategoryNameById(expense.subcategory)}</td>
					<td>{expense.id}</td>
					<td>${expense.value}</td>
					<td>{dayjs(expense.transactionDate).format('YYYY-MM-DD')}</td>
				</tr>
			)
		})
	}

	return (
		<div className='expense-history content-card'>
			<div className='expense-history-header'>
				<h3>Expense history</h3>
				<div>
					<select
						name='itemsPerPage'
						id='itemsPerPage'
						className='button'
						onChange={handleItemsPerPage}
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
					</select>
				</div>
			</div>
			<div className='table-responsive'>
				<table>
					<thead>
						<tr>
							<th>Category</th>
							<th>Subcategory</th>
							<th>ID</th>
							<th>Amount</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>{renderPaginatedExpenses()}</tbody>
				</table>
				<div className='pagination'>
					<button className='button' onClick={handlePreviousPage} disabled={!checkPreviousPage}>
						Previous
					</button>
					<button className='button' onClick={handleNextPage} disabled={!checkNextPage}>
						Next
					</button>
				</div>
			</div>
		</div>
	)
}

export default ExpenseHistory
