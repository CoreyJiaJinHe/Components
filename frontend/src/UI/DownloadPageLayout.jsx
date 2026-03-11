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
			<div className="ui-download-layout">
				<header className="ui-download-layout__header">{header}</header>
				<main className="ui-download-layout__main">{main}</main>
			</div>
		</>
	);
}

export default DownloadPageLayout;
