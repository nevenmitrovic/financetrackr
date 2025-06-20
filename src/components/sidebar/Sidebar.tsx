import { useSidebarContext } from '@/contexts/SidebarContext'

import './sidebar.style.css'
import SidebarHeader from './sidebar-header/SiderbarHeader'

const Sidebar = () => {
	const { open } = useSidebarContext()

	return (
		<div className={`sidebar-container container ${open ? 'sidebar-open' : 'sidebar-close'}`}>
			<SidebarHeader />
		</div>
	)
}

export default Sidebar
