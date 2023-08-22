import React from "react";
import styles from "./ModalAction.module.css";

export const ModalAction = ({ children, className = "", onClick, ...rest }) => {
	return (
		<button onClick={onClick} className={`${styles.modal__btn} ${styles[className]}`} {...rest}>
			{children}
		</button>
	);
};
