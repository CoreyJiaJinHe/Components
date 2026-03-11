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
			<div className="ui-download-layout">
				<header className="ui-download-layout__header">{header}</header>
				<main className="ui-download-layout__main">{main}</main>
			</div>
		</>
	);
}

export default DownloadPageLayout;
