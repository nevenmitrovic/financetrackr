import { useEffect, useRef, useState } from 'react'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { CgArrowsV } from 'react-icons/cg'
import { supabaseClient } from '@/services/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import avatar from '@/assets/images/avatar.png'
import './profile-card.style.css'

const ProfileCard = () => {
	const { open, toggleOpen } = useSidebarContext()
	const [openDropdown, setOpenDropdown] = useState(false)
	const [session, setSession] = useState<any | null>(null)

	const profileCardRef = useRef<HTMLDivElement>(null)

	const handleDropdown = () => {
		if (!open) toggleOpen()

		setOpenDropdown((prev) => !prev)
	}
	const handleClickOutside = (event: MouseEvent) => {
		if (profileCardRef.current && !profileCardRef.current.contains(event.target as Node)) {
			setOpenDropdown(false)
		}
	}
	async function handleSignInWithGoogle(response: any) {
		const { data, error } = await supabaseClient.auth.signInWithIdToken({
			provider: 'google',
			token: response.credential,
		})

		if (!error) setSe
	}

	useEffect(() => {
		supabaseClient.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [])

	useEffect(() => {
		if (openDropdown) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [openDropdown])

	if (!session) {
		console.log(session)

		return (
			<div
				className='sidebar-card'
				onClick={async () =>
					await supabaseClient.auth.signInWithOAuth({
						provider: 'google',
					})
				}
			>
				<img
					className={`avatar ${!open ? 'margin-auto' : ''}`}
					src={avatar}
					alt='financetrackr logo'
				/>
				<div className={`profile-card-title ${!open ? 'hidden' : ''}`}>
					<h3>Signin</h3>
					<p>with google</p>
				</div>
			</div>
		)
	}

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
