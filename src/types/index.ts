import type { addIncomeSchema, expenseTransactionSchema, updateIncomeSchema } from '@/validations'
import type { InferType } from 'yup'

export interface IMonthlyIncome {
	id: string
	userId: string
	partTime: number
	paycheck: number
	gift: number
	yearMonth: string
	transactionDate: string
}
export interface IUserBudgetControl {
	userId: string
	budgetMax: number
}
export interface IExpenseCategory {
	id: number
	category: string
}
export interface IExpenseSubcategory {
	id: number
	categoryId: number
	subcategory: string
}
export interface ITotalMonthlyIncome {
	partTime: number
	paycheck: number
	gift: number
	total: number
}
export interface IExpense {
	id: string
	userId: string
	transactionDate: string
	category: number
	subcategory: number
	value: number
	yearMonth: string
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
	| UpdateIncomeFormValues
	| IExpenseSubcategory
	| TransactionsType
	| IExpense
export type ExpenseFormValue = InferType<typeof expenseTransactionSchema>
export type TransactionsType = (IMonthlyIncome | IExpense)[]
export type ExpenseType = 'subscriptions' | 'fixed' | 'transfers'
export type ExpenseTimeFilterValue = 'week' | 'month' | 'year'
