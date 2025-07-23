import { useBudgetContext } from '@/contexts/BudgetControlContext'
import { useState } from 'react'
import { useUpsertBudgetLimit } from '@/hooks/budget-control/useUpsertBudget'

import './budget-modal-content.style.css'

const BudgetModalContent = () => {
	const { toggleBudgetModal } = useBudgetContext()
	const upsertBudgetLimit = useUpsertBudgetLimit()
	const [maxValue, setMaxValue] = useState(0)

	const handleMaxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMaxValue(Number(e.target.value))
	}
	const handleBudgetLimit = () => {
		upsertBudgetLimit(maxValue)
		toggleBudgetModal()
	}

	return (
		<>
			<h3 className='budget-modal-header'>Set your budget limit</h3>
			<div className='budget-modal-body'>
				<div>
					<label htmlFor='budget_max'>Maximum budget: {maxValue}$</label>
					<input
						type='range'
						name='budget_max'
						className='input'
						min={0}
						max={20000}
						value={maxValue}
						onChange={handleMaxValue}
					/>
				</div>
			</div>
			<div className='budget-modal-footer'>
				<button className='button' onClick={handleBudgetLimit}>
					Set limit
				</button>
				<button className='button' onClick={toggleBudgetModal}>
					Cancel
				</button>
			</div>
		</>
	)
}

export default BudgetModalContent
