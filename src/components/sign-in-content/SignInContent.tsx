import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { supabaseClient } from '@/services/supabaseClient'

import './sign-in-content.style.css'
import logo from '@/assets/images/icon-logo.png'

const SignInContent = () => {
	return (
		<div className='container sign-in-content'>
			<div className='container content-card sign-in-container'>
				<div className='sign-in-welcome'>
					<img src={logo} alt='logo of the app' />
					<h3>Welcome. Please Sign In</h3>
				</div>
				<Auth
					supabaseClient={supabaseClient}
					appearance={{ theme: ThemeSupa }}
					providers={['google']}
					view='sign_in'
					onlyThirdPartyProviders={true}
					redirectTo={window.location.origin}
				/>
			</div>
		</div>
	)
}

export default SignInContent
