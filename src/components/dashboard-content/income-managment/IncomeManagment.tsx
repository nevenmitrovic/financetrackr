import { FaPlus } from 'react-icons/fa6'
import { AiFillEdit } from 'react-icons/ai'
import IncomeCategoryCard from '@/components/dashboard-content/income-managment/income-category-card/IncomeCategoryCard'

import './income-managment.style.css'

const IncomeManagment = () => {
	return (
		<div className='content-card income-managment'>
			<div className='income-managment-header'>
				<h3>Income Managment</h3>
				<p>Montly income recap</p>
				<div className='income-controller'>
					<h3>3350.00$</h3>
					<div>
						<button className='button'>
							<FaPlus />
							Add
						</button>
						<button className='button'>
							<AiFillEdit />
						</button>
					</div>
				</div>
			</div>
			<div className='income-managment-view'>
				<p>Income breakdown</p>
				<div className='income-category-container'>
					<IncomeCategoryCard
						title='Part-Time'
						value={1412}
						widthPerc='44'
						widthColor='--clr-income-part-time'
					/>
					<IncomeCategoryCard
						title='Paycheck'
						value={1173}
						widthPerc='35'
						widthColor='--clr-income-paycheck'
					/>
					<IncomeCategoryCard
						title='Part-Time'
						value={765}
						widthPerc='21'
						widthColor='--clr-income-gift'
					/>
				</div>
			</div>
		</div>
	)
}

export default IncomeManagment
