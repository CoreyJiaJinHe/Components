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
			{heading && <div className="ui-books-layout__heading">{heading}</div>}
			<main className="ui-books-layout">
				<aside className="ui-books-layout__sidebar">{sidebar}</aside>
				<section className="ui-books-layout__content">{content}</section>
			</main>
		</>
	);
}

export default BooksPageLayout;
