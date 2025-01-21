import React, { useState } from "react";
import type { Section, StructuredResponse } from "../../types/schemas";
import styles from "./ResponseView.module.css";

export default function ResponseView({
	response,
	onBack,
}: {
	response: StructuredResponse;
	onBack: () => void;
}) {
	const animationDelay = 0.2;
	const [expandedSections, setExpandedSections] = useState<Set<number>>(
		new Set([]),
	);

	const toggleSection = (index: number) => {
		const newExpanded = new Set(expandedSections);
		if (newExpanded.has(index)) {
			newExpanded.delete(index);
		} else {
			newExpanded.add(index);
		}
		setExpandedSections(newExpanded);
	};

	return (
		<div className={styles.container}>
			<button type="button" className={styles.backButton} onClick={onBack}>
				←
			</button>

			<div className="stack y-3">
				<h1
					className={styles.topic}
					style={{ animationDelay: `${animationDelay}s` }}
				>
					{response.topic}
				</h1>
				<p
					className={styles.summary}
					style={{ animationDelay: `${animationDelay + 0.1}s` }}
				>
					{response.summary}
				</p>
			</div>
			<div className={styles.sections}>
				{response.sections.map((section, index) => (
					<button
						key={`${section.title}`}
						type="button"
						onClick={() => toggleSection(index)}
						className={`${styles.section} ${expandedSections.has(index) ? styles.expanded : ""}`}
						style={{
							backgroundColor: section.backgroundColor,
							color: section.textColor,
							animationDelay: `${animationDelay + 0.2 + index * 0.1}s`,
						}}
					>
						<h2 className={styles.title}>{section.title}</h2>

						{expandedSections.has(index) && (
							<div className={styles.sectionContent}>
								<span
									className={styles.sectionContentText}
									style={{ color: section.textColor }}
								>
									{section.content}
								</span>
								{section.metadata && (
									<div
										className={styles.metadata}
										style={{ borderColor: section.textColor }}
									>
										<span className={styles.complexity}>
											{section.metadata.complexity},
										</span>
										{section.metadata?.tags.map((tag, index) => (
											<span key={tag} className={styles.tag}>
												{tag}
												{index < (section.metadata?.tags.length ?? 0) - 1
													? ","
													: ""}
											</span>
										))}
									</div>
								)}
							</div>
						)}
					</button>
				))}
			</div>

			{response.references && response.references.length > 0 && (
				<div
					className={styles.references}
					style={{
						animationDelay: `${animationDelay + 0.2 + response.sections.length * 0.1}s`,
					}}
				>
					<h3>References</h3>
					<div className="stack y-1">
						{response.references.map((ref, index) => (
							<div key={ref}>{ref}</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
