import { supabaseClient } from '@/services/supabaseClient'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/services/tanstack-query/constants'
import { useAuth } from '@/contexts/AuthContext'
import type { IUserMonthlyIncome } from '@/types'
import { getCurrentMonthYear } from '@/utils'

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

	const fallback: IUserMonthlyIncome[] = []

	const { data: userMonthlyIncome = fallback } = useQuery({
		queryKey: [queryKeys.income, user?.id],
		queryFn: () => user && getCurrentMonthIncome(user.id),
	})

	return { userMonthlyIncome }
}
