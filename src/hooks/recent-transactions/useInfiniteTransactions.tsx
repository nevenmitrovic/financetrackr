import { supabaseClient } from '@/services/supabaseClient'
import { getCurrentMonthYear } from '@/utils'
import type { IMonthlyIncome } from '@/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from '@/services/tanstack-query/constants'
import { useAuth } from '@/contexts/AuthContext'

const PAGE_SIZE = 5

async function getTransactions(id: string, pageParam: number): Promise<IMonthlyIncome[]> {
	const currentYearMonth = getCurrentMonthYear()
	const from = pageParam * PAGE_SIZE
	const to = (pageParam + 1) * PAGE_SIZE - 1

	const { data, error } = await supabaseClient
		.from('income-managment')
		.select('*')
		.eq('user_id', id)
		.eq('year_month', currentYearMonth)
		.order('transaction_date', { ascending: false })
		.range(from, to)
	if (error) {
		throw new Error(error.message)
	}
	return data
}

export function useInfiniteTransactions() {
	const { user } = useAuth()

	const {
		data: transactions,
		hasNextPage,
		fetchNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery<IMonthlyIncome[], Error>({
		queryKey: [queryKeys.transactions, user!.id],
		initialPageParam: 0,
		queryFn: ({ pageParam }) => getTransactions(user!.id, pageParam as number),
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
