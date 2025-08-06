import { supabaseClient } from '@/services/supabaseClient'
import { getCurrentMonthYear, getRange, toCamelCase } from '@/utils'
import type { IMonthlyIncome, TransactionsType, IExpense } from '@/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from '@/services/tanstack-query/constants'
import { useAuth } from '@/contexts/AuthContext'
import dayjs from 'dayjs'

const PAGE_SIZE = 3

async function getTransactions(
	id: string,
	pageParam: number,
	acc: any[] = []
): Promise<TransactionsType> {
	const currentYearMonth = getCurrentMonthYear()
	const range = getRange(pageParam, PAGE_SIZE)

	const [
		{ data: userIncomes, error: incomeError },
		{ data: userExpenseTransactions, error: transactionsError },
	] = await Promise.all([
		supabaseClient
			.from('income-managment')
			.select('*')
			.eq('user_id', id)
			.eq('year_month', currentYearMonth)
			.order('transaction_date', { ascending: false })
			.range(range[0], range[1]),
		supabaseClient
			.from('expenses')
			.select('*')
			.eq('user_id', id)
			.eq('year_month', currentYearMonth)
			.order('transaction_date', { ascending: false })
			.range(range[0], range[1]),
	])
	if (incomeError || transactionsError) {
		throw new Error(
			incomeError?.message ?? transactionsError?.message ?? 'unknown error with supabase'
		)
	}

	const combined = [...(userIncomes || []), ...(userExpenseTransactions || [])]
	const all = [...acc, ...combined]

	if (combined.length === 0 || all.length >= PAGE_SIZE * 2) {
		return all
			.sort(
				(a: any, b: any) =>
					dayjs(b.transaction_date).valueOf() - dayjs(a.transaction_date).valueOf()
			)
			.slice(0, PAGE_SIZE * 2)
	}

	return getTransactions(id, pageParam + 1, all)
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
		select: (data) => {
			const allTransactions = data.pages.flat()
			const uniqueTransactions = allTransactions.filter(
				(item, index, self) => self.findIndex((transacion) => transacion.id === item.id) === index
			)
			return {
				...data,
				pages: [
					uniqueTransactions.map(
						(transaction) => toCamelCase(transaction) as IMonthlyIncome | IExpense
					),
				],
			}
		},
		getNextPageParam: (lastPage, pages) => {
			// max last 18 transactions
			if (lastPage.length < PAGE_SIZE * 2 || pages.length > 2) {
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
