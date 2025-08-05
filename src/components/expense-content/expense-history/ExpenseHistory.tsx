import { TbReportAnalytics } from 'react-icons/tb'

import './expense-history.style.css'

const ExpenseHistory = () => {
	return (
		<div className='expense-history content-card'>
			<div className='expense-history-header'>
				<h3>Expense history</h3>
				<div>
					<button className='button'>
						<TbReportAnalytics /> View report
					</button>
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
					<tbody>
						<tr>
							<td>Food</td>
							<td>Groceries</td>
							<td>EXP001</td>
							<td>$45.00</td>
							<td>2025-08-01</td>
						</tr>
						<tr>
							<td>Transport</td>
							<td>Bus</td>
							<td>EXP002</td>
							<td>$2.50</td>
							<td>2025-08-02</td>
						</tr>
						<tr>
							<td>Utilities</td>
							<td>Electricity</td>
							<td>EXP003</td>
							<td>$60.00</td>
							<td>2025-08-03</td>
						</tr>
						<tr>
							<td>Entertainment</td>
							<td>Movies</td>
							<td>EXP004</td>
							<td>$12.00</td>
							<td>2025-08-04</td>
						</tr>
						<tr>
							<td>Health</td>
							<td>Pharmacy</td>
							<td>EXP005</td>
							<td>$25.00</td>
							<td>2025-08-05</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ExpenseHistory
