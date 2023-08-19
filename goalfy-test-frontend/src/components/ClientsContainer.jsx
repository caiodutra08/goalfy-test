import React, { useState, useEffect } from "react";
import ModalClient from "./Modals/ModalClient";
import styled from "styled-components";
import ClientsTable from "./ClientsTable";
import axios from "axios";

const Container = styled.div`
	max-width: 1300px;
	margin: 0 auto;
`;

const Topbar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	gap: 32px;
	padding: 15px 0;
`;

const Button = styled.button`
	background-color: #7f23f7;
	color: #fff;
	border: none;
	border-radius: 4px;
	padding: 6px 24px;
	font-size: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const ClientsContainer = () => {
	const [clientData, setClientData] = useState([]);
	const [isOpen, setIsOpen] = useState(true);
	const [edit, setEdit] = useState(null);

	const getClients = async () => {
		try {
			const response = await axios.get("http://localhost:8000/clients");
			setClientData(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getClients();
	}, [setClientData]);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	/**
	 * Função que cadastra um novo cliente
	 *
	 * @author Caio Busarello Dutra
	 * @version 1.0.0
	 * @param {Event} e Evento de mudança de valor do input
	 * @returns {void}
	 */
	const handleNewClient = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		axios
			.post("http://localhost:8000/newclient", data)
			.then((response) => {})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			{isOpen && (
				<ModalClient
					handleClient={handleNewClient}
					handleCloseModal={handleCloseModal}
					title={edit === null ? "Novo Cliente" : "Editar Cliente"}
					btnTitle={edit === null ? "Cadastrar" : "Editar"}
					client={edit}
					setEdit={setEdit}
					getClients={getClients}
				/>
			)}
			<Container>
				<Topbar>
					<Button onClick={handleOpenModal}>Novo Registro</Button>
				</Topbar>
				<ClientsTable
					clientData={clientData}
					setClientData={setClientData}
					setEdit={setEdit}
				/>
			</Container>
		</>
	);
};

export default ClientsContainer;
