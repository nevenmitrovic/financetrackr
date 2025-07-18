import { useState } from 'react'
import { useIncomeContext } from '@/contexts/IncomeManagmentContext'

import './income-modal-content.style.css'

const IncomeModalContent = () => {
	const [incomeType, setIncomeType] = useState('')
	const { toggleModal } = useIncomeContext()

	const handleIncomeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setIncomeType(e.target.value)
	}

	return (
		<>
			<h3 className='income-modal-header'>Add income for the current month</h3>
			<div className='income-modal-body'>
				<div>
					<label htmlFor='incomeType'>Select the income type</label>
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
					</select>
				</div>
				<div>
					<label htmlFor='addIncome'>Add income value</label>
					<input type='number' name='addIncome' className='input' />
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
