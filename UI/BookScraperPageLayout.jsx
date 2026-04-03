import React from "react";
import "./BookScraperPageLayout.css";

/**
 * Generic layout extracted from the Book Scraper Page.
 *
 * Props:
 * - overlay: ReactNode (popups, dialogs)
 * - nav: ReactNode
 * - leftPanel: ReactNode
 * - main: ReactNode
 * - rightPanel: ReactNode
 */
function BookScraperPageLayout({
	overlay = null,
	nav = null,
	leftPanel = null,
	main = null,
	rightPanel = null,
}) {
	return (
		<>
			{overlay}
			{nav}
			<div className="Book-Page-Scraper-Layout-Background">
				<div className="Book-Page-Scraper-Layout-Container">
					{leftPanel && <aside className="Book-Page-Scraper-Layout-Left-Aside">{leftPanel}</aside>}
					<section className="Book-Page-Scraper-Layout-Main-Section">{main}</section>
					{rightPanel && <aside className="Book-Page-Scraper-Layout-Right-Aside">{rightPanel}</aside>}
				</div>
			</div>
		</>
	);
}

export default BookScraperPageLayout;
