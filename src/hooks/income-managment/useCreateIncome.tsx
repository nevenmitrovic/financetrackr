import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type { IncomeFormValues } from '@/types'
import { getCurrentMonthYear } from '@/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

async function createMonthlyIncome(data: IncomeFormValues, userId: string) {
	const incomeData = { ...data, userId, date: getCurrentMonthYear() }

	const res = await supabaseClient.from('income-managment').insert(incomeData).select()
	if (res.error) throw new Error(res.error.message)
	return res.data
}

export function useCreateIncome() {
	const { user } = useAuth()
	const queryClient = useQueryClient()
	const loadId = 'react-query-toast-loading'

	const { mutate } = useMutation({
		mutationFn: (data: IncomeFormValues) => createMonthlyIncome(data, user?.id ?? ''),
		onSuccess: () => {
			toast.dismiss(loadId)
			queryClient.invalidateQueries({ queryKey: [queryKeys.income, user?.id] })
			toast.success('Monthly income successfully created')
		},
		onMutate: () => {
			if (!toast.isActive(loadId)) toast.loading('Creating monthly income...', { toastId: loadId })
		},
	})

	return mutate
}
