import logo from '@/assets/images/icon-logo.png'
import '@/components/sidebar/sidebar-logo-card/sidebar-logo-card.style.css'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs'

const SidebarLogoCard = () => {
	const { open, toggleOpen } = useSidebarContext()

	return (
		<div
			className='sidebar-card'
			style={!open ? { backgroundColor: 'transparent' } : {}}
			onClick={toggleOpen}
		>
			<img className='logo' src={logo} alt='financetrackr logo' />
			<div className='sidebar-card-title' style={!open ? { display: 'none' } : {}}>
				<h3>FinanceTrackr</h3>
				<p>39 members</p>
			</div>
			<div className='icon' style={!open ? { display: 'none' } : {}}>
				<BsLayoutSidebarInsetReverse color='var(--clr-text-secondary)' />
			</div>
		</div>
	)
}

export default SidebarLogoCard
