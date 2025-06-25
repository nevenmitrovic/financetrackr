import { FaPlus } from 'react-icons/fa6'
import { AiFillEdit } from 'react-icons/ai'

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
						<button>
							<FaPlus />
							Add
						</button>
						<button>
							<AiFillEdit />
						</button>
					</div>
				</div>
			</div>
			<div className='income-managment-view'>
				<p>Income breakdown</p>
				<div className='part-time'>part-time</div>
				<div className='paycheck'>paycheck</div>
				<div className='gift'>gift</div>
			</div>
		</div>
	)
}

export default IncomeManagment
