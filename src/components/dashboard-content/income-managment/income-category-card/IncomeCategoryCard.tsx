import './income-category-card.style.css'

interface IncomeCategoryCardProps {
	widthPerc: string
	widthColor: string
	title: string
	value: number
}

const IncomeCategoryCard = ({ widthPerc, widthColor, title, value }: IncomeCategoryCardProps) => {
	return (
		<div className='income-category-card' style={{ width: `${widthPerc}%` }}>
			<p className='title'>{title}</p>
			<h4 className='value'>{value.toFixed(2)}$</h4>
			<div className='percentage-width' style={{ backgroundColor: `var(${widthColor})` }}></div>
		</div>
	)
}

export default IncomeCategoryCard
