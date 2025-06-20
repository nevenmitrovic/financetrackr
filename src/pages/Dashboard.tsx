import Sidebar from '@/components/sidebar/Sidebar'
import DashboardContent from '@/components/dashboard-content/DashboardContent'
import DashboardLayout from '@/layouts/DashboardLayout'

const Dashboard = () => {
	return <DashboardLayout sidebar={<Sidebar />} dashboardContent={<DashboardContent />} />
}

export default Dashboard
