import { useExpenseCategories } from '@/hooks/common/useExpenseCategories'
import './transaction-card.style.css'
import logo from '@/assets/images/avatar.png'
import { useImages } from '@/hooks/common/useImages'
import dayjs from 'dayjs'
import { GoDotFill } from 'react-icons/go'
import { getExpenseCSSVariable } from '@/utils'

interface TransactionCardProps {
	category: number | string
	subcategory: number | string
	transactionDate: string
	value: number
}

const TransactionCard = ({
	category,
	subcategory,
	transactionDate,
	value,
}: TransactionCardProps) => {
	const { getImageByName } = useImages()
	const { getCategoryNameById, getSubcategoryNameById } = useExpenseCategories()

	const image =
		typeof category === 'string'
			? getImageByName('income')?.publicUrl ?? logo
			: getImageByName(getCategoryNameById(category as number))?.publicUrl ?? logo
	const transactionColor =
		typeof category === 'string'
			? 'var(--clr-income-paycheck)'
			: getExpenseCSSVariable(getCategoryNameById(category as number))

	return (
		<div className='transaction-card'>
			<img src={image} alt='transaction card logo' />
			<div>
				<div className='transaction-card-info'>
					<div>
						<h4>
							{typeof subcategory === 'string' ? subcategory : getSubcategoryNameById(subcategory)}
						</h4>
						<p>{dayjs(transactionDate).format('MMMM D, YYYY [at] h:mm A')}</p>
					</div>
				</div>
				<div className='transaction-category'>
					<GoDotFill color={transactionColor} />
					{typeof category === 'string' ? category : getCategoryNameById(category)}
				</div>
				<div className='transaction-value'>
					<h4>
						{category === 'Income transaction' ? '+' : '-'}
						{value}$
					</h4>
				</div>
			</div>
		</div>
	)
}

export default TransactionCard
