import React, { useEffect, useMemo, useState } from "react";
import "./GenericNavbar.css";

/**
 * Generic navigation bar.
 *
 * This is a sanitized, project-agnostic replacement for app-specific NavBar.
 * It intentionally does not depend on router/user context.
 *
 * Props:
 * - leftLinks / centerLinks / rightLinks: Array<{ key?, label, href?, onClick? }>
 * - rightContent: ReactNode (e.g., buttons, profile menu)
 * - renderLink: function(link, className) => ReactNode
 * - mobileBreakpoint: number (px)
 */
function GenericNavbar({
	leftLinks = [],
	centerLinks = [],
	rightLinks = [],
	rightContent = null,
	renderLink,
	mobileBreakpoint = 600,
}) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		function handleResize() {
			setIsMobile(window.innerWidth <= mobileBreakpoint);
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [mobileBreakpoint]);

	const defaultRenderLink = useMemo(() => {
		return function defaultRenderLinkInternal(link, className) {
			const href = link?.href || "#";
			return (
				<a
					className={className}
					href={href}
					onClick={link?.onClick}
				>
					{link?.label}
				</a>
			);
		};
	}, []);

	const renderLinkFn = renderLink || defaultRenderLink;

	function renderLinks(links) {
		return (links || []).map((link, index) => {
			const key = link?.key ?? link?.href ?? link?.label ?? index;
			return <li key={key}>{renderLinkFn(link, "ui-navbar__link")}</li>;
		});
	}

	return (
		<nav className={isMobile ? "ui-navbar ui-navbar--mobile" : "ui-navbar ui-navbar--desktop"}>
			<div className="ui-navbar__left">
				<ul className="ui-navbar__links">{renderLinks(leftLinks)}</ul>
			</div>
			<div className="ui-navbar__center">
				<ul className="ui-navbar__links">{renderLinks(centerLinks)}</ul>
			</div>
			<div className="ui-navbar__right">
				<ul className="ui-navbar__links">{renderLinks(rightLinks)}</ul>
				{rightContent}
			</div>
		</nav>
	);
}

export default GenericNavbar;
