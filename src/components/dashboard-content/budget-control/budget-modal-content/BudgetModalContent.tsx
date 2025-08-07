import { useBudgetContext } from '@/contexts/BudgetControlContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUpsertBudgetLimit } from '@/hooks/budget-control/useUpsertBudget'
import { toast } from 'react-toastify'
import { budgetLimitSchema } from '@/validations'

import './budget-modal-content.style.css'

const BudgetModalContent = () => {
	const { toggleBudgetModal } = useBudgetContext()
	const upsertBudgetLimit = useUpsertBudgetLimit()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ maxValue: number }>({
		defaultValues: { maxValue: 0 },
		resolver: yupResolver(budgetLimitSchema),
	})

	const onSubmit = (data: { maxValue: number }) => {
		upsertBudgetLimit(data.maxValue)
		toggleBudgetModal()
	}
	const onError = (formErrors: typeof errors) => {
		if (formErrors.maxValue) {
			toast.error(formErrors.maxValue.message || 'Invalid budget value')
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit, onError)}>
			<h3 className='budget-modal-header'>Set your budget limit</h3>
			<div className='budget-modal-body'>
				<div>
					<label htmlFor='budget_max'>Maximum budget:</label>
					<input
						type='number'
						step='1'
						min='0'
						id='budget_max'
						className='input'
						{...register('maxValue')}
					/>
				</div>
			</div>
			<div className='budget-modal-footer'>
				<button className='button' type='submit'>
					Set limit
				</button>
				<button className='button' type='button' onClick={toggleBudgetModal}>
					Cancel
				</button>
			</div>
		</form>
	)
}

export default BudgetModalContent
