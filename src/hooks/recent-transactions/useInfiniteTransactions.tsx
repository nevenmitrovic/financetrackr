import { supabaseClient } from '@/services/supabaseClient'
import { getCurrentMonthYear, toCamelCase } from '@/utils'
import type { IMonthlyIncome, TransactionsType, IExpense } from '@/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from '@/services/tanstack-query/constants'
import { useAuth } from '@/contexts/AuthContext'
import dayjs from 'dayjs'

const PAGE_SIZE = 3

async function getTransactions(id: string, pageParam: number): Promise<TransactionsType> {
	const currentYearMonth = getCurrentMonthYear()
	const from = pageParam * PAGE_SIZE
	const to = (pageParam + 1) * PAGE_SIZE - 1

	const { data: userIncomes, error: incomeError } = await supabaseClient
		.from('income-managment')
		.select('*')
		.eq('user_id', id)
		.eq('year_month', currentYearMonth)
		.order('transaction_date', { ascending: false })
		.range(from, to)
	const { data: userExpenseTransactions, error: transactionsError } = await supabaseClient
		.from('expenses')
		.select('*')
		.eq('user_id', id)
		.eq('year_month', currentYearMonth)
		.order('transaction_date', { ascending: false })
		.range(from, to)

	if (incomeError || transactionsError) {
		throw new Error(
			incomeError!.message ?? transactionsError!.message ?? 'unknown error with supabase'
		)
	}

	const transactions = [userIncomes, userExpenseTransactions]
	return transactions
		.flatMap((transaction) => transaction || [])
		.sort((a, b) => dayjs(b.transaction_date).valueOf() - dayjs(a.transaction_date).valueOf())
}

export function useInfiniteTransactions() {
	const { user } = useAuth()

	const {
		data: transactions,
		hasNextPage,
		fetchNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery<TransactionsType, Error>({
		queryKey: [queryKeys.transactions, user!.id],
		initialPageParam: 0,
		queryFn: ({ pageParam }) => getTransactions(user!.id, pageParam as number),
		select: (data) => ({
			...data,
			pages: data.pages.map((page) =>
				page.map((transaction) => toCamelCase(transaction) as IMonthlyIncome | IExpense)
			),
		}),
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length < PAGE_SIZE) {
				return undefined
			}
			return pages.length
		},
		enabled: !!user,
	})

	return {
		transactions,
		hasNextPage,
		fetchNextPage,
		isFetching,
		isFetchingNextPage,
	}
}
