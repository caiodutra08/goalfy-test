import React, { useState, useEffect } from "react";
import Form from "./Form";
import { Modal } from "./Modal";
import styled from "styled-components";
import Clients from "./Clients";
import axios from "axios";
import { BsPlus, BsBoxArrowUpRight } from "react-icons/bs";

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

	useEffect(() => {
		async function getClients() {
			try {
				axios.get("http://localhost:8000/clients").then((response) => {
					setClientData(response.data);
					console.log(response.data);
				});
			} catch (error) {
				console.error(error);
			}
		}

		getClients();
	}, [setClientData]);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			{isOpen && (
				<Modal.Root>
					<Modal.Header>
						<Modal.Title>
							<BsBoxArrowUpRight />
							Novo Registro
						</Modal.Title>
						<Modal.Action onClick={handleCloseModal} title="close" className="btnClose">
							<BsPlus />
						</Modal.Action>
					</Modal.Header>
					<Modal.Content>
						<Form />
					</Modal.Content>
					<Modal.Actions>
						<Modal.Action onClick={handleCloseModal} className="btnCadastrar">
							Cadastrar
						</Modal.Action>
					</Modal.Actions>
				</Modal.Root>
			)}
			<Container>
				<Topbar>
					<Button onClick={handleOpenModal}>Novo Registro</Button>
				</Topbar>
				<Clients clientData={clientData} />
			</Container>
		</>
	);
};

export default ClientsContainer;
