import { supabaseClient } from '@/services/supabaseClient'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/services/tanstack-query/constants'
import { useAuth } from '@/contexts/AuthContext'
import { getCurrentMonthYear } from '@/utils'
import type { IMonthlyIncome } from '@/types'

async function getCurrentMonthIncome(id: string) {
	const currentYearMonth = getCurrentMonthYear()

	const { data, error } = await supabaseClient
		.from('income-managment')
		.select('*')
		.eq('userId', id)
		.eq('date', currentYearMonth)
	if (error) {
		throw new Error(error.message)
	}
	return data
}

export function useIncome() {
	const { user } = useAuth()

	const fallback: IMonthlyIncome[] = [
		{
			partTime: 0,
			gift: 0,
			paycheck: 0,
			date: '',
			userId: '',
			createdAt: '',
			updatedAt: '',
		},
	]

	const { data: userMonthlyIncome = fallback } = useQuery<IMonthlyIncome[]>({
		queryKey: [queryKeys.income, user?.id],
		queryFn: () => getCurrentMonthIncome(user!.id),
		enabled: !!user,
	})

	return userMonthlyIncome[0]
}
