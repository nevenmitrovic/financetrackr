import { useSidebarContext } from '@/contexts/SidebarContext'
import { CgArrowsV } from 'react-icons/cg'

import avatar from '@/assets/images/avatar.png'
import './profile-card.style.css'

const ProfileCard = () => {
	const { open, toggleOpen } = useSidebarContext()

	return (
		<div className={`sidebar-card ${!open ? 'transparent' : ''}`} onClick={toggleOpen}>
			<img
				className={`avatar ${!open ? 'margin-auto' : ''}`}
				src={avatar}
				alt='financetrackr logo'
			/>
			<div className={`profile-card-title ${!open ? 'hidden' : ''}`}>
				<h3>Neven Mitrovic</h3>
				<p>neven@gmail.com</p>
			</div>
			<div className={`icon ${!open ? 'hidden' : ''}`}>
				<CgArrowsV color='var(--clr-text-secondary)' />
			</div>
		</div>
	)
}

export default ProfileCard
