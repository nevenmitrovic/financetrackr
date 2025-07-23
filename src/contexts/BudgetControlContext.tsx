import { useState, createContext, type ReactNode, useCallback, useContext } from 'react'

interface IBudgetControlContext {
	openBudgetModal: boolean
	toggleBudgetModal: () => void
}
interface BudgetControlProviderProps {
	children: ReactNode
}

const BudgetControlContext = createContext<IBudgetControlContext | undefined>(undefined)

export const BudgetControlProvider = ({ children }: BudgetControlProviderProps) => {
	const [openBudgetModal, setOpenBudgetModal] = useState(false)

	const toggleBudgetModal = useCallback(() => {
		setOpenBudgetModal((prev) => !prev)
	}, [])

	return (
		<BudgetControlContext.Provider value={{ openBudgetModal, toggleBudgetModal }}>
			{children}
		</BudgetControlContext.Provider>
	)
}

export const useBudgetContext = () => {
	const context = useContext(BudgetControlContext)
	if (!context) {
		throw new Error('useBudgetContext must be used within an BudgetControlProvider')
	}
	return context
}
