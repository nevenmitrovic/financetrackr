import logo from '@/assets/images/icon-logo.png'
import './sidebar-logo-card.style.css'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs'

const SidebarLogoCard = () => {
	const { open, toggleOpen } = useSidebarContext()

	return (
		<div className={`sidebar-card ${!open ? 'transparent' : ''}`} onClick={toggleOpen}>
			<img className='logo' src={logo} alt='financetrackr logo' />
			<div className={`sidebar-card-title ${!open ? 'hidden' : ''}`}>
				<h3>FinanceTrackr</h3>
				<p>39 members</p>
			</div>
			<div className={`icon ${!open ? 'hidden' : ''}`}>
				<BsLayoutSidebarInsetReverse color='var(--clr-text-secondary)' />
			</div>
		</div>
	)
}

export default SidebarLogoCard
