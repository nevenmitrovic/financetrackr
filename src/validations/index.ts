import * as Yup from 'yup'

export const updateIncomeSchema = Yup.object().shape({
	partTime: Yup.number()
		.typeError('Part-time income must be a valid number')
		.min(0, 'Part-time income cannot be negative')
		.default(0),
	paycheck: Yup.number()
		.typeError('Paycheck amount must be a valid number')
		.min(0, 'Paycheck amount cannot be negative')
		.default(0),
	gift: Yup.number()
		.typeError('Gift amount must be a valid number')
		.min(0, 'Gift amount cannot be negative')
		.default(0),
})
export const addIncomeSchema = Yup.object().shape({
	addIncome: Yup.string()
		.typeError('Select income type')
		.test('not-zero', 'Please select a valid income type', (value) => value !== '0')
		.required(),
	partTime: Yup.number()
		.typeError('Part-time income must be a valid number')
		.min(0, 'Part-time income cannot be negative')
		.default(0)
		.when('addIncome', {
			is: 'partTime',
			then: (schema) =>
				schema
					.min(1, 'Part-time income is required and must be greater than 0')
					.required('Part-time income is required'),
			otherwise: (schema) => schema.optional(),
		}),
	paycheck: Yup.number()
		.typeError('Paycheck amount must be a valid number')
		.min(0, 'Paycheck amount cannot be negative')
		.default(0)
		.when('addIncome', {
			is: 'paycheck',
			then: (schema) =>
				schema
					.min(1, 'Paycheck amount is required and must be greater than 0')
					.required('Paycheck amount is required'),
			otherwise: (schema) => schema.optional(),
		}),
	gift: Yup.number()
		.typeError('Gift amount must be a valid number')
		.min(0, 'Gift amount cannot be negative')
		.default(0)
		.when('addIncome', {
			is: 'gift',
			then: (schema) =>
				schema
					.min(1, 'Gift amount is required and must be greater than 0')
					.required('Gift amount is required'),
			otherwise: (schema) => schema.optional(),
		}),
})
export const expenseTransactionSchema = Yup.object().shape({
	value: Yup.number()
		.typeError('Expense amount must be a valid number')
		.min(1, 'Expense amount must be greater than 0')
		.required('Expense amount is required'),
	category: Yup.number()
		.min(1, 'Category value is required')
		.required('Category value is required'),
	subcategory: Yup.number()
		.min(1, 'Subcategory value is required')
		.required('Subcategory value is required'),
})
