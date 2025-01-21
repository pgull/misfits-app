import { useEffect, useState } from "react";
import styles from "./RollingSuggestions.module.css";

export default function RollingSuggestions({
	suggestions,
	hidden,
}: { suggestions: string[]; hidden: boolean }) {
	const animationDuration = 2000;
	const [currentSuggestion, setCurrentSuggestion] = useState<string | undefined>();
	const [isInitialized, setIsInitialized] = useState(false);

	const randomizeSuggestion = () => {
		const newSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
		setCurrentSuggestion(newSuggestion);
	};

	useEffect(() => {
		const initTimer = setTimeout(() => {
			randomizeSuggestion();
			setIsInitialized(true);
		}, 100);
		return () => clearTimeout(initTimer);
	}, []);

	useEffect(() => {
		if (!isInitialized) return;

		const interval = setInterval(randomizeSuggestion, animationDuration);
		return () => clearInterval(interval);
	}, [isInitialized]);

	if (!currentSuggestion) return null;

	return (
		<div className={`${styles.container} ${hidden ? styles.hidden : ""}`}>
			<p
				className={styles.suggestion}
				style={{ animationDuration: `${animationDuration}ms` }}
			>
				{currentSuggestion}
			</p>
		</div>
	);
}
