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
			<div className="ui-user-layout__container">{content}</div>
			{modal}
		</>
	);
}

export default UserPageLayout;
