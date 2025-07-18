import Sidebar from '@/components/sidebar/Sidebar'
import DashboardContent from '@/components/dashboard-content/DashboardContent'
import DashboardLayout from '@/layouts/DashboardLayout'
import Modal from '@/components/common/modal/Modal'
import { useIncomeContext } from '@/contexts/IncomeManagmentContext'
import IncomeModalContent from '@/components/dashboard-content/income-managment/income-modal-content/IncomeModalContent'

const Dashboard = () => {
	const { openModal } = useIncomeContext()

	return (
		<>
			<DashboardLayout sidebar={<Sidebar />} dashboardContent={<DashboardContent />} />

			{openModal && (
				<Modal>
					<IncomeModalContent />
				</Modal>
			)}
		</>
	)
}

export default Dashboard
