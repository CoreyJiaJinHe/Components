import './RightBar.css'
import ToggleSwitch from './ToggleSwitch.jsx';

function RightBar({
    isRightBarOpen,
    setIsRightBarOpen,
    nightMode,
    setNightMode,
    showModal,
    setShowModal,
    enableBurnable,
    setEnableBurnable,
}) {
    return (
        <>
            <div className={`Component-Right-Bar-Container ${isRightBarOpen ? 'Component-Right-Bar-Open' : ''} ${nightMode ? 'Component-Right-Bar-Night-Mode' : 'Component-Right-Bar-Day-Mode'}`}>
                <button className={`Component-Right-Bar-Toggle-Button ${nightMode ? 'Component-Right-Bar-Night-Mode' : 'Component-Right-Bar-Day-Mode'}`}
                    type="button"
                    aria-label={isRightBarOpen ? "Close right bar" : "Open right bar"}
                    onClick={() => setIsRightBarOpen((current) => !current)}
                >
                    {isRightBarOpen ? "\u00d7" : "\u2630"}
                </button>
                <div className="Component-Right-Bar-Toggle-Container">
                    <ToggleSwitch
                        label="User Modal"
                        checked={showModal}
                        onCheckedChange={setShowModal}
                    />
                </div>
                <div className="Component-Right-Bar-Toggle-Container">
                    <ToggleSwitch
                        label="Burnable"
                        checked={enableBurnable}
                        onCheckedChange={setEnableBurnable}
                    />
                </div>
                <div className="Component-Right-Bar-Toggle-Container">
                    <ToggleSwitch
                        label="Night Mode"
                        checked={nightMode}
                        onCheckedChange={setNightMode}
                    />
                </div>
            </div>
        </>
    )
}

export default RightBar