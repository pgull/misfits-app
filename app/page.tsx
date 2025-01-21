"use client";

import { useState } from "react";
import MainTitle from "./components/MainTitle/MainTitle";
import ResponseView from "./components/ResponseView/ResponseView";
import TopicInput from "./components/TopicInput/TopicInput";
import { useAIResponse } from "./hooks/useAIResponse";
import styles from "./page.module.css";

export default function Home() {
	const { data, error, isLoading, fetchResponse } = useAIResponse();
	const [showResponse, setShowResponse] = useState(false);

	const handleSubmit = async (topic: string) => {
		await fetchResponse(topic);
		setShowResponse(true);
	};

	const handleBack = () => {
		setShowResponse(false);
	};

	return (
		<main className={styles.main}>
			{!showResponse && (
				<div className={styles.centerInput}>
					<div className={`stack y-7 ${styles.mainContainer}`}>
						<MainTitle isLoading={isLoading} />
						<TopicInput onSubmit={handleSubmit} isLoading={isLoading} />
						{error && <div className={styles.error}>{error}</div>}
					</div>
				</div>
			)}
			{showResponse && data && (
				<ResponseView response={data} onBack={handleBack} />
			)}
		</main>
	);
}
