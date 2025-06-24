import { useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/useIsMobile'
import PageHeader from '@/components/common/page-header/PageHeader'

import './dashboard-content-container.style.css'

const DashboardContent = () => {
	const { open } = useSidebarContext()
	const isMobile = useIsMobile()

	return (
		<div
			className={`dashboard-content-container container ${open && isMobile ? 'hidden' : ''} ${
				isMobile ? 'mobile-layout' : ''
			}`}
		>
			<PageHeader />
		</div>
	)
}

export default DashboardContent
