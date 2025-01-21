import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import RollingSuggestions from "../RollingSuggestions/RollingSuggestions";
import styles from "./TopicInput.module.css";
import topics from "./topics";

export default function TopicInput({
	onSubmit,
	isLoading = false,
}: {
	onSubmit: (topic: string) => void;
	isLoading?: boolean;
}) {
	const [formWidth, setFormWidth] = useState(0);
	const [textBoxWidth, setTextBoxWidth] = useState(0);
	const [topic, setTopic] = useState("");
	const formRef = useRef<HTMLFormElement>(null);
	const [isInitialized, setIsInitialized] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (topic.trim()) {
			onSubmit(topic.trim());
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: Needs form ref
	useEffect(() => {
		if (formRef.current) {
			setFormWidth(formRef.current.clientWidth);
			setTextBoxWidth(formRef.current.clientWidth);
		}
	}, [formRef]);

	useEffect(() => {
		if (isLoading) {
			setTextBoxWidth(100);
		}
		if (!isLoading) {
			setTextBoxWidth(formWidth);
		}
	}, [isLoading, formWidth]);

	useEffect(() => {
		const initializer = setTimeout(() => {
			setIsInitialized(true);
		}, 500);
		return () => clearTimeout(initializer);
	}, []);

	const buttonDisabled = isLoading || !topic.trim();

	return (
		<form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
			<div
				className={`${styles.glowRing} ${buttonDisabled ? styles.disabled : ""}`}
			>
				<div className={styles.swirlScaler}>
					<div className={styles.swirl} />
					<div className={`${styles.swirl} ${styles.reverse}`} />
				</div>
			</div>
			<LoadingSpinner isLoading={isLoading} />
			<div
				className={`${styles.inputContainer} ${buttonDisabled ? styles.disabled : ""} ${isLoading ? styles.loading : ""}`}
				style={{ width: textBoxWidth }}
			>
				{!isLoading && isInitialized && (
					<RollingSuggestions
						suggestions={topics}
						hidden={!buttonDisabled || isLoading}
					/>
				)}
				<input
					type="text"
					value={topic}
					onChange={(e) => setTopic(e.target.value)}
					// placeholder="Enter a topic or question you want to explore..."
					className={styles.input}
				/>
				<button
					type="submit"
					className={`${styles.submitButton} ${buttonDisabled ? styles.disabled : ""} ${isLoading ? styles.loading : ""}`}
				>
					➜
				</button>
			</div>
		</form>
	);
}
