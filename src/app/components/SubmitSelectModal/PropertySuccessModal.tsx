'use client';
import Link from 'next/link';
import React from 'react';

interface SubmitSelectModalProps {
	show: boolean;
	onClose: () => void;
}

const SubmitSelectModal: React.FC<SubmitSelectModalProps> = ({show, onClose}) => {
	return (
		<div
			className="modal fade show"
			style={{
				display: show ? 'block' : 'none',
				backgroundColor: '#0000008a',
				zIndex: 4000,
			}}
		>
			<div className="modal-dialog modal-dialog-centered login-pop-form" role="document">
				<div className="modal-content text-center p-4 rounded-3 shadow-lg">
					{/* Close button */}
					<span
						className="mod-close position-absolute top-0 end-0 p-3 cursor-pointer"
						onClick={onClose}
					>
						<span className="svg-icon text-primary svg-icon-2hx">
							<svg
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									opacity="0.3"
									x="2"
									y="2"
									width="20"
									height="20"
									rx="10"
									fill="currentColor"
								></rect>
								<rect
									x="7"
									y="15.3137"
									width="12"
									height="2"
									rx="1"
									transform="rotate(-45 7 15.3137)"
									fill="currentColor"
								></rect>
								<rect
									x="8.41422"
									y="7"
									width="12"
									height="2"
									rx="1"
									transform="rotate(45 8.41422 7)"
									fill="currentColor"
								></rect>
							</svg>
						</span>
					</span>

					{/* Success icon */}
					<div className="d-flex justify-content-center mb-4 mt-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100"
							height="100"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-building-icon lucide-building text-success svg-icon-4hx"
						>
							<path d="M12 10h.01" />
							<path d="M12 14h.01" />
							<path d="M12 6h.01" />
							<path d="M16 10h.01" />
							<path d="M16 14h.01" />
							<path d="M16 6h.01" />
							<path d="M8 10h.01" />
							<path d="M8 14h.01" />
							<path d="M8 6h.01" />
							<path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
							<rect x="4" y="2" width="16" height="20" rx="2" />
						</svg>
					</div>

					{/* Text Content */}
					<h4 className="fw-bold mb-2 text-success">Which property do you want to Sell?</h4>
					<div className="submit-links">
						<Link href="/submit-property" className="btn btn-primary m-2" onClick={onClose}>
							Sell Apartment
						</Link>
						<Link href="/submit-land" className="btn btn-success m-2" onClick={onClose}>
							Sell Land
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SubmitSelectModal;
