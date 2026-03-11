import React from "react";
import "./UserPageLayout.css";

const defaultContent = (
	<div>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		<p>Etiam porta sem malesuada magna mollis euismod.</p>
	</div>
);

const defaultModal = (
	<div
		style={{
			position: "fixed",
			right: "1rem",
			bottom: "1rem",
			padding: "0.75rem",
			background: "#1f2937",
			color: "#fff",
			borderRadius: "10px",
		}}
	>
		Lorem ipsum dolor sit amet.
	</div>
);

/**
 * Generic layout extracted from the User Page.
 *
 * Props:
 * - nav: ReactNode
 * - content: ReactNode
 * - modal: ReactNode
 */
function UserPageLayout({ nav = null, content = defaultContent, modal = defaultModal }) {
	return (
		<>
			{nav}
			<div className="ui-user-layout__container">{content}</div>
			{modal}
		</>
	);
}

export default UserPageLayout;
