import React from "react";
import "./DownloadPageLayout.css";

/**
 * Generic layout extracted from the Download Page.
 *
 * Props:
 * - nav: ReactNode
 * - header: ReactNode
 * - main: ReactNode
 */
function DownloadPageLayout({ nav = null, header = null, main = null }) {
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
