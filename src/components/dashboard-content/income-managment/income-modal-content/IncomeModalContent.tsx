import { useIncomeContext } from '@/contexts/IncomeManagmentContext'
import { useForm, type SubmitErrorHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addIncomeSchema, updateIncomeSchema } from '@/validations'
import { AiOutlineReload } from 'react-icons/ai'
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
import { useState, useEffect } from 'react'
import { useIncome } from '@/hooks/income-managment/useIncome'
import dayjs from 'dayjs'
import { AiFillEdit } from 'react-icons/ai'

import './income-modal-content.style.css'

const IncomeModalContent = () => {
	const { toggleIncomeModal, modalType } = useIncomeContext()
	const createIncome = useCreateIncome()
	const updateIncome = useUpdateIncome()
	const { nextPage, visibleIncomeTransactions, resetPage, hasMore } = useIncome()
	const [selectedIncomeType, setSelectedIncomeType] = useState<IncomeTypes | number>(0)
	const [selectedIncome, setSelectedIncome] = useState<IMonthlyIncome | null>(null)

	const createForm = useForm<AddIncomeFormValues>({
		resolver: yupResolver(addIncomeSchema),
	})
	const updateForm = useForm<UpdateIncomeFormValues>({
		resolver: yupResolver(updateIncomeSchema),
	})
	const { handleSubmit, reset } = modalType === 'create' ? createForm : updateForm
	const onSubmit = (data: AddIncomeFormValues | UpdateIncomeFormValues) => {
		if (modalType === 'create') {
			createIncome(data as AddIncomeFormValues)
		}
		if (modalType === 'update' && selectedIncome) {
			updateIncome({ data: data as UpdateIncomeFormValues, id: selectedIncome.id })
		}

		reset()
		resetPage()
		setSelectedIncomeType(0)
		setSelectedIncome(null)
		toggleIncomeModal(null)
	}
	const onError: SubmitErrorHandler<AddIncomeFormValues | UpdateIncomeFormValues> = (errors) => {
		const id = 'react-query-toast'
		const errorMessage = Object.values(errors).filter((error) => error.message)

		toast(errorMessage[0].message, { toastId: id })
	}

	useEffect(() => {
		if (selectedIncome && modalType === 'update') {
			updateForm.reset({
				partTime: selectedIncome.partTime,
				paycheck: selectedIncome.paycheck,
				gift: selectedIncome.gift,
			})
		}
	}, [selectedIncome, modalType])

	const handleSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === '0') {
			setSelectedIncomeType(0)
		} else {
			setSelectedIncomeType(e.target.value as IncomeTypes)
		}
	}
	const handleSelectedIncome = (income: IMonthlyIncome) => {
		setSelectedIncome(income)
	}
	const closeModalAndResetValues = () => {
		reset()
		resetPage()
		setSelectedIncomeType(0)
		setSelectedIncome(null)
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
									{...updateForm.register('partTime')}
									type='number'
									name='partTime'
									id='partTime'
									className='input'
								/>
							</div>
							<div>
								<label htmlFor='paycheck'>Paycheck</label>
								<input
									{...updateForm.register('paycheck')}
									type='number'
									name='paycheck'
									id='paycheck'
									className='input'
								/>
							</div>
							<div>
								<label htmlFor='gift'>Gift</label>
								<input
									{...updateForm.register('gift')}
									type='number'
									name='gift'
									id='gift'
									className='input'
								/>
							</div>
						</>
					) : (
						<div className='income-cards-container'>
							{visibleIncomeTransactions.map((income) => {
								return (
									<div key={income.id} className='income-transaction-card'>
										<div>
											<p className='income-transaction-date'>
												<strong>Date: </strong>
												{dayjs(income.transactionDate).format('DD-MM-YY')}
											</p>
											<p className='income-transaction-date'>
												<strong>Time: </strong>
												{dayjs(income.transactionDate).format('HH:mm')}
											</p>
										</div>
										<button className='button' onClick={() => handleSelectedIncome(income)}>
											<AiFillEdit />
										</button>
									</div>
								)
							})}
						</div>
					)
				) : (
					<>
						<div>
							<select
								{...createForm.register('addIncome')}
								name='addIncome'
								id='addIncome'
								className='input'
								onChange={handleSelectValue}
								value={selectedIncomeType}
							>
								<option value={0}>Select income type</option>
								<option value='partTime'>Part-Time</option>
								<option value='paycheck'>Paycheck</option>
								<option value='gift'>Gift</option>
							</select>
						</div>
						{typeof selectedIncomeType === 'string' && (
							<div>
								<label htmlFor={String(selectedIncomeType)}>Amount</label>
								<input
									{...createForm.register(selectedIncomeType as IncomeTypes)}
									type='number'
									name={String(selectedIncomeType)}
									id={String(selectedIncomeType)}
									className='input'
								/>
							</div>
						)}
					</>
				)}
			</div>
			<div className='income-modal-footer'>
				{(modalType === 'create' || (modalType === 'update' && selectedIncome)) && (
					<button className='button' onClick={handleSubmit(onSubmit, onError)}>
						{modalType === 'create' ? 'Add' : 'Update'}
					</button>
				)}
				<button className='button' onClick={closeModalAndResetValues}>
					Cancel
				</button>
				{selectedIncome ? (
					<button className='button' onClick={() => setSelectedIncome(null)}>
						Back
					</button>
				) : (
					<>
						{hasMore && modalType === 'update' && (
							<button className='button' onClick={nextPage}>
								Load more
								<AiOutlineReload />
							</button>
						)}
					</>
				)}
			</div>
		</>
	)
}

export default IncomeModalContent
