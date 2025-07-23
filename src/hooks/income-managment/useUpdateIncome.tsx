import type { IncomeFormValues } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import { getCurrentMonthYear } from '@/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const LOAD_ID = 'react-query-toast-loading'
const MUTATION_KEY = 'update-income'

async function updateMonthlyIncome(data: IncomeFormValues, userId: string) {
	const res = await supabaseClient
		.from('income-managment')
		.update(data)
		.eq('userId', userId)
		.eq('date', getCurrentMonthYear())
		.select()

	if (res.error) throw new Error(res.error.message)
	if (!res.data || res.data.length === 0) {
		throw new Error('No income record found for the current month. Please create one first.')
	}
	return res.data
}

export function useUpdateIncome() {
	const { user } = useAuth()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: [MUTATION_KEY],
		mutationFn: (data: IncomeFormValues) => updateMonthlyIncome(data, user!.id),
		onSuccess: () => {
			toast.dismiss(LOAD_ID)
			queryClient.invalidateQueries({ queryKey: [queryKeys.income, user!.id] })
			toast.success('Monthly income successfully updated.')
		},
		onMutate: () => {
			if (!toast.isActive(LOAD_ID))
				toast.loading('Updating monthly income...', { toastId: LOAD_ID })
		},
	})

	return mutate
}
