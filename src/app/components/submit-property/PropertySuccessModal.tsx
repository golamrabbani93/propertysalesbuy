'use client';
import React from 'react';

interface PropertySuccessModalProps {
	show: boolean;
	onClose: () => void;
}

const PropertySuccessModal: React.FC<PropertySuccessModalProps> = ({show, onClose}) => {
	if (!show) return null;

	return (
		<div
			className="modal fade show"
			style={{
				display: 'block',
				backgroundColor: '#0000008a',
				zIndex: 1050,
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
						<span className="svg-icon text-success svg-icon-3hx">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="80"
								height="80"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<path d="M9 12l2 2l4-4"></path>
							</svg>
						</span>
					</div>

					{/* Text Content */}
					<h4 className="fw-bold mb-2 text-success">Property Created Successfully!</h4>
					<p className="text-muted mb-4">
						Please wait for the admin to review and publish your property.
					</p>

					{/* Close button */}
					<button className="btn btn-primary rounded-2 px-4 fw-semibold" onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default PropertySuccessModal;
