import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6'
import { FaMoneyBill } from 'react-icons/fa'

import './expense-card.style.css'

interface ExpenseCardProps {
	iconColor: string
	title: string
	type: 'decrease' | 'increase'
	value: number
	percentage: number
}

const ExpenseCard = ({ iconColor, title, type, value, percentage }: ExpenseCardProps) => {
	return (
		<div className='content-card expense-card'>
			<h3>
				<FaMoneyBill color={iconColor} />
				{title}
			</h3>
			<div>
				<h3>{value}$</h3>
				{type === 'increase' ? (
					<div className='trend-up'>
						<p>
							<FaArrowTrendUp />
							{percentage}%
						</p>
						<span>increase since last month</span>
					</div>
				) : (
					<div className='trend-down'>
						<p>
							<FaArrowTrendDown />
							{percentage}%
						</p>
						<span>decrease since last month</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default ExpenseCard
