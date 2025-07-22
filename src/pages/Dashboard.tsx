import Sidebar from '@/components/sidebar/Sidebar'
import DashboardContent from '@/components/dashboard-content/DashboardContent'
import DashboardLayout from '@/layouts/DashboardLayout'
import Modal from '@/components/common/modal/Modal'
import { useIncomeContext } from '@/contexts/IncomeManagmentContext'
import IncomeModalContent from '@/components/dashboard-content/income-managment/income-modal-content/IncomeModalContent'
import Loading from '@/components/common/loading/Loading'

const Dashboard = () => {
	const { openModal } = useIncomeContext()

	return (
		<>
			<Loading />
			<DashboardLayout sidebar={<Sidebar />} dashboardContent={<DashboardContent />} />

			<Modal isOpen={openModal}>
				<IncomeModalContent />
			</Modal>
		</>
	)
}

export default Dashboard
