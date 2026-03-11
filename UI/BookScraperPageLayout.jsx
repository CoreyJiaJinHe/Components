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
			<div className="ui-scraper-layout__background">
				<div className="ui-scraper-layout__container">
					{leftPanel && <aside className="ui-scraper-layout__left">{leftPanel}</aside>}
					<section className="ui-scraper-layout__main">{main}</section>
					{rightPanel && <aside className="ui-scraper-layout__right">{rightPanel}</aside>}
				</div>
			</div>
		</>
	);
}

export default BookScraperPageLayout;
