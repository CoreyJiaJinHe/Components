import React, { useEffect, useMemo, useState } from "react";
import "./DisintegrationCard.css";

const BASE_EFFECTS = {
	dust: {
		label: "Dust Snap",
		durationMs: 980,
		particleCount: 44,
	},
	fire: {
		label: "Fire Consume",
		durationMs: 1280,
		particleCount: 34,
	},
};

function buildParticles(mode, count, myDurationMs = 2000) {
	return Array.from({ length: count }, (_, index) => {
		const left = 6 + Math.random() * 88;
		const duration = mode === "my"
			? (myDurationMs / 1000) * (0.45 + Math.random() * 0.4)
			: 0.6 + Math.random() * 0.8;
		const delay = Math.random() * 0.35;
		const size = mode === "dust" ? 4 + Math.random() * 7 : mode === "my" ? 5 + Math.random() * 7 : 6 + Math.random() * 9;
		const x = (Math.random() - 0.5) * (mode === "dust" ? 120 : mode === "my" ? 150 : 220);
		const y = mode === "dust" ? -(40 + Math.random() * 70) : mode === "my" ? -(55 + Math.random() * 95) : -(90 + Math.random() * 180);

		let hue;
		let sat;
		let light;
		let alpha;

		if (mode === "my") {
			const emberParticle = Math.random() < 0.5;
			if (emberParticle) {
				hue = 16 + Math.random() * 14;
				sat = 74 + Math.random() * 20;
				light = 50 + Math.random() * 18;
				alpha = 0.56 + Math.random() * 0.28;
			} else {
				hue = 215 + Math.random() * 14;
				sat = 6 + Math.random() * 11;
				light = 56 + Math.random() * 20;
				alpha = 0.32 + Math.random() * 0.24;
			}
		} else if (mode === "dust") {
			hue = 38 + Math.random() * 16;
			sat = 16 + Math.random() * 20;
			light = 52 + Math.random() * 20;
			alpha = 0.45 + Math.random() * 0.28;
		} else {
			hue = 14 + Math.random() * 18;
			sat = 80 + Math.random() * 18;
			light = 52 + Math.random() * 18;
			alpha = 0.58 + Math.random() * 0.35;
		}

		const top = mode === "my" ? 86 : 76;

		return {
			id: `${mode}-${index}-${Date.now()}`,
			style: {
				"--dis-p-left": `${left.toFixed(2)}%`,
				"--dis-p-top": `${top}%`,
				"--dis-p-x": `${x.toFixed(2)}px`,
				"--dis-p-y": `${y.toFixed(2)}px`,
				"--dis-p-delay": `${delay.toFixed(2)}s`,
				"--dis-p-duration": `${duration.toFixed(2)}s`,
				"--dis-p-size": `${size.toFixed(2)}px`,
				"--dis-p-color": `hsla(${hue.toFixed(0)}, ${sat.toFixed(0)}%, ${light.toFixed(0)}%, ${alpha.toFixed(2)})`,
			},
		};
	});
}

function DisintegrationCard({ children, myVersionDurationMs = 2000 }) {
	const [phase, setPhase] = useState("idle");
	const [effect, setEffect] = useState(null);
	const [particles, setParticles] = useState([]);
	const safeMyDurationMs = Math.max(200, Number(myVersionDurationMs) || 2000);

	const effects = useMemo(() => {
		return {
			...BASE_EFFECTS,
			my: {
				label: "My Version",
				durationMs: safeMyDurationMs,
				particleCount: 52,
			},
		};
	}, [safeMyDurationMs]);

	const activeDuration = useMemo(() => {
		if (!effect) return 0;
		return effects[effect].durationMs;
	}, [effect, effects]);

	useEffect(() => {
		if (phase !== "animating" || !effect) return undefined;
		const timerId = window.setTimeout(() => setPhase("burned"), activeDuration);
		return () => window.clearTimeout(timerId);
	}, [phase, effect, activeDuration]);

	function triggerEffect(mode) {
		if (!effects[mode] || phase === "animating") return;
		setEffect(mode);
		setParticles(buildParticles(mode, effects[mode].particleCount, safeMyDurationMs));
		setPhase("animating");
	}

	function restoreCard() {
		setPhase("idle");
		setEffect(null);
		setParticles([]);
	}

	const modeClass = effect ? `Component-Disintegration-Card-Mode-${effect}` : "";
	const phaseClass = `Component-Disintegration-Card-State-${phase}`;

	return (
		<div className="Component-Disintegration-Card-Wrapper">
			<div
				className={`Component-Disintegration-Card-Container ${modeClass} ${phaseClass}`}
				style={{ "--my-dis-duration": `${safeMyDurationMs}ms` }}
			>
				<div className="Component-Disintegration-Card-Content">{children}</div>

				{phase !== "idle" && <div className="Component-Disintegration-Card-Overlay" aria-hidden="true" />}

				{phase === "animating" && (
					<div className="Component-Disintegration-Card-Particles-Container" aria-hidden="true">
						{particles.map((particle) => (
							<span
								key={particle.id}
								className="Component-Disintegration-Card-Particle"
								style={particle.style}
							/>
						))}
					</div>
				)}
			</div>

			<div className="Component-Disintegration-Card-Controls">
				<button
					type="button"
					className="Component-Disintegration-Card-Button Component-Disintegration-Card-Button-Dust"
					onClick={() => triggerEffect("dust")}
					disabled={phase === "animating"}
				>
					{effects.dust.label}
				</button>
				<button
					type="button"
					className="Component-Disintegration-Card-Button Component-Disintegration-Card-Button-Fire"
					onClick={() => triggerEffect("fire")}
					disabled={phase === "animating"}
				>
					{effects.fire.label}
				</button>
				<button
					type="button"
					className="Component-Disintegration-Card-Button Component-Disintegration-Card-Button-My"
					onClick={() => triggerEffect("my")}
					disabled={phase === "animating"}
				>
					{effects.my.label}
				</button>
				{phase !== "idle" && (
					<button
						type="button"
						className="Component-Disintegration-Card-Button Component-Disintegration-Card-Button-Restore"
						onClick={restoreCard}
						disabled={phase === "animating"}
					>
						Restore
					</button>
				)}
			</div>
		</div>
	);
}

export default DisintegrationCard;
