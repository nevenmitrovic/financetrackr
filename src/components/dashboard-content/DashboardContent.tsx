import { useSidebarContext } from '@/contexts/SidebarContext'

const DashboardContent = () => {
	const { open } = useSidebarContext()

	return <div>DashboardContent</div>
}

export default DashboardContent
