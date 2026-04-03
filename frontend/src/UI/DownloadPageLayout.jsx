import React from "react";
import "./DownloadPageLayout.css";

const defaultHeader = <h1>Download Layout</h1>;

const defaultMain = (
	<div>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
	</div>
);

/**
 * Generic layout extracted from the Download Page.
 *
 * Props:
 * - nav: ReactNode
 * - header: ReactNode
 * - main: ReactNode
 */
function DownloadPageLayout({ nav = null, header = defaultHeader, main = defaultMain }) {
	return (
		<>
			{nav}
			<div className="Download-Page-Layout-Container">
				<header className="Download-Page-Layout-Header">{header}</header>
				<main className="Download-Page-Layout-Main-Section">{main}</main>
			</div>
		</>
	);
}

export default DownloadPageLayout;
