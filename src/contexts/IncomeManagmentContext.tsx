import { useState, createContext, type ReactNode, useCallback, useContext } from 'react'

interface IIncomeManagmentContext {
	openModal: boolean
	toggleModal: () => void
}
interface IncomeManagmentProviderProps {
	children: ReactNode
}

const IncomeManagmentContext = createContext<IIncomeManagmentContext | undefined>(undefined)

export const IncomeManagmentProvider = ({ children }: IncomeManagmentProviderProps) => {
	const [openModal, setOpenModal] = useState(false)

	const toggleModal = useCallback(() => setOpenModal((prev) => !prev), [])

	return (
		<IncomeManagmentContext.Provider value={{ openModal, toggleModal }}>
			{children}
		</IncomeManagmentContext.Provider>
	)
}

export const useIncomeContext = (): IIncomeManagmentContext => {
	const context = useContext(IncomeManagmentContext)
	if (!context) throw new Error('useIncomeContext must be used within an IncomeManagmentProvider')

	return context
}
