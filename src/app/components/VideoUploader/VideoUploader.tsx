import React, {useState, useRef, useCallback} from 'react';
import './VideoUploader.css';

import Card, {CardContent} from '../ImageUploader/Card';
import Button from '../ImageUploader/Button';

export interface IUploadedVideo {
	id: string;
	file: File | null;
	previewUrl: string;
	name?: string;
}

interface VideoUploaderProps {
	uploadedVideos: IUploadedVideo[];
	setUploadedVideos: React.Dispatch<React.SetStateAction<IUploadedVideo[]>>;
	maxVideos?: number;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
	uploadedVideos,
	setUploadedVideos,
	maxVideos,
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = useCallback(
		(files: FileList | null) => {
			if (!files) return;

			const newVideos: IUploadedVideo[] = [];

			Array.from(files).forEach((file) => {
				if (!file.type.startsWith('video/')) {
					alert('Please select only video files');
					return;
				}

				const previewUrl = URL.createObjectURL(file);
				newVideos.push({
					id: Math.random().toString(36).substr(2, 9),
					file,
					previewUrl,
				});
			});

			setUploadedVideos((prev) => [...prev, ...newVideos]);
		},
		[setUploadedVideos],
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragging(false);
			handleFileSelect(e.dataTransfer.files);
		},
		[handleFileSelect],
	);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	}, []);

	const removeVideo = useCallback(
		(id: string) => {
			setUploadedVideos((prev) => {
				const videoToRemove = prev.find((v) => v.id === id);
				if (videoToRemove) {
					URL.revokeObjectURL(videoToRemove.previewUrl);
				}
				return prev.filter((v) => v.id !== id);
			});
		},
		[setUploadedVideos],
	);

	const handleFileInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			handleFileSelect(e.target.files);
			if (fileInputRef.current) fileInputRef.current.value = '';
		},
		[handleFileSelect],
	);

	const triggerFileInput = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	return (
		<div className="video-uploader-container">
			{maxVideos && uploadedVideos.length >= maxVideos ? (
				''
			) : (
				<div
					className={`upload-area ${isDragging ? 'dragging' : ''}`}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onClick={triggerFileInput}
					role="button"
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') triggerFileInput();
					}}
				>
					<div className="upload-icon">
						{/* Video upload SVG */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-video-icon lucide-video"
						>
							<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
							<rect x="2" y="6" width="14" height="12" rx="2" />
						</svg>
					</div>
					<p className="upload-text">Drag & drop video here</p>
					<p className="upload-subtext">or click to browse your files</p>
					<Button
						variant="primary"
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							triggerFileInput();
						}}
					>
						Select Video
					</Button>

					<input
						ref={fileInputRef}
						type="file"
						multiple
						accept="video/*"
						onChange={handleFileInputChange}
						className="file-input"
					/>
				</div>
			)}

			{uploadedVideos.length > 0 ? (
				<>
					<h3 className="uploaded-title">Uploaded Videos ({uploadedVideos.length})</h3>
					<div className="videos-grid">
						{uploadedVideos.map((video) => (
							<Card key={video.id} className="video-card">
								<CardContent className="card-content">
									<div className="video-wrapper">
										<video
											src={video.previewUrl}
											controls
											className="video-preview"
											title={video?.file?.name || video?.name}
										/>
										<button
											className="remove-btn"
											onClick={() => removeVideo(video.id)}
											aria-label={`Remove ${video?.file?.name || video?.name}`}
											type="button"
										>
											&times;
										</button>
									</div>
									<div className="video-info">
										<p className="video-name" title={video?.file?.name || video?.name}>
											{video?.file?.name || video?.name}
										</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</>
			) : (
				<div className="empty-state">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="64"
						height="64"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-play-icon lucide-play"
					>
						<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
					</svg>
					<p className="empty-text">No video uploaded yet</p>
					<p className="empty-subtext">Upload A video to get started</p>
				</div>
			)}
		</div>
	);
};

export default VideoUploader;
