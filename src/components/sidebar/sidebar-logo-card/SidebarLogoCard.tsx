import logo from '@/assets/images/icon-logo.png'
import '@/components/sidebar/sidebar-logo-card/sidebar-logo-card.style.css'
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs'

const SidebarLogoCard = () => {
	return (
		<div className='sidebar-card'>
			<img className='logo' src={logo} alt='financetrackr logo' />
			<div className='sidebar-card-title'>
				<h3>FinanceTrackr</h3>
				<p>39 members</p>
			</div>
			<div className='icon'>
				<BsLayoutSidebarInsetReverse color='var(--clr-text-secondary)' />
			</div>
		</div>
	)
}

export default SidebarLogoCard
