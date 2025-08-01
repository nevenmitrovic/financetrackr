import { SidebarContextProvider, useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/common/useIsMobile'
import { type ReactNode } from 'react'

interface ExpenseLayoutProps {
	sidebar: ReactNode
	expenseContent: ReactNode
}

const ExpenseLayoutContent = ({ sidebar, expenseContent }: ExpenseLayoutProps) => {
	const { open } = useSidebarContext()
	const isMobile = useIsMobile()

	return (
		<div
			className={`dashboard-layout ${open ? 'sidebar-open' : 'sidebar-close'} ${
				isMobile ? 'mobile-layout' : ''
			}`}
		>
			{sidebar}
			{expenseContent}
		</div>
	)
}

export const ExpenseLayout = ({ sidebar, expenseContent }: ExpenseLayoutProps) => {
	return (
		<SidebarContextProvider>
			<ExpenseLayoutContent sidebar={sidebar} expenseContent={expenseContent} />
		</SidebarContextProvider>
	)
}
