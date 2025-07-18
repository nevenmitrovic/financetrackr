import { SidebarContextProvider, useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/common/useIsMobile'

import { type ReactNode } from 'react'

interface DashboardLayoutProps {
	sidebar: ReactNode
	dashboardContent: ReactNode
}

const DashboardLayoutContent = ({ sidebar, dashboardContent }: DashboardLayoutProps) => {
	const { open } = useSidebarContext()
	const isMobile = useIsMobile()

	return (
		<div
			className={`dashboard-layout ${open ? 'sidebar-open' : 'sidebar-close'} ${
				isMobile ? 'mobile-layout' : ''
			}`}
		>
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
