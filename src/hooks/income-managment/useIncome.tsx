import { supabaseClient } from '@/services/supabaseClient'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/services/tanstack-query/constants'
import { useAuth } from '@/contexts/AuthContext'
import { getCurrentMonthYear, toCamelCase } from '@/utils'
import type { IMonthlyIncome, ITotalMonthlyIncome } from '@/types'
import { useMemo, useState } from 'react'

const DEFAULT_FALLBACK: IMonthlyIncome[] = [
	{
		id: '',
		partTime: 0,
		gift: 0,
		paycheck: 0,
		yearMonth: '',
		userId: '',
		transactionDate: '',
	},
]

async function getCurrentMonthIncome(id: string): Promise<IMonthlyIncome[]> {
	const currentYearMonth = getCurrentMonthYear()

	const { data, error } = await supabaseClient
		.from('income-managment')
		.select('*')
		.eq('user_id', id)
		.eq('year_month', currentYearMonth)
		.order('transaction_date', { ascending: false })
	if (error) {
		throw new Error(error.message)
	}
	return data
}

function getTotalMonthIncome(data: IMonthlyIncome[]): ITotalMonthlyIncome {
	const total: ITotalMonthlyIncome = { partTime: 0, paycheck: 0, gift: 0, total: 0 }

	data.forEach((income: IMonthlyIncome) => {
		total.partTime += income.partTime
		total.paycheck += income.paycheck
		total.gift += income.gift
	})
	total.total = total.partTime + total.paycheck + total.gift

	return total
}

function checkHasMore(data: IMonthlyIncome[], visibleData: IMonthlyIncome[]): boolean {
	if (data.length - visibleData.length > 0) {
		return true
	} else {
		return false
	}
}

function getVisibleIncomeTransactions(
	data: IMonthlyIncome[],
	page: number,
	itemsPerPage: number = 5
): IMonthlyIncome[] {
	const itemsToShow = page * itemsPerPage
	return data.slice(0, itemsToShow)
}

export function useIncome() {
	const { user } = useAuth()
	const [page, setPage] = useState(1)

	const { data: userMonthlyIncome = DEFAULT_FALLBACK } = useQuery<IMonthlyIncome[]>({
		queryKey: [queryKeys.income, user?.id],
		queryFn: () => getCurrentMonthIncome(user!.id),
		select: (data: IMonthlyIncome[]) => data.map((income) => toCamelCase(income) as IMonthlyIncome),
		enabled: !!user,
	})

	const visibleIncomeTransactions = useMemo(
		() => getVisibleIncomeTransactions(userMonthlyIncome, page),
		[userMonthlyIncome, page]
	)
	const hasMore = useMemo(
		() => checkHasMore(userMonthlyIncome, visibleIncomeTransactions),
		[userMonthlyIncome, visibleIncomeTransactions]
	)
	const total = useMemo(() => getTotalMonthIncome(userMonthlyIncome), [userMonthlyIncome])
	const nextPage = () => setPage((prev) => prev + 1)
	const resetPage = () => {
		setPage(1)
	}

	return { total, userMonthlyIncome, nextPage, resetPage, visibleIncomeTransactions, hasMore }
}
