import { supabaseClient } from '@/services/supabaseClient'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/services/tanstack-query/constants'
import { useAuth } from '@/contexts/AuthContext'
import { getCurrentMonthYear, toCamelCase } from '@/utils'
import type { IMonthlyIncome, ITotalMonthlyIncome } from '@/types'
import { useMemo } from 'react'

const DEFAULT_FALLBACK: IMonthlyIncome[] = [
	{
		id: '',
		partTime: 0,
		gift: 0,
		paycheck: 0,
		yearMonth: '',
		userId: '',
		transactionDate: new Date(),
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

export function useIncome() {
	const { user } = useAuth()

	const { data: userMonthlyIncome = DEFAULT_FALLBACK } = useQuery<IMonthlyIncome[]>({
		queryKey: [queryKeys.income, user?.id],
		queryFn: () => getCurrentMonthIncome(user!.id),
		select: (data: IMonthlyIncome[]) => data.map((income) => toCamelCase(income) as IMonthlyIncome),
		enabled: !!user,
	})

	const total = useMemo(() => getTotalMonthIncome(userMonthlyIncome), [userMonthlyIncome])

	return { total, userMonthlyIncome }
}
