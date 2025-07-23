import { supabaseClient } from '@/services/supabaseClient'
import type { IExpenseCategory } from '@/types'
import { removeDuplicatesFromArr } from '@/utils'
import { useQuery } from '@tanstack/react-query'

async function getExpenseCategories() {
	const res = await supabaseClient.from('expense_categories').select('id, category')
	if (res.error) throw new Error(res.error.message)

	return res.data
}

export function useExpenseCategories() {}
