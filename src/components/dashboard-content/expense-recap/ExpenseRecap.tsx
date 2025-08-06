import './expense-recap.style.css'
import { useExpense } from '@/hooks/common/useExpense'
import { useExpenseCategories } from '@/hooks/common/useExpenseCategories'
import { getColorByIndex } from '@/utils'

const CIRCUMFERENCE = 2 * Math.PI * 45

const ExpenseRecap = () => {
	const { timeFilter, handleFilterChange, categoryStats } = useExpense()
	const { getCategoryNameById } = useExpenseCategories()
	let cumulativePercentage = 0

	return (
		<div className='expense-recap content-card'>
			<div className='expense-recap-header'>
				<h3>Expense Recap</h3>
				<select
					name='filterByTime'
					id='filterByTime'
					value={timeFilter}
					onChange={handleFilterChange}
					className='button'
				>
					<option value='week'>Weekly</option>
					<option value='month'>Monthly</option>
					<option value='year'>Yearly</option>
				</select>
			</div>

			<div className='expense-recap-content'>
				<div className='donut-chart-container'>
					<svg width='200' height='200' viewBox='0 0 200 200' className='donut-chart'>
						<circle cx='100' cy='100' r='45' fill='none' stroke='#f0f0f0' strokeWidth='20' />
						{categoryStats.map((item, index) => {
							const strokeDasharray = `${(item.percentage / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`
							const strokeDashoffset = (-cumulativePercentage * CIRCUMFERENCE) / 100
							cumulativePercentage += item.percentage

							return (
								<circle
									key={`${item.category}-${index}`}
									cx='100'
									cy='100'
									r='45'
									fill='none'
									stroke={getColorByIndex(index)}
									strokeWidth='20'
									strokeDasharray={strokeDasharray}
									strokeDashoffset={strokeDashoffset}
									transform='rotate(-90 100 100)'
								/>
							)
						})}
					</svg>
				</div>

				<div className='expense-legend'>
					{categoryStats.map((item, index) => (
						<div key={`${item.category}-${index}`} className='legend-item'>
							<div
								className='legend-color'
								style={{ backgroundColor: getColorByIndex(index) }}
							></div>
							<div className='legend-details'>
								<span className='legend-category'>
									{getCategoryNameById(Number(item.category))}
								</span>
								<span className='legend-amount'>${item.total}</span>
								<span className='legend-percentage'>{item.percentage}%</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ExpenseRecap
