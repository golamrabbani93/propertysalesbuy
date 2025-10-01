'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Select = dynamic(() => import('react-select'), {ssr: false});

import ModalVideo from 'react-modal-video';
import Lightbox from 'react-18-image-lightbox';

import {galleryImg, propertyFeature} from '../../data/property';

import '../../../../node_modules/react-modal-video/css/modal-video.css';
import '../../../../node_modules/react-18-image-lightbox/style.css';

export default function PropertyDetail() {
	const [isOpen, setIsOpen] = useState(false);
	let [open, setOpen] = useState<boolean>(true);
	let [open2, setOpen2] = useState<boolean>(true);
	let [open3, setOpen3] = useState<boolean>(true);
	let [open4, setOpen4] = useState<boolean>(false);
	let [open5, setOpen5] = useState<boolean>(false);
	let [open6, setOpen6] = useState<boolean>(false);
	let [open7, setOpen7] = useState<boolean>(false);
	let [open8, setOpen8] = useState<boolean>(true);
	let [open9, setOpen9] = useState<boolean>(true);
	let [open10, setOpen10] = useState<boolean>(true);
	let [show, setShow] = useState<boolean>(false);
	let [show2, setShow2] = useState<boolean>(false);
	let [show3, setShow3] = useState<boolean>(false);

	let [activeIndex, setActiveIndex] = useState<number>(0);
	let [photo, setPhoto] = useState<boolean>(false);

	const onImageClick = (index: number) => {
		setActiveIndex(index);
		setPhoto(true);
	};

	const rating = [
		{value: '1', label: '01 Star'},
		{value: '1', label: '02 Star'},
		{value: '1', label: '03 Star'},
		{value: '1', label: '04 Star'},
		{value: '1', label: '05 Star'},
	];

	return (
		<>
			<div className="property_block_wrap style-2">
				<div className="property_block_wrap_header">
					<Link
						href="#"
						scroll={false}
						onClick={() => setOpen(!open)}
						className={open ? '' : 'collapsed'}
					>
						<h4 className="property_block_title">Detail & Features</h4>
					</Link>
				</div>
				<div id="clOne" className={`panel-collapse collapse ${open ? 'show' : ''}`}>
					<div className="block-body">
						<ul className="deatil_features">
							{propertyFeature.map((item: any, index: number) => {
								return (
									<li key={index}>
										<strong>{item.title}</strong>
										{item.value}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>

			<div className="property_block_wrap style-2">
				<div className="property_block_wrap_header">
					<Link
						href="#"
						scroll={false}
						onClick={() => setOpen2(!open2)}
						className={open2 ? '' : 'collapsed'}
					>
						<h4 className="property_block_title">Description</h4>
					</Link>
				</div>
				<div id="clTwo" className={`panel-collapse collapse ${open2 ? 'show' : ''}`}>
					<div className="block-body">
						<p>
							Experience luxury and comfort in this modern and spacious apartment located in the
							prestigious Gulshan area of Dhaka. Featuring 3BHK of thoughtfully designed living
							space, 3 comfortable bedrooms, and 1800 SQFT of elegant interiors, this property
							blends style with functionality. The apartment offers high-quality finishes, ample
							natural light, and a well-planned layout perfect for families or professionals. Enjoy
							easy access to shopping centers, schools, restaurants, and entertainment hubs, making
							your everyday life convenient and enjoyable. With a focus on safety, privacy, and
							modern living, this property provides the ideal environment for creating lasting
							memories and a comfortable lifestyle in the heart of the city."
						</p>
					</div>
				</div>
			</div>

			<div className="property_block_wrap style-2">
				<div className="property_block_wrap_header">
					<Link
						href="#"
						scroll={false}
						onClick={() => setOpen3(!open3)}
						className={open3 ? '' : 'collapsed'}
					>
						<h4 className="property_block_title">Ameneties</h4>
					</Link>
				</div>
				<div id="clThree" className={`panel-collapse collapse ${open3 ? 'show' : ''}`}>
					<div className="block-body">
						<ul className="avl-features third color">
							<li>Air Conditioning</li>
							<li>Swimming Pool</li>
							<li>Central Heating</li>
							<li>Laundry Room</li>
							<li>Gym</li>
							<li>Alarm</li>
							<li>Window Covering</li>
							<li>Internet</li>
							<li>Pets Allow</li>
							<li>Free WiFi</li>
							<li>Car Parking</li>
							<li>Spa & Massage</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="property_block_wrap style-2">
				<div className="property_block_wrap_header">
					<Link
						href="#"
						scroll={false}
						onClick={() => setOpen4(!open4)}
						className={open4 ? '' : 'collapsed'}
					>
						<h4 className="property_block_title">Property video</h4>
					</Link>
				</div>

				<div id="clFour" className={`panel-collapse collapse ${open4 ? 'show' : ''}`}>
					<div className="block-body">
						<div className="property_video">
							<div className="thumb">
								<Image
									className="pro_img img-fluid w100"
									src="/img/pl-6.jpg"
									width={0}
									height={0}
									sizes="100vw"
									style={{width: '100%', height: 'auto'}}
									alt="7.jpg"
								/>
								<div className="overlay_icon">
									<div className="bb-video-box">
										<div className="bb-video-box-inner">
											<div className="bb-video-box-innerup">
												<Link href="#" onClick={() => setIsOpen(true)} className="text-primary">
													<i className="fa-solid fa-play"></i>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<ModalVideo
					channel="youtube"
					youtube={{mute: 0, autoplay: 0}}
					isOpen={isOpen}
					videoId="yba7hPeTSjk"
					onClose={() => setIsOpen(false)}
				/>
			</div>

			<div className="property_block_wrap style-2">
				<div className="property_block_wrap_header">
					<Link
						href="#"
						scroll={false}
						onClick={() => setOpen5(!open5)}
						className={open5 ? '' : 'collapsed'}
					>
						<h4 className="property_block_title">Floor Plan</h4>
					</Link>
				</div>
				<div id="clFive" className={`panel-collapse collapse ${open5 ? 'show' : ''}`}>
					<div className="block-body">
						<div className="accordion" id="floor-option">
							<div className="card">
								<div className="card-header" id="firstFloor">
									<h2 className="mb-0">
										<button
											type="button"
											onClick={() => setShow(!show)}
											className={`btn btn-link ${show ? '' : 'collapsed'}`}
										>
											First Floor<span>740 sq ft</span>
										</button>
									</h2>
								</div>
								<div id="firstfloor" className={`collapse ${show ? 'show' : ''}`}>
									<div className="card-body">
										<Image
											src="/img/floor.jpg"
											width={0}
											height={0}
											sizes="100vw"
											style={{width: '100%', height: 'auto'}}
											className="img-fluid"
											alt=""
										/>
									</div>
								</div>
							</div>
							<div className="card">
								<div className="card-header" id="seconfFloor">
									<h2 className="mb-0">
										<button
											type="button"
											onClick={() => setShow2(!show2)}
											className={`btn btn-link ${show2 ? '' : 'collapsed'}`}
										>
											Second Floor<span>710 sq ft</span>
										</button>
									</h2>
								</div>
								<div id="secondfloor" className={`collapse ${show2 ? 'show' : ''}`}>
									<div className="card-body">
										<Image
											src="/img/floor.jpg"
											width={0}
											height={0}
											sizes="100vw"
											style={{width: '100%', height: 'auto'}}
											className="img-fluid"
											alt=""
										/>
									</div>
								</div>
							</div>
							<div className="card">
								<div className="card-header" id="third-garage">
									<h2 className="mb-0">
										<button
											type="button"
											onClick={() => setShow3(!show3)}
											className={`btn btn-link ${show3 ? '' : 'collapsed'}`}
										>
											Garage<span>520 sq ft</span>
										</button>
									</h2>
								</div>
								<div id="garages" className={`collapse ${show3 ? 'show' : ''}`}>
									<div className="card-body">
										<Image
											src="/img/floor.jpg"
											width={0}
											height={0}
											sizes="100vw"
											style={{width: '100%', height: 'auto'}}
											className="img-fluid"
											alt=""
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="property_block_wrap style-2">
				<div className="property_block_wrap_header">
					<Link
						href="#"
						scroll={false}
						onClick={() => setOpen6(!open6)}
						className={open6 ? '' : 'collapsed'}
					>
						<h4 className="property_block_title">Location</h4>
					</Link>
				</div>
				<div id="clSix" className={`panel-collapse collapse ${open6 ? 'show' : ''}`}>
					<div className="block-body">
						<div className="map-container">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.3838103135677!2d80.87929001488125!3d26.827742183164247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfe8bc34b51bb%3A0xa3ca86eec63f6f8!2sINFOSYS%20DIGITAL%20COMPUTER%20(Prabhat%20Computer%20Classes)!5e0!3m2!1sen!2sin!4v1680238790732!5m2!1sen!2sin"
								width="100%"
								height="450"
								style={{border: '0'}}
								loading="lazy"
								title="myframe"
							></iframe>
						</div>
					</div>
				</div>
			</div>

			<div className="property_block_wrap style-2">
				<div className="property_block_wrap_header">
					<Link
						href="#"
						scroll={false}
						onClick={() => setOpen7(!open7)}
						className={open7 ? '' : 'collapsed'}
					>
						<h4 className="property_block_title">Gallery</h4>
					</Link>
				</div>

				<div id="clSev" className={`panel-collapse collapse ${open7 ? 'show' : ''}`}>
					<div className="block-body">
						<ul className="list-gallery-inline">
							{galleryImg.map((item: any, index: number) => {
								return (
									<li key={index}>
										<Link href="#" className="mfp-gallery" onClick={() => onImageClick(index)}>
											<Image
												src={item}
												width={0}
												height={0}
												sizes="100vw"
												style={{width: '100%', height: 'auto'}}
												className="img-fluid mx-auto"
												alt=""
											/>
										</Link>
									</li>
								);
							})}
						</ul>
						{photo && (
							<Lightbox
								mainSrc={galleryImg[activeIndex]}
								nextSrc={galleryImg[(activeIndex + 1) % galleryImg.length]}
								prevSrc={galleryImg[(activeIndex + galleryImg.length - 1) % galleryImg.length]}
								onCloseRequest={() => setPhoto(false)}
								onMovePrevRequest={() =>
									setActiveIndex((activeIndex + galleryImg.length - 1) % galleryImg.length)
								}
								onMoveNextRequest={() => setActiveIndex((activeIndex + 1) % galleryImg.length)}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
