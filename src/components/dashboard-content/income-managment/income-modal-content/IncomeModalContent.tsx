import { useState } from 'react'
import { useIncomeContext } from '@/contexts/IncomeManagmentContext'

import './income-modal-content.style.css'

// USE THIS FOR PATCH INCOME DATA
{
	/* <label htmlFor='incomeType'>Select the income type</label>
<select
	id='incomeType'
	name='incomeType'
	className='button'
	value={incomeType}
	onChange={handleIncomeTypeChange}
>
	<option value=''>-- Select --</option>
	<option value='partTime'>Part-Time</option>
	<option value='paycheck'>Paycheck</option>
	<option value='gift'>Gift</option>
</select> */
	//	const [incomeType, setIncomeType] = useState('')
	//	const handleIncomeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
	//	setIncomeType(e.target.value)
	// }
}

const IncomeModalContent = () => {
	const { toggleModal } = useIncomeContext()

	return (
		<>
			<h3 className='income-modal-header'>Add income for the current month</h3>
			<div className='income-modal-body'>
				<div>
					<label htmlFor='partTime'>Part-Time</label>
					<input type='number' name='partTime' className='input' />
				</div>
				<div>
					<label htmlFor='paycheck'>Paycheck</label>
					<input type='number' name='paycheck' className='input' />
				</div>
				<div>
					<label htmlFor='gift'>Gift</label>
					<input type='number' name='gift' className='input' />
				</div>
			</div>
			<div className='income-modal-footer'>
				<button className='button'>Add</button>
				<button className='button' onClick={toggleModal}>
					Cancel
				</button>
			</div>
		</>
	)
}

export default IncomeModalContent
