import * as Yup from 'yup'

export const addIncomeSchema = Yup.object().shape({
	partTime: Yup.number()
		.typeError('Part-time income must be a valid number')
		.min(0, 'Part-time income cannot be negative')
		.optional()
		.default(0),
	paycheck: Yup.number()
		.typeError('Paycheck amount must be a valid number')
		.min(0, 'Paycheck amount cannot be negative')
		.optional()
		.default(0),
	gift: Yup.number()
		.typeError('Gift amount must be a valid number')
		.min(0, 'Gift amount cannot be negative')
		.optional()
		.default(0),
})
