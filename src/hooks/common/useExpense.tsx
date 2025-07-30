import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type { ExpenseTimeFilterValue, IExpense } from '@/types'
import { toCamelCase } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

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

	return { expenses, handleFilterChange, timeFilter, categoryStats }
}
