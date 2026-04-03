import React from "react";
import "./UserPageLayout.css";

/**
 * Generic layout extracted from the User Page.
 *
 * Props:
 * - nav: ReactNode
 * - content: ReactNode
 * - modal: ReactNode
 */
function UserPageLayout({ nav = null, content = null, modal = null }) {
	return (
		<>
			{nav}
			<div className="User-Page-Layout-Container">{content}</div>
			{modal}
		</>
	);
}

export default UserPageLayout;
