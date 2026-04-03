import React from "react";
import "./BooksPageLayout.css";

/**
 * Generic layout extracted from the Books Page.
 *
 * Props:
 * - nav: ReactNode
 * - heading: ReactNode
 * - sidebar: ReactNode
 * - content: ReactNode
 */
function BooksPageLayout({ nav = null, heading = null, sidebar = null, content = null }) {
	return (
		<>
			{nav}
			{heading && <div className="Books-Page-Layout-Heading-Container">{heading}</div>}
			<main className="Books-Page-Layout-Main-Container">
				<aside className="Books-Page-Layout-Sidebar-Aside">{sidebar}</aside>
				<section className="Books-Page-Layout-Content-Section">{content}</section>
			</main>
		</>
	);
}

export default BooksPageLayout;
