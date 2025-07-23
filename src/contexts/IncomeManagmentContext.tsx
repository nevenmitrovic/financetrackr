import type { IncomeModalType } from '@/types'
import { useState, createContext, type ReactNode, useCallback, useContext } from 'react'

interface IIncomeManagmentContext {
	openIncomeModal: boolean
	toggleIncomeModal: (type: IncomeModalType) => void
	modalType: IncomeModalType
}
interface IncomeManagmentProviderProps {
	children: ReactNode
}

const IncomeManagmentContext = createContext<IIncomeManagmentContext | undefined>(undefined)

export const IncomeManagmentProvider = ({ children }: IncomeManagmentProviderProps) => {
	const [openIncomeModal, setOpenIncomeModal] = useState(false)
	const [modalType, setModalType] = useState<IncomeModalType | null>(null)

	const toggleIncomeModal = useCallback((type: IncomeModalType) => {
		setOpenIncomeModal((prev) => !prev)
		setModalType(type)
	}, [])

	return (
		<IncomeManagmentContext.Provider value={{ openIncomeModal, toggleIncomeModal, modalType }}>
			{children}
		</IncomeManagmentContext.Provider>
	)
}

export const useIncomeContext = (): IIncomeManagmentContext => {
	const context = useContext(IncomeManagmentContext)
	if (!context) throw new Error('useIncomeContext must be used within an IncomeManagmentProvider')

	return context
}
