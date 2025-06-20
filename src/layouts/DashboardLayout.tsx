import type { ReactNode } from 'react'

interface DashboardLayoutProps {
	sidebar: ReactNode
	dashboardContent: ReactNode
}

const DashboardLayout = ({ sidebar, dashboardContent }: DashboardLayoutProps) => {
	return (
		<div className='dashboard-layout'>
			{sidebar}
			{dashboardContent}
		</div>
	)
}

export default DashboardLayout
