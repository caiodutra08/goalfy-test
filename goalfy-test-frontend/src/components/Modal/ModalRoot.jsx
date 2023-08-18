import React from "react";
import styles from "./ModalRoot.module.css";

export const ModalRoot = ({ children }) => {
	return (
		<>
			<div className={styles.modal}>
				<div className={styles.modal__container}>
					<div className={styles.modal__content}>{children}</div>
				</div>
			</div>
		</>
	);
};
