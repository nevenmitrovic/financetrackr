import Sidebar from '@/components/sidebar/Sidebar'
import DashboardLayout from '@/layouts/DashboardLayout'

const Dashboard = () => {
	return <DashboardLayout sidebar={<Sidebar />} dashboardContent={<div>DashboardContent</div>} />
}

export default Dashboard
