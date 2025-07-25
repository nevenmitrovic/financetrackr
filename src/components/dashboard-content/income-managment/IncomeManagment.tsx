import { FaPlus } from 'react-icons/fa6'
import { AiFillEdit } from 'react-icons/ai'

import IncomeCategoryCard from '@/components/dashboard-content/income-managment/income-category-card/IncomeCategoryCard'
import { useIncome } from '@/hooks/income-managment/useIncome'
import { useIncomeContext } from '@/contexts/IncomeManagmentContext'
import { getPercentageOfSum } from '@/utils'

import './income-managment.style.css'

const IncomeManagment = () => {
	const { total } = useIncome()
	const { toggleIncomeModal } = useIncomeContext()

	return (
		<>
			<div className='content-card income-managment'>
				<div className='income-managment-header'>
					<h3>Income Managment</h3>
					<p>Montly income recap</p>
					<div className='income-controller'>
						<h3>{total.total}$</h3>
						<div>
							<button className='button' onClick={() => toggleIncomeModal('create')}>
								<FaPlus />
								Add
							</button>
							<button className='button' onClick={() => toggleIncomeModal('update')}>
								<AiFillEdit />
							</button>
						</div>
					</div>
				</div>
				<div className='income-managment-view'>
					{total.total > 0 ? (
						<>
							<p>Income breakdown</p>
							<div className='income-category-container'>
								<IncomeCategoryCard
									title='Part-Time'
									value={total.partTime}
									widthPerc={getPercentageOfSum(total.partTime, total.total)}
									widthColor='--clr-income-part-time'
								/>
								<IncomeCategoryCard
									title='Paycheck'
									value={total.paycheck}
									widthPerc={getPercentageOfSum(total.paycheck, total.total)}
									widthColor='--clr-income-paycheck'
								/>
								<IncomeCategoryCard
									title='Gift'
									value={total.gift}
									widthPerc={getPercentageOfSum(total.gift, total.total)}
									widthColor='--clr-income-gift'
								/>
							</div>
						</>
					) : (
						<>
							<p>Please add information about your monthly income.</p>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default IncomeManagment
