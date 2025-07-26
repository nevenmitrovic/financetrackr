import { useAuth } from '@/contexts/AuthContext'
import { supabaseClient } from '@/services/supabaseClient'
import { queryKeys } from '@/services/tanstack-query/constants'
import type { FileObject } from '@supabase/storage-js'
import { useQuery } from '@tanstack/react-query'

async function getImages(): Promise<FileObject[]> {
	const storage = supabaseClient.storage.from('images')
	const { data, error } = await storage.list('categories')
	if (error) throw new Error('Failed to fetch images.')

	const imagesWithUrls = data.map((image) => {
		const { data } = storage.getPublicUrl(`${image.name}`)

		return {
			...image,
			publicUrl: data.publicUrl,
		}
	})
	return imagesWithUrls
}

export function useImages() {
	const { user } = useAuth()

	const { data: images } = useQuery({
		queryKey: [queryKeys.images, user!.id],
		queryFn: getImages,
		enabled: !!user,
		staleTime: 30 * 60 * 1000, // 30min
		gcTime: 45 * 60 * 1000, // 45min
	})

	return { images }
}
