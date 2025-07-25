import { useIncomeContext } from '@/contexts/IncomeManagmentContext'
import { useForm, type SubmitErrorHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addIncomeSchema, updateIncomeSchema } from '@/validations'
import type {
	AddIncomeFormValues,
	IncomeTypes,
	UpdateIncomeFormValues,
	IMonthlyIncome,
} from '@/types'
import { toast } from 'react-toastify'
import { useCreateIncome } from '@/hooks/income-managment/useCreateIncome'
import { firstLetterUppercase } from '@/utils'
import { useUpdateIncome } from '@/hooks/income-managment/useUpdateIncome'
import { useState } from 'react'
import { useIncome } from '@/hooks/income-managment/useIncome'

import './income-modal-content.style.css'
import dayjs from 'dayjs'

const INCOME_TYPE_LABELS = {
	partTime: 'Part-Time',
	paycheck: 'Paycheck',
	gift: 'Gift',
}

const IncomeModalContent = () => {
	const { toggleIncomeModal, modalType } = useIncomeContext()
	const createIncome = useCreateIncome()
	const updateIncome = useUpdateIncome()
	const { userMonthlyIncome } = useIncome()
	const [selectValue, setSelectValue] = useState<IncomeTypes | number>(0)
	const [selectedIncome, setSelectedIncome] = useState<IMonthlyIncome | null>(null)

	const { register, handleSubmit, reset } = useForm<AddIncomeFormValues>({
		resolver: yupResolver(addIncomeSchema),
	})

	const onSubmit = (data: AddIncomeFormValues) => {
		if (modalType === 'create') {
			createIncome(data)
		}
		if (modalType === 'update') {
			updateIncome(data)
		}

		reset()
		setSelectValue(0)
		toggleIncomeModal(null)
	}
	const onError: SubmitErrorHandler<AddIncomeFormValues> = (errors) => {
		const id = 'react-query-toast'
		const errorMessage = Object.values(errors).filter((error) => error.message)

		toast(errorMessage[0].message, { toastId: id })
	}
	const handleSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === '0') {
			setSelectValue(0)
		} else {
			setSelectValue(e.target.value as IncomeTypes)
		}
	}
	const closeModalAndResetValues = () => {
		setSelectValue(0)
		reset()
		toggleIncomeModal(null)
	}

	return (
		<>
			<h3 className='income-modal-header'>
				{firstLetterUppercase(modalType!)} income for the current month
			</h3>
			<div className='income-modal-body'>
				{modalType === 'update' ? (
					selectedIncome ? (
						<>
							<div>
								<label htmlFor='partTime'>Part-Time</label>
								<input
									{...register('partTime')}
									type='number'
									name='partTime'
									id='partTime'
									className='input'
								/>
							</div>
							<div>
								<label htmlFor='paycheck'>Paycheck</label>
								<input
									{...register('paycheck')}
									type='number'
									name='paycheck'
									id='paycheck'
									className='input'
								/>
							</div>
							<div>
								<label htmlFor='gift'>Gift</label>
								<input
									{...register('gift')}
									type='number'
									name='gift'
									id='gift'
									className='input'
								/>
							</div>
						</>
					) : (
						<div>
							{userMonthlyIncome.map((income) => {
								return (
									<p key={income.id}>{dayjs(income.transactionDate).format('DD-MM-YY HH:mm')}</p>
								)
							})}
						</div>
					)
				) : (
					<>
						<div>
							<select
								{...register('addIncome')}
								name='addIncome'
								id='addIncome'
								className='input'
								onChange={handleSelectValue}
								value={selectValue}
							>
								<option value={0}>Select income type</option>
								<option value='partTime'>Part-Time</option>
								<option value='paycheck'>Paycheck</option>
								<option value='gift'>Gift</option>
							</select>
						</div>
						{typeof selectValue === 'string' && (
							<div>
								<label htmlFor={String(selectValue)}>{INCOME_TYPE_LABELS[selectValue]}</label>
								<input
									{...register(selectValue as IncomeTypes)}
									type='number'
									name={String(selectValue)}
									className='input'
								/>
							</div>
						)}
					</>
				)}
			</div>
			<div className='income-modal-footer'>
				<button className='button' onClick={handleSubmit(onSubmit, onError)}>
					{modalType === 'create' ? 'Add' : 'Update'}
				</button>
				<button className='button' onClick={closeModalAndResetValues}>
					Cancel
				</button>
			</div>
		</>
	)
}

export default IncomeModalContent
