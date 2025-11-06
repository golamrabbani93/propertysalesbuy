'use client';
import React from 'react';
import {FaRegTimesCircle} from 'react-icons/fa';

interface VideoModalProps {
	show: boolean;
	onClose: () => void;
	videoUrl: string;
	autoPlay?: boolean;
}

const VideoModal: React.FC<VideoModalProps> = ({show, onClose, videoUrl, autoPlay = true}) => {
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
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content text-center p-4 rounded-3 shadow-lg">
					{/* Close button */}
					{/* <span
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
					</span> */}

					{/* Video */}
					<video
						src={videoUrl}
						controls
						autoPlay={autoPlay}
						style={{width: '100%', height: 'auto', borderRadius: '8px'}}
					/>

					{/* Optional Footer / Buttons */}
					<div className="mt-3">
						<button className="btn btn-primary rounded-2 px-4 fw-semibold" onClick={onClose}>
							<FaRegTimesCircle style={{height: '40px', width: '100px'}} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoModal;
