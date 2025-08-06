import type { DataTransformNameType, ExpenseType, IMonthlyIncome } from '@/types'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx'

export const formatPath = (path: string): string => {
	if (path === '/') return 'Home'

	return firstLetterUppercase(path.slice(1))
}

export function firstLetterUppercase(word: string) {
	if (!word) return ''
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export function getCurrentMonthYear(): string {
	return dayjs().format('YYYY-MM')
}

export function sum(...args: number[]): number {
	return args.reduce((prev, curr) => prev + curr, 0)
}

export function getPercentageOfSum(individualSum: number, totalSum: number): number {
	return (individualSum / totalSum) * 100
}

export function removeDuplicatesFromArr(arr: string[]) {
	return [...new Set(arr)]
}

export function toSnakeCase(obj: DataTransformNameType) {
	if (!obj) return undefined

	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key.replace(/([A-Z])/g, '_$1').toLowerCase(), value])
	)
}

export function toCamelCase(obj: DataTransformNameType) {
	if (!obj) return undefined

	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [
			key.replace(/_([a-z])/g, (_, g) => g.toUpperCase()),
			value,
		])
	)
}

function categorizeExpense(category: string): ExpenseType {
	const subscriptionCategories = ['Bills & Subscriptions', 'Entertainment & Hobbies']
	const fixedCategories = [
		'Housing & Utilities',
		'Transport & Travel',
		'Health & Fitness',
		'Education',
	]
	const transferCategories = ['Finance & Savings', 'Work & Business']

	if (subscriptionCategories.includes(category)) {
		return 'subscriptions'
	}

	if (fixedCategories.includes(category)) {
		return 'fixed'
	}

	if (transferCategories.includes(category)) {
		return 'transfers'
	}

	const defaultMapping: Record<string, ExpenseType> = {
		'Food & Drinks': 'subscriptions',
		'Shopping & Personal': 'subscriptions',
		'Family & Kids': 'fixed',
		'Gifts & Donations': 'transfers',
		Other: 'subscriptions',
	}

	return defaultMapping[category] || 'subscriptions'
}
export function getExpenseCSSVariable(category: string | null): string {
	if (!category) return '--clr-text-primary'

	const expenseType = categorizeExpense(category)

	const cssVarMap: Record<ExpenseType, string> = {
		subscriptions: 'var(--clr-expense-subscriptions)',
		fixed: 'var(--clr-expense-fixed)',
		transfers: 'var(--clr-expense-transfers)',
	}

	return cssVarMap[expenseType]
}
export function getColorByIndex(index: number): string {
	switch (index) {
		case 0:
			return 'var(--clr-info)'
		case 1:
			return 'var(--clr-expense-fixed)'
		case 2:
			return 'var(--clr-income-gift)'
		default:
			return 'var(--clr-expense-subscriptions)'
	}
}

export function getRange(page: number, limit: number) {
	const from = page * limit
	const to = from + limit - 1

	return [from, to]
}

export function exportDataToExcel(
	data: IMonthlyIncome[] | undefined,
	name: string,
	filename: string
) {
	if (!data) return null

	const workbook = XLSX.utils.book_new()
	const worksheet = XLSX.utils.json_to_sheet(data)

	XLSX.utils.book_append_sheet(workbook, worksheet, name)

	XLSX.writeFile(workbook, filename)
}
