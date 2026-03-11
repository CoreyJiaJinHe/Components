import React from "react";
import "./BookScraperPageLayout.css";

const defaultLeftPanel = (
	<div>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		<p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
	</div>
);

const defaultMain = (
	<div>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		<p>Maecenas faucibus mollis interdum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
	</div>
);

const defaultRightPanel = (
	<div>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		<p>Donec id elit non mi porta gravida at eget metus.</p>
	</div>
);

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
	leftPanel = defaultLeftPanel,
	main = defaultMain,
	rightPanel = defaultRightPanel,
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
