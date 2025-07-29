import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type { AddIncomeFormValues } from '@/types'
import { getCurrentMonthYear } from '@/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const LOAD_ID = 'react-query-toast-loading'

async function createMonthlyIncome(data: AddIncomeFormValues, userId: string) {
	const { partTime, paycheck, gift } = data
	const incomeData = {
		part_time: partTime,
		paycheck,
		gift,
		user_id: userId,
		year_month: getCurrentMonthYear(),
	}

	const res = await supabaseClient.from('income-managment').insert(incomeData).select()
	if (res.error) throw new Error(res.error.message)
	return res.data
}

export function useCreateIncome() {
	const { user } = useAuth()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (data: AddIncomeFormValues) => createMonthlyIncome(data, user!.id),
		onSuccess: () => {
			toast.dismiss(LOAD_ID)
			queryClient.invalidateQueries({ queryKey: [queryKeys.income, user!.id] })
			queryClient.invalidateQueries({ queryKey: [queryKeys.transactions, user!.id] })
			toast.success('Monthly income successfully created')
		},
		onMutate: () => {
			if (!toast.isActive(LOAD_ID)) {
				toast.loading('Creating monthly income...', { toastId: LOAD_ID })
			}
		},
	})

	return mutate
}
