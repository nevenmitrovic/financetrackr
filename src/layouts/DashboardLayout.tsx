import { SidebarContextProvider, useSidebarContext } from '@/contexts/SidebarContext'
import { type ReactNode } from 'react'

interface DashboardLayoutProps {
	sidebar: ReactNode
	dashboardContent: ReactNode
}

const DashboardLayoutContent = ({ sidebar, dashboardContent }: DashboardLayoutProps) => {
	const { open } = useSidebarContext()

	return (
		<div className={`dashboard-layout ${open ? 'sidebar-open' : 'sidebar-close'}`}>
			{sidebar}
			{dashboardContent}
		</div>
	)
}

const DashboardLayout = ({ sidebar, dashboardContent }: DashboardLayoutProps) => {
	return (
		<SidebarContextProvider>
			<DashboardLayoutContent sidebar={sidebar} dashboardContent={dashboardContent} />
		</SidebarContextProvider>
	)
}

export default DashboardLayout
