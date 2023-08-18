import React from "react";
import styles from "./ModalTitle.module.css";

export const ModalTitle = ({ children }) => {
	return (
		<>
			<h1 className={styles.modal__title}>{children}</h1>
		</>
	);
};
