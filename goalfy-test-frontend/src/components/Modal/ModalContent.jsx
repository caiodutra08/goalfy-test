import React from "react";
import styles from "./ModalContent.module.css";

export const ModalContent = ({ children }) => {
	return (
		<>
			<div className={styles.modal__content}>{children}</div>
		</>
	);
};
