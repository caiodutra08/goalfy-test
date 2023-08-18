import React from "react";
import styles from "./ModalActions.module.css";

export const ModalActions = ({ children }) => {
	return (
		<>
			<footer className={styles.modal__footer}>{children}</footer>
		</>
	);
};
