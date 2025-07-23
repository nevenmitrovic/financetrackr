import { useState, createContext, type ReactNode, useCallback, useContext } from 'react'

interface IRecentTransactionContext {
	openTransactionModal: boolean
	toggleTransactionModal: () => void
}
interface RecentTransactionProviderProps {
	children: ReactNode
}

const RecentTransactionContext = createContext<IRecentTransactionContext | undefined>(undefined)

export const RecentTransactionProvider = ({ children }: RecentTransactionProviderProps) => {
	const [openTransactionModal, setOpenTransactionModal] = useState(false)

	const toggleTransactionModal = useCallback(() => {
		setOpenTransactionModal((prev) => !prev)
	}, [])

	return (
		<RecentTransactionContext.Provider value={{ openTransactionModal, toggleTransactionModal }}>
			{children}
		</RecentTransactionContext.Provider>
	)
}

export const useTransactionContext = () => {
	const context = useContext(RecentTransactionContext)
	if (!context) {
		throw new Error('useTransactionContext must be used within a RecentTransactionProvider')
	}
	return context
}
