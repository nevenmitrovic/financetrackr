import { useSidebarContext } from '@/contexts/SidebarContext'
import { useIsMobile } from '@/hooks/common/useIsMobile'
import PageHeader from '../common/page-header/PageHeader'

const ExpenseLayoutContent = () => {
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
					<div className='dashboard-content-container'>content</div>
				</div>
			</div>
		</>
	)
}

export default ExpenseLayoutContent
