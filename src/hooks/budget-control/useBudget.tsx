import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type { IUserBudgetControl } from '@/types'
import { toCamelCase } from '@/utils'
import { useQuery } from '@tanstack/react-query'

const FALLBACK: IUserBudgetControl[] = [
	{
		userId: '',
		budgetMax: 0,
	},
]

async function getBudgetControl(id: string) {
	const { data, error } = await supabaseClient.from('budget_control').select('*').eq('user_id', id)

	if (error) throw new Error(error.message)
	return data
}

function getBudgetControlPercentage(total: number, userBudgetMax: number): number {
	return (total / userBudgetMax) * 100
}

export function useBudget() {
	const { user } = useAuth()

	const { data: userBudgetMax = FALLBACK } = useQuery<IUserBudgetControl[]>({
		queryKey: [queryKeys.budget, user!.id],
		queryFn: () => getBudgetControl(user!.id),
		select: (data: IUserBudgetControl[]) =>
			data.map((budget) => toCamelCase(budget) as IUserBudgetControl),
		enabled: !!user,
	})

	return { userBudgetMax: userBudgetMax[0], getBudgetControlPercentage }
}
