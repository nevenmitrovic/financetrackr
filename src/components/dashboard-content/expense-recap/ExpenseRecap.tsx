import { useState, useEffect } from 'react'
import './expense-recap.style.css'

interface ExpenseData {
	category: string
	amount: number
	percentage: number
	color: string
}

const ExpenseRecap = () => {
	const [timeFilter, setTimeFilter] = useState('week')
	const [expenseData, setExpenseData] = useState<ExpenseData[]>([])

	useEffect(() => {
		const mockData: ExpenseData[] = [
			{ category: 'Food', amount: 450, percentage: 5, color: '#E91E63' },
			{ category: 'Transport', amount: 320, percentage: 15, color: '#4DD0E1' },
			{ category: 'Entertainment', amount: 280, percentage: 80, color: '#3F51B5' },
		]
		setExpenseData(mockData)
	}, [timeFilter])

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTimeFilter(e.target.value)
	}

	const total = expenseData.reduce((sum, item) => sum + item.amount, 0)
	const circumference = 2 * Math.PI * 45

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
						{expenseData.map((item, index) => {
							const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`
							const strokeDashoffset = (-cumulativePercentage * circumference) / 100
							cumulativePercentage += item.percentage

							return (
								<circle
									key={index}
									cx='100'
									cy='100'
									r='45'
									fill='none'
									stroke={item.color}
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
					{expenseData.map((item, index) => (
						<div key={index} className='legend-item'>
							<div className='legend-color' style={{ backgroundColor: item.color }}></div>
							<div className='legend-details'>
								<span className='legend-category'>{item.category}</span>
								<span className='legend-amount'>${item.amount}</span>
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
