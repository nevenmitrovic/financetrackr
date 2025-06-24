import { useSidebarContext } from '@/contexts/SidebarContext'
import { CgArrowsV } from 'react-icons/cg'

import avatar from '@/assets/images/avatar.png'
import './profile-card.style.css'
import { useEffect, useRef, useState } from 'react'

const ProfileCard = () => {
	const { open, toggleOpen } = useSidebarContext()
	const [openDropdown, setOpenDropdown] = useState(false)
	const profileCardRef = useRef<HTMLDivElement>(null)

	const handleDropdown = () => {
		if (!open) toggleOpen()

		setOpenDropdown((prev) => !prev)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (profileCardRef.current && !profileCardRef.current.contains(event.target as Node)) {
				setOpenDropdown(false)
			}
		}

		if (openDropdown) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [openDropdown])

	return (
		<div
			className={`sidebar-card ${!open ? 'transparent' : ''}`}
			onClick={handleDropdown}
			ref={profileCardRef}
		>
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

			<ul className={`profile-dropdown container ${!openDropdown ? 'hidden' : ''}`}>
				<li>Edit profile</li>
				<li>Logout</li>
			</ul>
		</div>
	)
}

export default ProfileCard
