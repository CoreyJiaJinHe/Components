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
		<label className={disabled ? "Component-Toggle-Switch-Container Component-Toggle-Switch-Disabled" : "Component-Toggle-Switch-Container"}>
			{label !== undefined && label !== null && (
				<span className="Component-Toggle-Switch-Label">{label}</span>
			)}
			<span className="Component-Toggle-Switch-Track-Wrapper">
				<input
					type="checkbox"
					role="switch"
					aria-label={ariaLabel}
					checked={Boolean(checked)}
					disabled={disabled}
					onChange={handleChange}
				/>
				<span className="Component-Toggle-Switch-Slider" aria-hidden="true" />
			</span>
		</label>
	);
}

export default ToggleSwitch;
