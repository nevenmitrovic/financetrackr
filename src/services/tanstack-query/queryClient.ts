import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const loadId = 'react-query-toast-loading'

function createTitle(errorMsg: string, actionType: 'query' | 'mutation') {
	const action = actionType === 'query' ? 'fetch' : 'update'
	return `could not ${action} data: ${errorMsg ?? 'error connecting to server'}`
}

function errorHandler(title: string) {
	const id = 'react-query-toast'

	if (!toast.isActive(id)) {
		toast.error(title, { toastId: id })
	}
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
		},
	},
	queryCache: new QueryCache({
		onError: (error) => {
			const title = createTitle(error.message, 'query')
			errorHandler(title)
		},
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			toast.dismiss(loadId)
			const title = createTitle(error.message, 'mutation')
			errorHandler(title)
		},
	}),
})
