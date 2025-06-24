import { SidebarContextProvider, useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/useIsMobile'
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
			<div
				className={`dashboard-content-container ${open && isMobile ? 'hidden' : ''} ${
					isMobile ? 'mobile-layout' : ''
				}`}
			>
				{dashboardContent}
			</div>
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
