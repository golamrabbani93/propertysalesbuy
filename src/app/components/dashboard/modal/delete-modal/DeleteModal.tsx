'use client';
import React from 'react';

interface IDeleteModal {
	show: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading?: boolean;
	text?: string;
}

const DeleteModal: React.FC<IDeleteModal> = ({show, onClose, onConfirm, loading = false, text}) => {
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
						<span className="svg-icon text-danger svg-icon-2hx">
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

					{/* Delete icon */}
					<div className="d-flex justify-content-center mb-4 mt-3">
						<span className="svg-icon text-danger svg-icon-3hx">
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
								<line x1="15" y1="9" x2="9" y2="15"></line>
								<line x1="9" y1="9" x2="15" y2="15"></line>
							</svg>
						</span>
					</div>

					{/* Text Content */}
					<h4 className="fw-bold mb-2 text-danger">Delete {text}?</h4>
					<p className="text-muted mb-4">
						This action cannot be undone. Are you sure you want to permanently delete this {text}?
					</p>

					{/* Action Buttons */}
					<div className="d-flex justify-content-center gap-3">
						<button
							className="btn btn-secondary rounded-2 px-4 fw-semibold"
							onClick={onClose}
							disabled={loading}
						>
							Cancel
						</button>
						<button
							className="btn btn-danger rounded-2 px-4 fw-semibold"
							onClick={() => onConfirm()}
							disabled={loading}
						>
							{loading ? 'Deleting...' : 'Delete'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
