import { useInfiniteQuery } from '@tanstack/react-query'
import { supabaseClient } from '@/services/supabaseClient'
import { useState } from 'react'

export function useExpenseHistory() {
	const [itemsPerPage, setItemsPerPage] = useState(5)

	const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setItemsPerPage(Number(e.target.value))
	}

	return { handleItemsPerPage }
}
