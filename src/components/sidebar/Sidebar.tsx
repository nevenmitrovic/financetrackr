import SidebarLogoCard from '@/components/sidebar/sidebar-logo-card/SidebarLogoCard'
import { useSidebarContext } from '@/contexts/SidebarContext'

import './sidebar.style.css'

const Sidebar = () => {
	const { open } = useSidebarContext()

	return (
		<div className={`sidebar-container container ${open ? 'sidebar-open' : 'sidebar-close'}`}>
			<SidebarLogoCard />
		</div>
	)
}

export default Sidebar
