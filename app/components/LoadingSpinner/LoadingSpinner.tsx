import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ isLoading }: { isLoading: boolean }) {
	if (!isLoading) return null;
	return (
		<div className={styles.spinnerContainer}>
			<div className={`${styles.spinner} ${isLoading ? styles.loading : ""}`}>
				<div className={styles.spinnerBallContainer}>
					<div className={styles.spinnerBall} />
				</div>
				<div className={styles.spinnerInner} />
			</div>
		</div>
	);
}
