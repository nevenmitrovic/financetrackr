import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type { BudgetFormValue, IUserBudgetControl } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const LOAD_ID = 'react-query-toast-loading'
const MUTATION_KEY = 'upsert-budget-limit'

async function upsertBudgetLimit(formData: BudgetFormValue, id: string) {
	const newBudget = {
		user_id: id,
		budge_max: formData,
	}

	const { data, error } = await supabaseClient
		.from('budget_control')
		.upsert(newBudget, { onConflict: 'user_id' })
		.select()

	if (error) throw new Error(error.message)
	return data
}

export function useUpsertBudgetLimit() {
	const { user } = useAuth()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: [MUTATION_KEY],
		mutationFn: (data: BudgetFormValue) => upsertBudgetLimit(data, user!.id),
		onMutate: () => {
			if (!toast.isActive(LOAD_ID)) {
				toast.loading("Defining user's budget limit...", { toastId: LOAD_ID })
			}
		},
		onSuccess: () => {
			toast.dismiss(LOAD_ID)
			queryClient.invalidateQueries({ queryKey: [queryKeys.budget, user!.id] })
			toast.success("User's budget limit successfully defined.")
		},
	})

	return mutate
}
