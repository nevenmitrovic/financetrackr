import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6'
import { FaMoneyBill } from 'react-icons/fa'
import { MdOutlineTrendingFlat } from 'react-icons/md'

import './expense-card.style.css'
import { useExpenseCategories } from '@/hooks/common/useExpenseCategories'

interface ExpenseCardProps {
	iconColor: string
	title: string
	trendType: 'decrease' | 'increase' | 'noChange'
	value: number
	percentage: number
	category: string
}

const ExpenseCard = ({
	iconColor,
	title,
	trendType,
	value,
	percentage,
	category,
}: ExpenseCardProps) => {
	const { getCategoryNameById } = useExpenseCategories()
	return (
		<div className='content-card expense-card'>
			<div>
				<h3>
					<FaMoneyBill color={iconColor} />
					{getCategoryNameById(Number(category))}
				</h3>
				<p>{title}</p>
			</div>
			<div className='trend-info'>
				<h3>{value}$</h3>
				{trendType === 'increase' ? (
					<div className='trend-up'>
						<p>
							<FaArrowTrendUp />
							{percentage}%
						</p>
						<span>increase since last month</span>
					</div>
				) : trendType === 'decrease' ? (
					<div className='trend-down'>
						<p>
							<FaArrowTrendDown />
							{percentage}%
						</p>
						<span>decrease since last month</span>
					</div>
				) : (
					<div className='noChange'>
						<p>
							<MdOutlineTrendingFlat />
							{percentage}%
						</p>
						<span>no change since last month</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default ExpenseCard
