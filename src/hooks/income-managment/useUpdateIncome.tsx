import type { UpdateIncomeFormValues } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import { getCurrentMonthYear, toSnakeCase } from '@/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

const LOAD_ID = 'react-query-toast-loading'
const MUTATION_KEY = 'update-income'

interface UpdateIncomeMutationParams {
	data: UpdateIncomeFormValues
	id: string
}

async function updateMonthlyIncome(data: UpdateIncomeFormValues, userId: string, incomeId: string) {
	const updateData = { ...toSnakeCase(data), transaction_date: dayjs().toISOString() }

	const res = await supabaseClient
		.from('income-managment')
		.update(updateData)
		.eq('user_id', userId)
		.eq('year_month', getCurrentMonthYear())
		.eq('id', incomeId)
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
		mutationFn: ({ data, id }: UpdateIncomeMutationParams) =>
			updateMonthlyIncome(data, user!.id, id),
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
