import { useIncomeContext } from '@/contexts/IncomeManagmentContext'
import { useForm, type SubmitErrorHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addIncomeSchema } from '@/validations'
import type { IncomeFormValues } from '@/types'
import { toast } from 'react-toastify'
import { useCreateIncome } from '@/hooks/income-managment/useCreateIncome'
import { firstLetterUppercase } from '@/utils'
import { useUpdateIncome } from '@/hooks/income-managment/useUpdateIncome'

import './income-modal-content.style.css'

const IncomeModalContent = () => {
	const { toggleModal, modalType } = useIncomeContext()
	const createIncome = useCreateIncome()
	const updateIncome = useUpdateIncome()

	const { register, handleSubmit, reset } = useForm<IncomeFormValues>({
		resolver: yupResolver(addIncomeSchema),
		defaultValues: {
			partTime: 0,
			paycheck: 0,
			gift: 0,
		},
	})

	const onSubmit = (data: IncomeFormValues) => {
		if (modalType === 'create') {
			createIncome(data)
		}
		if (modalType === 'update') {
			updateIncome(data)
		}

		reset()
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
					<input {...register('partTime')} type='number' name='partTime' className='input' />
				</div>
				<div>
					<label htmlFor='paycheck'>Paycheck</label>
					<input {...register('paycheck')} type='number' name='paycheck' className='input' />
				</div>
				<div>
					<label htmlFor='gift'>Gift</label>
					<input {...register('gift')} type='number' name='gift' className='input' />
				</div>
			</div>
			<div className='income-modal-footer'>
				<button className='button' onClick={handleSubmit(onSubmit, onError)}>
					{modalType === 'create' ? 'Create' : 'Update'}
				</button>
				<button className='button' onClick={() => toggleModal(null)}>
					Cancel
				</button>
			</div>
		</>
	)
}

export default IncomeModalContent
