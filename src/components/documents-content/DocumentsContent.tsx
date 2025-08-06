import { useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/common/useIsMobile'
import PageHeader from '@/components/common/page-header/PageHeader'
import DocumentCard from '@/components/documents-content/document-card/DocumentCard'

import './documents-content.style.css'
import '@/components/dashboard-content/dashboard-content.style.css'

const DocumentsContent = () => {
	const { open } = useSidebarContext()
	const isMobile = useIsMobile()

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
									user='Neven Mitrovic'
									onClick={() => {}}
									title='Current month income'
								/>
								<DocumentCard user='Neven Mitrovic' onClick={() => {}} title='All time income' />
								<DocumentCard
									user='Neven Mitrovic'
									onClick={() => {}}
									title='Current month expenses'
								/>
								<DocumentCard user='Neven Mitrovic' onClick={() => {}} title='All time expenses' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default DocumentsContent
