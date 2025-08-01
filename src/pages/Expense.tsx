import Loading from '@/components/common/loading/Loading'
import ExpenseContent from '@/components/expense-content/ExpenseContent'
import Sidebar from '@/components/sidebar/Sidebar'
import { ExpenseLayout } from '@/layouts/ExpenseLayout'

const Expense = () => {
	return (
		<>
			<Loading />
			<ExpenseLayout sidebar={<Sidebar />} expenseContent={<ExpenseContent />} />
		</>
	)
}

export default Expense
