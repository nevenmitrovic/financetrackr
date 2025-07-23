import Sidebar from '@/components/sidebar/Sidebar'
import DashboardContent from '@/components/dashboard-content/DashboardContent'
import DashboardLayout from '@/layouts/DashboardLayout'
import Modal from '@/components/common/modal/Modal'
import { useIncomeContext } from '@/contexts/IncomeManagmentContext'
import IncomeModalContent from '@/components/dashboard-content/income-managment/income-modal-content/IncomeModalContent'
import Loading from '@/components/common/loading/Loading'
import { useBudgetContext } from '@/contexts/BudgetControlContext'
import BudgetModalContent from '@/components/dashboard-content/budget-control/budget-modal-content/BudgetModalContent'
import TransactionModalContent from '@/components/dashboard-content/recent-transactions/transaction-modal-content/TransactionModalContent'
import { useTransactionContext } from '@/contexts/RecentTransactionContext'

const Dashboard = () => {
	const { openIncomeModal } = useIncomeContext()
	const { openBudgetModal } = useBudgetContext()
	const { openTransactionModal } = useTransactionContext()

	return (
		<>
			<Loading />
			<DashboardLayout sidebar={<Sidebar />} dashboardContent={<DashboardContent />} />

			<Modal isOpen={openIncomeModal}>
				<IncomeModalContent />
			</Modal>
			<Modal isOpen={openBudgetModal}>
				<BudgetModalContent />
			</Modal>
			<Modal isOpen={openTransactionModal}>
				<TransactionModalContent />
			</Modal>
		</>
	)
}

export default Dashboard
