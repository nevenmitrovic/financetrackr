import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/services/tanstack-query/queryClient'
import Router from '@/components/common/router/Router'
import { AuthProvider } from '@/contexts/AuthContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Router />
			</AuthProvider>
			<ToastContainer />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default App
