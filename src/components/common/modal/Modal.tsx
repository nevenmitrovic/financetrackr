import type { ReactNode } from 'react'
import './modal.style.css'

interface ModalProps {
	children: ReactNode
}

const Modal = ({ children }: ModalProps) => {
	return (
		<div className='modal-background container'>
			<div className='container content-card modal-container'>{children}</div>
		</div>
	)
}

export default Modal
