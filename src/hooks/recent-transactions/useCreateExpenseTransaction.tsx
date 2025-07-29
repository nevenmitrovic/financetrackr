import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type { ExpenseFormValue } from '@/types'
import { getCurrentMonthYear } from '@/utils'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const LOAD_ID = 'react-query-toast-loading'

async function createExpenseTransaction(userId: string, formData: ExpenseFormValue) {
	const currentYearMonth = getCurrentMonthYear()
	const expenseData = {
		...formData,
		user_id: userId,
		year_month: currentYearMonth,
	}

	const { data, error } = await supabaseClient.from('expenses').insert(expenseData).select()
	if (error) throw new Error(error.message)
	return data
}

export function useCreateExpenseTransaction() {
	const { user } = useAuth()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (data: ExpenseFormValue) => createExpenseTransaction(user!.id, data),
		onSuccess: () => {
			toast.dismiss(LOAD_ID)
			queryClient.invalidateQueries({ queryKey: [queryKeys.transactions, user!.id] })
			toast.success('Expense transaction created successfully')
		},
		onMutate: () => {
			if (!toast.isActive(LOAD_ID)) {
				toast.loading('Creating transaction...', { toastId: LOAD_ID })
			}
		},
	})

	return mutate
}
