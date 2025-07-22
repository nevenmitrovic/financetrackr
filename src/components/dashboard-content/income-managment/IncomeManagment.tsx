import { FaPlus } from 'react-icons/fa6'
import { AiFillEdit } from 'react-icons/ai'

import IncomeCategoryCard from '@/components/dashboard-content/income-managment/income-category-card/IncomeCategoryCard'
import { useIncome } from '@/hooks/income-managment/useIncome'
import { useIncomeContext } from '@/contexts/IncomeManagmentContext'
import { getPercentageOfSum, sum } from '@/utils'

import './income-managment.style.css'

const IncomeManagment = () => {
	const userMonthlyIncome = useIncome()
	const { toggleModal } = useIncomeContext()

	const totalIncome = userMonthlyIncome
		? sum(userMonthlyIncome.partTime, userMonthlyIncome.gift, userMonthlyIncome.paycheck)
		: 0

	return (
		<>
			<div className='content-card income-managment'>
				<div className='income-managment-header'>
					<h3>Income Managment</h3>
					<p>Montly income recap</p>
					<div className='income-controller'>
						<h3>{!!totalIncome ? totalIncome : 0}$</h3>
						<div>
							<button className='button' onClick={() => toggleModal('create')}>
								<FaPlus />
								Add
							</button>
							<button className='button' onClick={() => toggleModal('update')}>
								<AiFillEdit />
							</button>
						</div>
					</div>
				</div>
				<div className='income-managment-view'>
					{userMonthlyIncome ? (
						<>
							<p>Income breakdown</p>
							<div className='income-category-container'>
								<IncomeCategoryCard
									title='Part-Time'
									value={userMonthlyIncome.partTime}
									widthPerc={getPercentageOfSum(userMonthlyIncome.partTime, totalIncome)}
									widthColor='--clr-income-part-time'
								/>
								<IncomeCategoryCard
									title='Paycheck'
									value={userMonthlyIncome.paycheck}
									widthPerc={getPercentageOfSum(userMonthlyIncome.paycheck, totalIncome)}
									widthColor='--clr-income-paycheck'
								/>
								<IncomeCategoryCard
									title='Gift'
									value={userMonthlyIncome.gift}
									widthPerc={getPercentageOfSum(userMonthlyIncome.gift, totalIncome)}
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
