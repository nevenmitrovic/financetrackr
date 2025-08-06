import { useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/common/useIsMobile'
import PageHeader from '@/components/common/page-header/PageHeader'
import DocumentCard from '@/components/documents-content/document-card/DocumentCard'
import { useIncome } from '@/hooks/income-managment/useIncome'
import { useExpense } from '@/hooks/common/useExpense'

import './documents-content.style.css'
import '@/components/dashboard-content/dashboard-content.style.css'

const DocumentsContent = () => {
	const { open } = useSidebarContext()
	const isMobile = useIsMobile()
	const { handleDownloadMonthlyIncome, handleDownloadAllTimeIncome } = useIncome()
	const { handleDownloadMonthlyExpense, handleDownloadAllTimeExpense } = useExpense()

	return (
		<>
			<div
				className={`dashboard-content-wrapper ${open && isMobile ? 'hidden' : ''} ${
					isMobile ? 'mobile-layout' : ''
				}`}
			>
				<div className='dashboard-content-header'>
					<PageHeader />
				</div>
				<div className='dashboard-content-scrollable'>
					<div className='documents-content-container'>
						<div className='content-card'>
							<div className='documents-header'>
								<h3>Documents</h3>
							</div>
							<div className='documents-container'>
								<DocumentCard
									onClick={handleDownloadMonthlyIncome}
									title='Current month income'
									desc="Download the current month's income"
								/>
								<DocumentCard
									onClick={handleDownloadAllTimeIncome}
									title='All time income'
									desc='Download all-time income'
								/>
								<DocumentCard
									onClick={handleDownloadMonthlyExpense}
									title='Current month expenses'
									desc="Download the current month's expenses"
								/>
								<DocumentCard
									onClick={handleDownloadAllTimeExpense}
									title='All time expenses'
									desc='Download all-time expenses'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default DocumentsContent
