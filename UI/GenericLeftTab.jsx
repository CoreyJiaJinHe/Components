import React from "react";
import "./GenericLeftTab.css";

function GenericLeftTab({ isLeftBarOpen, setIsLeftBarOpen, nightMode = false }) {
    const barStateClass = isLeftBarOpen ? "Component-Generic-Left-Tab-Open" : "Component-Generic-Left-Tab-Closed";
    const themeClass = nightMode ? "Component-Generic-Left-Tab-Night" : "Component-Generic-Left-Tab-Day";
    const buttonStateClass = isLeftBarOpen ? "Component-Generic-Left-Tab-Toggle-Open" : "Component-Generic-Left-Tab-Toggle-Closed";

    return (
    <>
        <div className={`Component-Generic-Left-Tab-Container ${barStateClass} ${themeClass}`}>
            <button
                type="button"
                aria-label={isLeftBarOpen ? "Close left bar" : "Open left bar"}
                onClick={() => setIsLeftBarOpen((current) => !current)}
                className={`Component-Generic-Left-Tab-Toggle ${buttonStateClass} ${themeClass}`}
            >
                {isLeftBarOpen ? "×" : "☰"}
            </button>
        </div>
    </>
)
}

export default GenericLeftTab;