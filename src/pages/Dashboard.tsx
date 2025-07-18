import Sidebar from '@/components/sidebar/Sidebar'
import DashboardContent from '@/components/dashboard-content/DashboardContent'
import DashboardLayout from '@/layouts/DashboardLayout'
import Modal from '@/components/common/modal/Modal'
import { useIncomeContext } from '@/contexts/IncomeManagmentContext'

const Dashboard = () => {
	const { openModal } = useIncomeContext()

	return (
		<>
			<DashboardLayout sidebar={<Sidebar />} dashboardContent={<DashboardContent />} />

			{openModal && (
				<Modal>
					<div className='income-modal-header'>x</div>
					<div className='income-modal-body'>This is income modal body!</div>
					<div className='income-modal-footer'>footer</div>
				</Modal>
			)}
		</>
	)
}

export default Dashboard
