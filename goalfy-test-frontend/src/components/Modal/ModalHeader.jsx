import React from "react";
import styles from "./ModalHeader.module.css";

export const ModalHeader = ({ children }) => {
	return (
		<>
			<header className={styles.modal__header}>
				<div className={styles.modal__container}>{children}</div>
			</header>
		</>
	);
};
