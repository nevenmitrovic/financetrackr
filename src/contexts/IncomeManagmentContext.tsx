import type { IncomeModalType } from '@/types'
import { useState, createContext, type ReactNode, useCallback, useContext } from 'react'

interface IIncomeManagmentContext {
	openModal: boolean
	toggleModal: (type: IncomeModalType) => void
	modalType: IncomeModalType
}
interface IncomeManagmentProviderProps {
	children: ReactNode
}

const IncomeManagmentContext = createContext<IIncomeManagmentContext | undefined>(undefined)

export const IncomeManagmentProvider = ({ children }: IncomeManagmentProviderProps) => {
	const [openModal, setOpenModal] = useState(false)
	const [modalType, setModalType] = useState<IncomeModalType | null>(null)

	const toggleModal = useCallback((type: IncomeModalType) => {
		setOpenModal((prev) => !prev)
		setModalType(type)
	}, [])

	return (
		<IncomeManagmentContext.Provider value={{ openModal, toggleModal, modalType }}>
			{children}
		</IncomeManagmentContext.Provider>
	)
}

export const useIncomeContext = (): IIncomeManagmentContext => {
	const context = useContext(IncomeManagmentContext)
	if (!context) throw new Error('useIncomeContext must be used within an IncomeManagmentProvider')

	return context
}
