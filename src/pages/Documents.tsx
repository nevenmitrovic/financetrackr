import Loading from '@/components/common/loading/Loading'
import DocumentsContent from '@/components/documents-content/DocumentsContent'
import Sidebar from '@/components/sidebar/Sidebar'
import DashboardLayout from '@/layouts/DashboardLayout'

const Documents = () => {
	return (
		<>
			<Loading />
			<DashboardLayout sidebar={<Sidebar />} dashboardContent={<DocumentsContent />} />
		</>
	)
}

export default Documents
