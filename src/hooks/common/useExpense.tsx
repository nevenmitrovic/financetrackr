import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type {
	ExpenseTimeFilterValue,
	IExpense,
	ITopExpenseCategory,
	ITopExpenseSubcategory,
	ITotalExpense,
} from '@/types'
import { exportDataToExcel, getCurrentMonthYear, getRange, toCamelCase } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useCallback, useMemo, useState } from 'react'
import { useExpenseCategories } from './useExpenseCategories'

const TOP_EXPENSE_CATEGORY_FALLBACK: ITopExpenseCategory = {
	category: '',
	total: 0,
	trendType: 'noChange',
	percentage: 0,
}
const TOP_EXPENSE_SUBCATEGORY_FALLBACK: ITopExpenseSubcategory = {
	subcategory: '',
	total: 0,
	trendType: 'noChange',
	percentage: 0,
}
const TOTAL_EXPENSE_FALLBACK: ITotalExpense = {
	category: 'Total',
	total: 0,
	trendType: 'noChange',
	percentage: 0,
}

async function getExpenses(id: string): Promise<IExpense[]> {
	const { data: expenses, error } = await supabaseClient
		.from('expenses')
		.select('*')
		.eq('user_id', id)
		.order('transaction_date', { ascending: false })
	if (error) throw new Error(error.message)
	return expenses
}
async function getCurrentMonthExpenses(id: string): Promise<IExpense[]> {
	const currentMonthYear = getCurrentMonthYear()

	const { data: expenses, error } = await supabaseClient
		.from('expenses')
		.select('*')
		.eq('user_id', id)
		.eq('year_month', currentMonthYear)
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
			case 'today':
				return expenseDate.isSame(now, 'day')
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

function getCurrentMonthTotalExpenses(expenses: IExpense[] | undefined): number {
	if (!expenses) return 0

	const currentYearMonth = getCurrentMonthYear()
	return expenses
		.filter((expense) => expense.yearMonth === currentYearMonth)
		.reduce((acc, expense) => acc + expense.value, 0)
}

function getTotalExpense(expenses: IExpense[] | undefined): number {
	if (!expenses) return 0
	return expenses.reduce((acc, expense) => acc + expense.value, 0)
}

function getTotalExpenseAllTime(expenses: IExpense[] | undefined): ITotalExpense {
	if (!expenses) return TOTAL_EXPENSE_FALLBACK

	const total = getTotalExpense(expenses)
	const monthlyTrend = getCurrentMonthTrend(expenses)

	return {
		total,
		category: 'Total',
		trendType: monthlyTrend.type,
		percentage: monthlyTrend.value,
	}
}
function getTotalExpenseToday(expenses: IExpense[] | undefined): ITotalExpense {
	if (!expenses) return TOTAL_EXPENSE_FALLBACK

	const todaysExpenses = getFilteredExpenses(expenses, 'today')

	const dailyTotal = getTotalExpense(todaysExpenses)
	const dailyTrend = getCurrentDayTrend(expenses)

	return {
		total: dailyTotal,
		category: 'Total',
		trendType: dailyTrend.type,
		percentage: dailyTrend.value,
	}
}

// get trend for current month since last month
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
// get trend for current day since yesterday
function getCurrentDayTrend(expenses: IExpense[]): {
	value: number
	type: 'increase' | 'decrease' | 'noChange'
} {
	const today = dayjs()
	const yesterday = dayjs().subtract(1, 'day')
	const todayExpenses = expenses.filter((expense) =>
		dayjs(expense.transactionDate).isSame(today, 'day')
	)
	const yesterdayExpenses = expenses.filter((expense) =>
		dayjs(expense.transactionDate).isSame(yesterday, 'day')
	)

	const totalTodayExpense = todayExpenses.reduce((sum, expense) => sum + expense.value, 0)
	const totalYesterdayExpense = yesterdayExpenses.reduce((sum, expense) => sum + expense.value, 0)

	if (totalYesterdayExpense === 0) return { value: 0, type: 'noChange' }
	const trendValue = ((totalTodayExpense - totalYesterdayExpense) / totalYesterdayExpense) * 100
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
function getTopExpenseSubcategory(expenses: IExpense[] | undefined): ITopExpenseSubcategory {
	if (!expenses || expenses.length === 0) return TOP_EXPENSE_SUBCATEGORY_FALLBACK

	const filteredTransactions = expenses.filter((expense) => expense.type === 'expense')
	if (filteredTransactions.length === 0) return TOP_EXPENSE_SUBCATEGORY_FALLBACK

	const subcategoryGroups = filteredTransactions.reduce((acc, expense) => {
		const subcategory = expense.subcategory
		if (!acc[subcategory]) {
			acc[subcategory] = []
		}
		acc[subcategory].push(expense)
		return acc
	}, {} as Record<string, IExpense[]>)

	const topSubcategory = Object.entries(subcategoryGroups)
		.map(([subcategory, subcategoryExpenses]) => {
			const subcategoryTotal = subcategoryExpenses.reduce((sum, expense) => sum + expense.value, 0)
			const currentMonthTrend = getCurrentMonthTrend(subcategoryExpenses)

			return {
				subcategory,
				total: subcategoryTotal,
				trendType: currentMonthTrend.type,
				percentage: currentMonthTrend.value,
			}
		})
		.sort((a, b) => b.total - a.total)[0]

	return topSubcategory || TOP_EXPENSE_SUBCATEGORY_FALLBACK
}
// expense history feature
function getPaginatedExpenses(
	pageParam: number,
	limit: number,
	expenses: IExpense[] | undefined
): IExpense[] {
	if (!expenses) return []

	const range = getRange(pageParam, limit)
	return expenses.slice(range[0], range[1] + 1)
}
function hasNextPage(
	expenses: IExpense[] | undefined,
	itemsPerPage: number,
	currentPage: number
): boolean {
	if (!expenses) return false

	const totalPages = Math.ceil(expenses.length / itemsPerPage)
	return currentPage < totalPages - 1
}
function hasPreviousPage(currentPage: number): boolean {
	return currentPage > 0
}

export function useExpense() {
	const { user } = useAuth()
	const { getCategoryNameById, getSubcategoryNameById } = useExpenseCategories()
	const [timeFilter, setTimeFilter] = useState<ExpenseTimeFilterValue>('week')
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [currentPageIndex, setCurrentPageIndex] = useState(0)

	// all-time expense
	const { data: expenses } = useQuery({
		queryKey: [queryKeys.expenses, user!.id],
		queryFn: () => getExpenses(user!.id),
		select: (data: IExpense[]) => data.map((expense) => toCamelCase(expense)) as IExpense[],
		enabled: !!user,
	})
	// monthly expense
	const { data: monthlyExpenses } = useQuery({
		queryKey: [queryKeys.monthlyExpenses, user!.id],
		queryFn: () => getCurrentMonthExpenses(user!.id),
		select: (data: IExpense[]) => data.map((expense) => toCamelCase(expense)) as IExpense[],
		enabled: !!user,
	})

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTimeFilter(e.target.value as ExpenseTimeFilterValue)
	}
	const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setItemsPerPage(Number(e.target.value))
		setCurrentPageIndex(0)
	}
	const handlePreviousPage = () => {
		if (currentPageIndex === 0) return
		setCurrentPageIndex((prev) => prev - 1)
	}
	const handleNextPage = () => {
		setCurrentPageIndex((prev) => prev + 1)
	}

	const categoryStats = useMemo(() => {
		return calculateCategoryStats(getFilteredExpenses(expenses, timeFilter))
	}, [timeFilter, expenses])
	const currentMonthTotal = useMemo(() => {
		return getCurrentMonthTotalExpenses(expenses)
	}, [expenses])
	const monthlyTotal = useMemo(() => {
		return getTotalExpense(getFilteredExpenses(expenses, 'month')) // for last 30 days
	}, [expenses])
	const topExpenseCategory = useMemo(() => {
		return getTopExpenseCategory(expenses)
	}, [expenses])
	const topExpenseSubcategory = useMemo(() => {
		return getTopExpenseSubcategory(expenses)
	}, [expenses])
	const totalExpenseAllTime = useMemo(() => {
		return getTotalExpenseAllTime(expenses)
	}, [expenses])
	const totalExpenseToday = useMemo(() => {
		return getTotalExpenseToday(expenses)
	}, [expenses])
	const paginatedExpenses = useMemo(() => {
		return getPaginatedExpenses(currentPageIndex, itemsPerPage, expenses)
	}, [expenses, currentPageIndex, itemsPerPage])
	const checkPreviousPage = useMemo(() => {
		return hasPreviousPage(currentPageIndex)
	}, [currentPageIndex])
	const checkNextPage = useMemo(() => {
		return hasNextPage(expenses, itemsPerPage, currentPageIndex)
	}, [expenses, currentPageIndex, itemsPerPage])
	const handleDownloadMonthlyExpense = useCallback(() => {
		if (!monthlyExpenses) return

		const mappedData: any[] = monthlyExpenses.map((expense) => ({
			...expense,
			category: getCategoryNameById(expense.category),
			subcategory: getSubcategoryNameById(expense.subcategory),
		}))

		return exportDataToExcel(mappedData, "The User's monthly expenses", 'MyMonthlyExpenses.xlsx')
	}, [monthlyExpenses, getCategoryNameById, getSubcategoryNameById])
	const handleDownloadAllTimeExpense = useCallback(() => {
		if (!expenses) return

		const mappedData: any[] = expenses.map((expense) => ({
			...expense,
			category: getCategoryNameById(expense.category),
			subcategory: getSubcategoryNameById(expense.subcategory),
		}))
		return exportDataToExcel(mappedData, "The User's all-time expense", 'MyAllTimeExpenses.xlsx')
	}, [expenses, getCategoryNameById, getSubcategoryNameById])

	return {
		expenses,
		handleFilterChange,
		timeFilter,
		categoryStats,
		currentMonthTotal,
		monthlyTotal,
		topExpenseCategory,
		topExpenseSubcategory,
		totalExpenseAllTime,
		totalExpenseToday,
		handlePreviousPage,
		handleNextPage,
		handleItemsPerPage,
		paginatedExpenses,
		checkNextPage,
		checkPreviousPage,
		handleDownloadMonthlyExpense,
		handleDownloadAllTimeExpense,
	}
}
