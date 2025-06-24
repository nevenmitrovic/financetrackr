import { useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/useIsMobile'

const DashboardContent = () => {
	const { open } = useSidebarContext()
	const isMobile = useIsMobile()

	return (
		<div
			className={`dashboard-content-container ${open && isMobile ? 'hidden' : ''} ${
				isMobile ? 'mobile-layout' : ''
			}`}
		>
			DashboardContent
		</div>
	)
}

export default DashboardContent
