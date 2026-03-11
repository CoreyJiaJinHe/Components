import React from "react";
import "./BooksPageLayout.css";

const defaultHeading = <h1>Books Layout</h1>;

const defaultSidebar = (
	<div>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		<p>Vestibulum id ligula porta felis euismod semper.</p>
	</div>
);

const defaultContent = (
	<div>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		<p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.</p>
	</div>
);

/**
 * Generic layout extracted from the Books Page.
 *
 * Props:
 * - nav: ReactNode
 * - heading: ReactNode
 * - sidebar: ReactNode
 * - content: ReactNode
 */
function BooksPageLayout({ nav = null, heading = defaultHeading, sidebar = defaultSidebar, content = defaultContent }) {
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
