import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type { FileObject } from '@supabase/storage-js'
import { useQuery } from '@tanstack/react-query'

interface FileObjectWithUrl extends FileObject {
	publicUrl: string
}

async function getImages(): Promise<FileObjectWithUrl[]> {
	const storage = supabaseClient.storage.from('images')
	const { data, error } = await storage.list('categories')
	if (error) throw new Error('Failed to fetch images.')

	const imagesWithUrls = data.map((image) => {
		const { data } = storage.getPublicUrl(`categories/${image.name}`)

		return {
			...image,
			publicUrl: data.publicUrl,
		}
	})
	return imagesWithUrls
}

function mapCategoryWithImageTitle(title: string | null): string | null {
	if (!title) return null

	switch (title) {
		case 'Education':
			return 'Educ'
		case 'Transport & Travel':
			return 'Travel'
		case 'Housing & Utilities':
			return 'Utilities'
		default:
			return title
	}
}

export function useImages() {
	const { data: images } = useQuery({
		queryKey: [queryKeys.images],
		queryFn: getImages,
		staleTime: 30 * 60 * 1000, // 30min
		gcTime: 45 * 60 * 1000, // 45min
	})

	function getImageByName(name: string | null): FileObjectWithUrl | null {
		if (!images) return null

		return (
			images.find((image) => image.name.split('.')[0] === mapCategoryWithImageTitle(name)) ?? null
		)
	}

	return { images, getImageByName }
}
