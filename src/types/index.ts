import type { addIncomeSchema } from '@/validations'
import type { InferType } from 'yup'

export interface IMonthlyIncome {
	userId: string
	partTime: number
	paycheck: number
	gift: number
	date: string
	createdAt: string
	updatedAt: string
}

export type CreateMonthlyIncome = Omit<IMonthlyIncome, 'createdAt' | 'updatedAt'>
export type IncomeFormValues = InferType<typeof addIncomeSchema>
