import React from "react";
import "./UserPageLayout.css";
import DisintegrationCard from "./DisintegrationCard.jsx";

const defaultContent = (
	<div>
		<p>There was supposed to be content here./.</p>
	</div>
);

const defaultModal = (
	<div className="User-Page-Modal-Default">
		I am a little bar in the bottom right!
	</div>
);

/**
 * Generic layout extracted from the User Page.
 *
 * Props:
 * - nav: ReactNode
 * - content: ReactNode
 * - modal: ReactNode
 * - enableBurnable: boolean (default false)
 */
function UserPageLayout({ nav = null, content = defaultContent, modal = defaultModal, enableBurnable = false }) {
	const renderedContent = enableBurnable
		? <DisintegrationCard>{content}</DisintegrationCard>
		: content;

	return (
		<>
			{nav}
			<div className="User-Page-Layout-Container">
				<div className="User-Page-Layout-Panel">
					{renderedContent}
				</div>
			</div>
			{modal}
		</>
	);
}

export default UserPageLayout;
