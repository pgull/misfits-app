import { useEffect, useState } from "react";
import styles from "./RollingSuggestions.module.css";

export default function RollingSuggestions({
	suggestions,
	hidden,
}: { suggestions: string[]; hidden: boolean }) {
	const animationDuration = 2000;
	const [currentSuggestion, setCurrentSuggestion] = useState<
		undefined | string
	>();

	const randomizeSuggestion = () => {
		setCurrentSuggestion(
			suggestions[Math.floor(Math.random() * suggestions.length)],
		);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: No need to include dependencies here
	useEffect(() => {
		randomizeSuggestion();
		const interval = setInterval(() => {
			randomizeSuggestion();
		}, animationDuration);
		return () => clearInterval(interval);
	}, []);

	if (!currentSuggestion) return;

	return (
		<div className={`${styles.container} ${hidden ? styles.hidden : ""}`}>
			{currentSuggestion && (
				<p
					className={styles.suggestion}
					style={{ animationDuration: `${animationDuration}ms` }}
				>
					{currentSuggestion}
				</p>
			)}
		</div>
	);
}
