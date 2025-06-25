import './progress-stripe.style.css'

type ProgressStripeProps = {
	percentage: number
}

const TOTAL_BARS = 40

const ProgressStripe = ({ percentage }: ProgressStripeProps) => {
	const filledBars = Math.round((percentage / 100) * TOTAL_BARS)

	const getBarColorClass = (index: number): string => {
		if (index >= filledBars) return ''

		const barPercentage = ((index + 1) / TOTAL_BARS) * 100

		if (barPercentage <= 60) return 'filled success'
		if (barPercentage <= 80) return 'filled warning'
		return 'filled danger'
	}

	return (
		<div
			className='stripe-container'
			style={{ overflow: 'hidden', width: '100%', maxWidth: '100%' }}
		>
			{Array.from({ length: TOTAL_BARS }).map((_, i) => (
				<div key={i} className={`stripe-bar ${getBarColorClass(i)}`} />
			))}
		</div>
	)
}

export default ProgressStripe
