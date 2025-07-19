import { useIncomeContext } from '@/contexts/IncomeManagmentContext'
import { useForm, type SubmitErrorHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addIncomeSchema } from '@/validations'
import type { IncomeFormValues } from '@/types'

import './income-modal-content.style.css'
import { toast } from 'react-toastify'

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
	const { register, handleSubmit } = useForm<IncomeFormValues>({
		resolver: yupResolver(addIncomeSchema),
	})

	const onSubmit = (data: IncomeFormValues) => {
		console.log('Form Data:', data)
		alert('Form is valid!')
	}
	const onError: SubmitErrorHandler<IncomeFormValues> = (errors) => {
		const id = 'react-query-toast'
		const errorMessage = Object.values(errors).filter((error) => error.message)

		toast(errorMessage[0].message, { toastId: id })
	}

	return (
		<>
			<h3 className='income-modal-header'>Add income for the current month</h3>
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
					Add
				</button>
				<button className='button' onClick={toggleModal}>
					Cancel
				</button>
			</div>
		</>
	)
}

export default IncomeModalContent
