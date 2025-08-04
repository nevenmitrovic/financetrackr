import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type { ExpenseTimeFilterValue, IExpense, ITopExpenseCategory } from '@/types'
import { getCurrentMonthYear, toCamelCase } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

const TOP_EXPENSE_CATEGORY_FALLBACK: ITopExpenseCategory = {
	category: '',
	total: 0,
	trendType: 'noChange',
	percentage: 0,
}

async function getExpenses(): Promise<IExpense[]> {
	const { data: expenses, error } = await supabaseClient
		.from('expenses')
		.select('*')
		.order('transaction_date', { ascending: false })
	if (error) throw new Error(error.message)
	return expenses
}

function getFilteredExpenses(
	expenses: IExpense[] | undefined,
	timeFilter: ExpenseTimeFilterValue
): IExpense[] {
	if (!expenses) return []

	const now = dayjs()

	return expenses.filter((expense) => {
		const expenseDate = dayjs(expense.transactionDate)

		switch (timeFilter) {
			case 'week':
				const oneWeekAgo = now.subtract(1, 'week')
				return expenseDate.isAfter(oneWeekAgo)
			case 'month':
				const oneMonthAgo = now.subtract(1, 'month')
				return expenseDate.isAfter(oneMonthAgo)
			case 'year':
				const oneYearAgo = now.subtract(1, 'year')
				return expenseDate.isAfter(oneYearAgo)
			default:
				return true
		}
	})
}

function calculateCategoryStats(expenses: IExpense[]) {
	const totalAmount = expenses.reduce((sum, expense) => sum + expense.value, 0)

	const categoryGroups = expenses.reduce((acc, expense) => {
		const category = expense.category || 'Other'
		if (!acc[category]) {
			acc[category] = []
		}
		acc[category].push(expense)
		return acc
	}, {} as Record<string, IExpense[]>)

	return Object.entries(categoryGroups)
		.map(([category, categoryExpenses]) => {
			const categoryTotal = categoryExpenses.reduce((sum, expense) => sum + expense.value, 0)
			return {
				category,
				total: categoryTotal,
				percentage: totalAmount > 0 ? Math.round((categoryTotal / totalAmount) * 100) : 0,
			}
		})
		.sort((a, b) => b.total - a.total)
		.slice(0, 3) // get top 3 category
}

function getTotalExpenses(expenses: IExpense[] | undefined): number {
	if (!expenses) return 0

	const currentYearMonth = getCurrentMonthYear()
	return expenses
		.filter((expense) => expense.yearMonth === currentYearMonth)
		.reduce((acc, expense) => acc + expense.value, 0)
}

function getCurrentMonthTrend(expenses: IExpense[]): {
	value: number
	type: 'increase' | 'decrease' | 'noChange'
} {
	const currentMonthYear = getCurrentMonthYear()
	const lastMonthYear = dayjs().subtract(1, 'month').format('YYYY-MM')
	const currentMonthExpenses = expenses.filter((expense) => expense.yearMonth === currentMonthYear)
	const lastMonthExpenses = expenses.filter((expense) => expense.yearMonth === lastMonthYear)

	const totalCurrentMonthExpense = currentMonthExpenses.reduce(
		(sum, expense) => sum + expense.value,
		0
	)
	const totalLastMonthExpense = lastMonthExpenses.reduce((sum, expense) => sum + expense.value, 0)

	if (totalLastMonthExpense === 0) return { value: 0, type: 'noChange' }
	const trendValue =
		((totalCurrentMonthExpense - totalLastMonthExpense) / totalLastMonthExpense) * 100
	const trendType = trendValue > 0 ? 'increase' : trendValue < 0 ? 'decrease' : 'noChange'
	return { value: parseFloat(trendValue.toFixed(2)), type: trendType }
}

function getTopExpenseCategory(expenses: IExpense[] | undefined): ITopExpenseCategory {
	if (!expenses || expenses.length === 0) return TOP_EXPENSE_CATEGORY_FALLBACK

	const filteredTransactions = expenses.filter((expense) => expense.type === 'expense')
	if (filteredTransactions.length === 0) return TOP_EXPENSE_CATEGORY_FALLBACK

	const categoryGroups = filteredTransactions.reduce((acc, expense) => {
		const category = expense.category || 'Other'
		if (!acc[category]) {
			acc[category] = []
		}
		acc[category].push(expense)
		return acc
	}, {} as Record<string, IExpense[]>)

	const topCategory = Object.entries(categoryGroups)
		.map(([category, categoryExpenses]) => {
			const categoryTotal = categoryExpenses.reduce((sum, expense) => sum + expense.value, 0)
			const currentMonthTrend = getCurrentMonthTrend(categoryExpenses)

			return {
				category,
				total: categoryTotal,
				trendType: currentMonthTrend.type,
				percentage: currentMonthTrend.value,
			}
		})
		.sort((a, b) => b.total - a.total)[0]

	return topCategory || TOP_EXPENSE_CATEGORY_FALLBACK
}

export function useExpenses() {
	const { user } = useAuth()
	const [timeFilter, setTimeFilter] = useState<ExpenseTimeFilterValue>('week')

	const { data: expenses } = useQuery({
		queryKey: [queryKeys.expenses, user!.id],
		queryFn: getExpenses,
		select: (data: IExpense[]) => data.map((expense) => toCamelCase(expense)) as IExpense[],
		enabled: !!user,
	})

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTimeFilter(e.target.value as ExpenseTimeFilterValue)
	}
	const categoryStats = useMemo(() => {
		return calculateCategoryStats(getFilteredExpenses(expenses, timeFilter))
	}, [timeFilter, expenses])
	const total = useMemo(() => {
		return getTotalExpenses(expenses)
	}, [expenses])
	const monthlyTotal = useMemo(() => {
		return getTotalExpenses(getFilteredExpenses(expenses, 'month'))
	}, [expenses])
	const topExpenseCategory = useMemo(() => {
		return getTopExpenseCategory(expenses)
	}, [expenses])

	return {
		expenses,
		handleFilterChange,
		timeFilter,
		categoryStats,
		total,
		monthlyTotal,
		topExpenseCategory,
	}
}
