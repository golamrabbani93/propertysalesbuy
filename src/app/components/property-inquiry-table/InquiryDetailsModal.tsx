'use client';
import Link from 'next/link';
import React from 'react';

interface Inquiry {
	id: number;
	name: string;
	email: string;
	property_id: string;
	phone: string;
	subject: string;
	message: string;
	type: string;
	created_at: string;
}

interface InquiryDetailsModalProps {
	show: boolean;
	onClose: () => void;
	data?: Inquiry | null; // ✅ show details from this data
}

const InquiryDetailsModal: React.FC<InquiryDetailsModalProps> = ({show, onClose, data}) => {
	if (!show || !data) return null;

	return (
		<div
			className="modal fade show"
			style={{
				display: 'block',
				backgroundColor: '#0000008a',
				zIndex: 1050,
			}}
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content p-4 rounded-3 shadow-lg">
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

					<h4 className="fw-bold mb-3 text-primary">Inquiry Details</h4>

					<div className="text-start">
						{data.name && (
							<p>
								<strong>Name:</strong> {data.name}
							</p>
						)}
						<p>
							<strong>Email:</strong> {data.email}
						</p>
						<p>
							<strong>Phone:</strong> {data.phone}
						</p>
						{data.property_id && (
							<p>
								<strong>Property Information:</strong>
								<Link
									href={`/properties/${data.property_id}`}
									className="btn btn-sm btn-info ms-2"
									target="_blank"
								>
									View Property
								</Link>
							</p>
						)}
						{data.subject && (
							<p>
								<strong>Subject:</strong> {data.subject}
							</p>
						)}
						<p>
							<strong>Message:</strong> {data.message}
						</p>

						<p>
							<strong>Date:</strong> {new Date(data.created_at).toLocaleString()}
						</p>
					</div>

					<div className="text-center mt-4">
						<button className="btn btn-primary px-4" onClick={onClose}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InquiryDetailsModal;
