import Loading from '@/components/common/loading/Loading'
import ExpenseContent from '@/components/expense-content/ExpenseContent'
import Sidebar from '@/components/sidebar/Sidebar'
import DashboardLayout from '@/layouts/DashboardLayout'

const Expense = () => {
	return (
		<>
			<Loading />
			<DashboardLayout sidebar={<Sidebar />} dashboardContent={<ExpenseContent />} />
		</>
	)
}

export default Expense
