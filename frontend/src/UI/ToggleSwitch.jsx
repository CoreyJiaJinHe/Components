import React from "react";
import "./ToggleSwitch.css";

/**
 * Generic slider-style toggle switch.
 *
 * Props:
 * - label (string | ReactNode)
 * - checked (boolean)
 * - onCheckedChange (function(boolean))
 * - ariaLabel (string)
 * - disabled (boolean)
 */
function ToggleSwitch({
	label,
	checked,
	onCheckedChange,
	ariaLabel = "Toggle",
	disabled = false,
}) {
	function handleChange(event) {
		if (disabled) return;
		onCheckedChange?.(event.target.checked);
	}

	return (
		<label className={disabled ? "ui-toggle ui-toggle--disabled" : "ui-toggle"}>
			{label !== undefined && label !== null && (
				<span className="ui-toggle__label">{label}</span>
			)}
			<span className="ui-toggle__switch">
				<input
					type="checkbox"
					role="switch"
					aria-label={ariaLabel}
					checked={Boolean(checked)}
					disabled={disabled}
					onChange={handleChange}
				/>
				<span className="ui-toggle__slider" aria-hidden="true" />
			</span>
		</label>
	);
}

export default ToggleSwitch;
