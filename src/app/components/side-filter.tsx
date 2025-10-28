'use client';
import React, {useState, useEffect} from 'react';

export default function SideFilter({
	show,
	setShow,
	setFilter,
	filter,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
	setFilter: (filter: any) => void;
	filter: any;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const [open2, setOpen2] = useState<boolean>(false);
	const [open3, setOpen3] = useState<boolean>(false);
	const [open4, setOpen4] = useState<boolean>(false);

	// State for filters
	const [location, setLocation] = useState<string>('');
	const [propertyType, setPropertyType] = useState<string>('');
	const [bedrooms, setBedrooms] = useState<string>('');
	const [priceRange, setPriceRange] = useState<string>('');
	const [verified, setVerified] = useState<boolean>(false);
	const [superAgent, setSuperAgent] = useState<boolean>(false);

	// Update filter live on any change
	useEffect(() => {
		setFilter({
			location,
			propertyType,
			bedrooms,
			priceRange,
			verified,
			superAgent,
		});
	}, [location, propertyType, bedrooms, priceRange, verified, superAgent, setFilter]);

	return (
		<div
			className={`simple-sidebar sm-sidebar ${show ? 'd-block' : ''}`}
			id="filter_search"
			style={{left: '0'}}
		>
			<div className="search-sidebar_header">
				<h4 className="ssh_heading">Close Filter</h4>
				<button className="w3-bar-item w3-button w3-large" onClick={() => setShow(false)}>
					<i className="fa-regular fa-circle-xmark fs-5 text-muted-2"></i>
				</button>
			</div>

			<div className="sidebar-widgets">
				<div className="search-inner p-0">
					<div className="filter-search-box">
						<div className="form-group">
							<div className="position-relative">
								<input
									type="text"
									className="form-control rounded-3 ps-5"
									placeholder="Search by space name…"
									onChange={(e) => setFilter({...filter, searchText: e.target.value})}
								/>
								<div className="position-absolute top-50 start-0 translate-middle-y ms-2">
									<span className="svg-icon text-primary svg-icon-2hx">{/* SVG icon here */}</span>
								</div>
							</div>
						</div>
					</div>

					<div className="position-relative d-flex flex-xl-row flex-column align-items-center">
						<div className="verifyd-prt-block flex-fill full-width my-1 me-1">
							<div className="d-flex align-items-center justify-content-center justify-content-between border rounded-3 px-2 py-3">
								<div className="eliok-cliops d-flex align-items-center">
									<span className="svg-icon text-success svg-icon-2hx">{/* Verified SVG */}</span>
									<span className="text-muted-2 fw-medium ms-1">Verified</span>
								</div>
								<div className="form-check form-switch">
									<input
										className="form-check-input"
										type="checkbox"
										role="switch"
										id="verifiedSwitch"
										checked={verified}
										onChange={() => setVerified(!verified)}
									/>
									<label className="form-check-label" htmlFor="verifiedSwitch"></label>
								</div>
							</div>
						</div>

						<div className="super-agt-block flex-fill full-width my-1 ms-1">
							<div className="d-flex align-items-center justify-content-center justify-content-between border rounded-3 px-2 py-3">
								<div className="eliok-cliops d-flex align-items-center">
									<span className="svg-icon text-warning svg-icon-2hx">{/* SuperAgent SVG */}</span>
									<span className="text-muted-2 fw-medium ms-1">SuperAgent</span>
								</div>
								<div className="form-check form-switch">
									<input
										className="form-check-input"
										type="checkbox"
										role="switch"
										id="superAgentSwitch"
										checked={superAgent}
										onChange={() => setSuperAgent(!superAgent)}
									/>
									<label className="form-check-label" htmlFor="superAgentSwitch"></label>
								</div>
							</div>
						</div>
					</div>

					<div className="filter_wraps">
						{/* Location Filter */}
						<div className="single_search_boxed">
							<div className="widget-boxed-header">
								<h4 onClick={() => setOpen(!open)} className={open ? '' : 'collapsed'}>
									Where<span className="selected">{location}</span>
								</h4>
							</div>
							<div className={`widget-boxed-body collapse ${open ? 'show' : ''}`} id="where">
								<div className="side-list no-border">
									<div className="single_filter_card">
										<div className="card-body pt-0">
											<div className="inner_widget_link">
												<ul className="no-ul-list filter-list">
													{['Banani', 'Gulshan', 'Bashundhara'].map((city) => (
														<li className="form-check" key={city}>
															<input
																id={`where-${city}`}
																className="form-check-input"
																name="where"
																type="radio"
																checked={location === city}
																onChange={() => setLocation(city)}
															/>
															<label htmlFor={`where-${city}`} className="form-check-label">
																{city}
															</label>
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Property Type Filter */}
						<div className="single_search_boxed">
							<div className="widget-boxed-header">
								<h4 onClick={() => setOpen2(!open2)} className={open2 ? '' : 'collapsed'}>
									Property Types<span className="selected">{propertyType}</span>
								</h4>
							</div>
							<div className={`widget-boxed-body collapse ${open2 ? 'show' : ''}`}>
								<div className="side-list no-border">
									<div className="single_filter_card">
										<div className="card-body pt-0">
											<div className="inner_widget_link">
												<ul className="no-ul-list filter-list">
													{['House', 'Villa', 'Apartment', 'Condo'].map((ptype) => (
														<li className="form-check" key={ptype}>
															<input
																id={`ptype-${ptype}`}
																className="form-check-input"
																name="ptype"
																type="radio"
																checked={propertyType === ptype}
																onChange={() => setPropertyType(ptype)}
															/>
															<label htmlFor={`ptype-${ptype}`} className="form-check-label">
																{ptype}
															</label>
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Bedrooms Filter */}
						<div className="single_search_boxed">
							<div className="widget-boxed-header">
								<h4 onClick={() => setOpen3(!open3)} className={open3 ? '' : 'collapsed'}>
									Bedrooms<span className="selected">{bedrooms}</span>
								</h4>
							</div>
							<div className={`widget-boxed-body collapse ${open3 ? 'show' : ''}`}>
								<div className="side-list no-border">
									<div className="single_filter_card">
										<div className="card-body pt-0">
											<div className="inner_widget_link">
												<ul className="no-ul-list filter-list">
													{['1 Beds', '2 Beds', '3 Beds', '4 Beds', '5 Beds', '6+ Beds'].map(
														(bed) => (
															<li className="form-check" key={bed}>
																<input
																	id={`bed-${bed}`}
																	className="form-check-input"
																	name="bed"
																	type="radio"
																	checked={bedrooms === bed}
																	onChange={() => setBedrooms(bed)}
																/>
																<label htmlFor={`bed-${bed}`} className="form-check-label">
																	{bed}
																</label>
															</li>
														),
													)}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Price Range Filter */}
						<div className="single_search_boxed">
							<div className="widget-boxed-header">
								<h4 onClick={() => setOpen4(!open4)} className={open4 ? '' : 'collapsed'}>
									Price Range<span className="selected">{priceRange}</span>
								</h4>
							</div>
							<div className={`widget-boxed-body collapse ${open4 ? 'show' : ''}`}>
								<div className="side-list no-border">
									<div className="single_filter_card">
										<div className="card-body pt-0">
											<div className="inner_widget_link">
												<ul className="no-ul-list filter-list">
													{[
														'Less Than ৳1,200,000',
														'৳1,200,000 - ৳1,800,000',
														'৳1,440,000 - ৳3,000,000',
														'৳3,600,000 - ৳4,200,000',
														'৳4,800,000 - ৳5,400,000',
														'৳6,000,000 - ৳6,600,000',
														'৳7,200,000 - ৳7,800,000',
														'More Than ৳8,400,000',
													].map((price) => (
														<li className="form-check" key={price}>
															<input
																id={`price-${price}`}
																className="form-check-input"
																name="prices"
																type="radio"
																checked={priceRange === price}
																onChange={() => setPriceRange(price)}
															/>
															<label htmlFor={`price-${price}`} className="form-check-label">
																{price}
															</label>
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Removed Apply Filters button */}
					<div className="form-group filter_button">
						<button
							type="submit"
							className="btn btn btn-primary rounded full-width"
							onClick={() => {
								setLocation('');
								setPropertyType('');
								setBedrooms('');
								setPriceRange('');
								setVerified(false);
								setSuperAgent(false);
								setFilter({
									location: '',
									propertyType: '',
									bedrooms: '',
									priceRange: '',
									verified: false,
									superAgent: false,
								});
								setShow(false);
							}}
						>
							Clear All Filters
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
