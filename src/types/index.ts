import type { addIncomeSchema, updateIncomeSchema } from '@/validations'
import type { InferType } from 'yup'

export interface IMonthlyIncome {
	id: string
	userId: string
	partTime: number
	paycheck: number
	gift: number
	yearMonth: string
	transactionDate: Date
}
export interface IUserBudgetControl {
	userId: string
	budgetMax: number
}
export interface IExpenseCategory {
	id: number
	category: string
	title: string
}
export interface ITotalMonthlyIncome {
	partTime: number
	paycheck: number
	gift: number
	total: number
}

export type CreateMonthlyIncome = IMonthlyIncome
export type AddIncomeFormValues = InferType<typeof addIncomeSchema>
export type UpdateIncomeFormValues = InferType<typeof updateIncomeSchema>
export type IncomeModalType = 'create' | 'update' | null
export type BudgetFormValue = number
export type IncomeTypes = 'partTime' | 'paycheck' | 'gift'
export type DataTransformNameType =
	| IMonthlyIncome
	| IUserBudgetControl
	| IExpenseCategory
	| ITotalMonthlyIncome
