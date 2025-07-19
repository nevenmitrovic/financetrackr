import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import type { CreateMonthlyIncome } from '@/types'

async function createMonthlyIncome(data: CreateMonthlyIncome) {
	const res = await supabaseClient.from('income-managment').insert(data)
	return res.data
}

export function useCreateIncome() {
	const { user } = useAuth()
}
