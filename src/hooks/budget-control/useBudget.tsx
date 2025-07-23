import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type { IUserBudgetControl } from '@/types'
import { useQuery } from '@tanstack/react-query'

async function getBudgetControl(id: string) {
	const res = await supabaseClient.from('budget_control').select('*').eq('user_id', id)

	if (res.error) throw new Error(res.error.message)
	return res.data
}

export function useBudget() {
	const { user } = useAuth()

	const fallback: IUserBudgetControl[] = [
		{
			user_id: '',
			budget_max: 0,
		},
	]

	const { data: userBudgetMax = fallback } = useQuery<IUserBudgetControl[]>({
		queryKey: [queryKeys.budget, user!.id],
		queryFn: () => getBudgetControl(user!.id),
		enabled: !!user,
	})

	return userBudgetMax[0]
}
