import './alert-message.style.css'

interface AlertMessageProps {
	percentage: number
}

const AlertMessage = ({ percentage }: AlertMessageProps) => {
	if (percentage < 60) {
		return (
			<div className='alert-message success-message'>
				Your balance is under control! You've spent {percentage.toFixed(2)}% of your budget.
			</div>
		)
	}

	if (percentage > 59 && percentage < 80) {
		return (
			<div className='alert-message warning-message'>
				This is warning message! You've spent {percentage.toFixed(2)}% of your budget.
			</div>
		)
	}

	if (percentage > 79 && percentage < 91) {
		return <div className='alert-message danger-message'>Your spending is almost at its peak.</div>
	}

	if (percentage > 90) {
		return <div className='alert-message danger-message'>Your spending is over the limit!</div>
	}
}

export default AlertMessage
