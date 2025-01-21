import styles from "./MainTitle.module.css";

export default function MainTitle({ isLoading }: { isLoading: boolean }) {
	return (
		<div
			className={`stack y-1 ${styles.title} ${isLoading ? styles.loading : ""}`}
		>
			<h1>Topic browser</h1>
			<p>Enter a topic you want to explore.</p>
		</div>
	);
}
