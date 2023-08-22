import React, { useState, useEffect } from "react";
import ModalClient from "./Modals/ModalClient";
import styled from "styled-components";
import ClientsTable from "./ClientsTable";
import axios from "axios";
import { BsPlusCircle, BsSearch } from "react-icons/bs";

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
	gap: 8px;
`;

const H3 = styled.h3`
	color: #949fa6;
	font-size: 12px;
	font-weight: 500;
`;

const Search = styled.div`
	padding: 0.5rem;
	position: relative;
	display: flex;
	align-items: center;
	background-color: #f2f2f2;

	svg {
		color: #949fa6;
	}
`;

const SearchBar = styled.input`
	padding: 8px 8px 8px 28px;
	background-color: #f2f2f2;
	border: 1px solid #e8e8e8;
	border-radius: 4px;

	::placeholder {
		color: #949fa6;
	}
`;

const ClientsContainer = () => {
	const [clientData, setClientData] = useState([]);
	const [isOpenClientModal, setIsOpenClientModal] = useState(false);
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

	const handleOpenClientModal = (client = null) => {
		setIsOpenClientModal(true);
		setEdit(client);
	};

	const handleCloseClientModal = () => {
		setIsOpenClientModal(false);
	};

	return (
		<>
			{isOpenClientModal && (
				<ModalClient
					handleCloseModal={handleCloseClientModal}
					title={edit === null ? "Novo Cliente" : "Editar Cliente"}
					btnTitle={edit === null ? "Cadastrar" : "Editar"}
					client={edit}
					setEdit={setEdit}
					getClients={getClients}
				/>
			)}
			<Container>
				<Topbar>
					<Button onClick={() => handleOpenClientModal()}>
						<BsPlusCircle />
						Novo Registro
					</Button>
					<Search>
						<BsSearch style={{ marginLeft: "8px", position: "absolute" }} />
						<SearchBar
							id="search-bar"
							type="text"
							placeholder="Pesquisar..."
						></SearchBar>
					</Search>
					<H3>{`${clientData.length} Registros`}</H3>
				</Topbar>
				<ClientsTable
					clientData={clientData}
					setClientData={setClientData}
					setEdit={setEdit}
					handleOpenModal={handleOpenClientModal}
				/>
			</Container>
		</>
	);
};

export default ClientsContainer;
