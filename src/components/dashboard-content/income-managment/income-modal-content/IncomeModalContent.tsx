import { useIncomeContext } from '@/contexts/IncomeManagmentContext'
import { useForm, type SubmitErrorHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addIncomeSchema } from '@/validations'
import type { IncomeFormValues } from '@/types'
import { toast } from 'react-toastify'
import { useCreateIncome } from '@/hooks/income-managment/useCreateIncome'
import { useIncome } from '@/hooks/income-managment/useIncome'
import { firstLetterUppercase } from '@/utils'

import './income-modal-content.style.css'

const IncomeModalContent = () => {
	const { toggleModal, modalType } = useIncomeContext()
	const { register, handleSubmit } = useForm<IncomeFormValues>({
		resolver: yupResolver(addIncomeSchema),
	})
	const createIncome = useCreateIncome()
	const userMonthlyIncome = useIncome()

	const onSubmit = (data: IncomeFormValues) => {
		createIncome(data)
		toggleModal(null)
	}
	const onError: SubmitErrorHandler<IncomeFormValues> = (errors) => {
		const id = 'react-query-toast'
		const errorMessage = Object.values(errors).filter((error) => error.message)

		toast(errorMessage[0].message, { toastId: id })
	}

	return (
		<>
			<h3 className='income-modal-header'>
				{firstLetterUppercase(modalType!)} income for the current month
			</h3>
			<div className='income-modal-body'>
				<div>
					<label htmlFor='partTime'>Part-Time</label>
					<input
						{...register('partTime')}
						type='number'
						name='partTime'
						className='input'
						value={userMonthlyIncome ? userMonthlyIncome.partTime : 0}
					/>
				</div>
				<div>
					<label htmlFor='paycheck'>Paycheck</label>
					<input
						{...register('paycheck')}
						type='number'
						name='paycheck'
						className='input'
						value={userMonthlyIncome ? userMonthlyIncome.paycheck : 0}
					/>
				</div>
				<div>
					<label htmlFor='gift'>Gift</label>
					<input
						{...register('gift')}
						type='number'
						name='gift'
						className='input'
						value={userMonthlyIncome ? userMonthlyIncome.gift : 0}
					/>
				</div>
			</div>
			<div className='income-modal-footer'>
				<button className='button' onClick={handleSubmit(onSubmit, onError)}>
					Add
				</button>
				<button className='button' onClick={() => toggleModal(null)}>
					Cancel
				</button>
			</div>
		</>
	)
}

export default IncomeModalContent
