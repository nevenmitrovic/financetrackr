import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type { IExpenseCategory, IExpenseSubcategory } from '@/types'
import { toCamelCase } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

async function getExpenseCategories(): Promise<IExpenseCategory[]> {
	const { data, error } = await supabaseClient.from('expense_categories').select('*')
	if (error) throw new Error(error.message)
	return data
}
async function getExpenseSubcategories(): Promise<IExpenseSubcategory[]> {
	const { data, error } = await supabaseClient.from('expense_subcategories').select('*')
	if (error) throw new Error(error.message)
	return data
}

export function useExpenseCategories() {
	const [categoryValue, setCategoryValue] = useState(0)

	const handleCategoryValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategoryValue(Number(e.target.value))
	}
	const resetCategoryValue = () => setCategoryValue(0)

	const { data: expenseCategories } = useQuery({
		queryKey: [queryKeys.expenseCategories],
		queryFn: getExpenseCategories,
		staleTime: 50 * 60 * 1000, // 50min
		gcTime: 60 * 60 * 1000, // 60min
	})
	const { data: expenseSubcategories } = useQuery({
		queryKey: [queryKeys.expenseSubcategories],
		queryFn: getExpenseSubcategories,
		select: (data: IExpenseSubcategory[]) =>
			data.map((subcategory) => toCamelCase(subcategory) as IExpenseSubcategory),
		staleTime: 50 * 60 * 1000, // 50min
		gcTime: 60 * 60 * 1000, // 60min
	})

	const filteredSubcategories = useMemo(() => {
		if (!categoryValue || !expenseSubcategories) {
			return []
		}
		return expenseSubcategories.filter((subcategory) => subcategory.categoryId === categoryValue)
	}, [categoryValue, expenseSubcategories])
	const getCategoryNameById = (id: number): string | null => {
		if (!expenseCategories) return null

		return expenseCategories.find((category) => category.id === id)?.category ?? null
	}
	const getSubcategoryNameById = (id: number): string | null => {
		if (!expenseSubcategories) return null

		return expenseSubcategories.find((subcategory) => subcategory.id === id)?.subcategory ?? null
	}

	return {
		expenseCategories,
		handleCategoryValue,
		resetCategoryValue,
		getCategoryNameById,
		getSubcategoryNameById,
		categoryValue,
		expenseSubcategories,
		filteredSubcategories,
	}
}
