import { useState, createContext, useContext, type ReactNode } from 'react'

interface ISidebarContext {
	open: boolean
	toggleOpen: () => void
}
interface ISidebarContextProviderProps {
	children: ReactNode
}

const SidebarContext = createContext<ISidebarContext>({
	open: true,
	toggleOpen: () => {},
})

export const SidebarContextProvider = ({ children }: ISidebarContextProviderProps) => {
	const [open, setOpen] = useState(true)

	const toggleOpen = () => setOpen((prev) => !prev)

	return <SidebarContext.Provider value={{ open, toggleOpen }}>{children}</SidebarContext.Provider>
}

export const useSidebarContext = () => {
	const context = useContext(SidebarContext)
	if (!context) {
		throw new Error('useSidebarContext must be used within a SidebarContextProvider')
	}
	return context
}
