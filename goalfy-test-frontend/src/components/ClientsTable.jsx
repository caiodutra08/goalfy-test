import PropTypes from "prop-types";
import React from "react";
import { BsPen, BsTrashFill } from "react-icons/bs";
import styled from "styled-components";
import axios from "axios";

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

const Thead = styled.thead`
	background-color: #232426;
	color: #fff;
`;

const Tr = styled.tr`
	text-align: left;
`;

const Th = styled.th`
	padding: 10px;
`;

const Tbody = styled.tbody`
	background-color: #fff;

	&:hover ${Tr} {
		background-color: #e9d9ff;
	}
`;

const Td = styled.td`
	padding: 10px;
`;

const Button = styled.button`
	color: #fff;
	border: none;
	border-radius: 4px;
	padding: 6px 24px;
	font-size: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	&.client__edit {
		background-color: #7f23f7;
	}

	&.client__delete {
		background-color: #f72323;
	}
`;

const ClientsTable = ({ clientData, setClientData, setEdit }) => {
	
	/**
	 * Função que edita um cliente
	 * 
	 * @autor Caio Busarello Dutra
	 * @version 1.0.0
	 * @param {Object} client Objeto com os dados do cliente
	 * @returns {void}
	 */
	const handleEditClient = (client) => {
		setEdit(client)
	}

	/**
	 * Função que deleta um cliente
	 *
	 * @author Caio Busarello Dutra
	 * @version 1.0.0
	 * @param {Event} e Evento de mudança de valor do input
	 * @returns {void}
	 */
	const handleDeleteClient = async (id) => {
		await axios
			.delete(`http://localhost:8000/deleteclient/${id}`)
			.then(({ data }) => {
				const newClientData = clientData.filter((client) => client.id !== id);
				setClientData(newClientData);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<Table>
			<Thead>
				<Tr>
					<Th>Nome</Th>
					<Th>Email</Th>
					<Th>Telefone</Th>
					<Th>CNPJ</Th>
					<Th>Endereço</Th>
					<Th align="center" colSpan="2">
						Ações
					</Th>
				</Tr>
			</Thead>
			<Tbody>
				{clientData.map((client) => (
					<Tr key={client.id}>
						<Td>{client.name}</Td>
						<Td>{client.email}</Td>
						<Td>{client.phone}</Td>
						<Td>{client.cnpj}</Td>
						<Td>{client.address}</Td>
						<Td align="center">
							<Button className="client__edit" onClick={() => handleEditClient(client)}>
								Editar
								<BsPen />
							</Button>
						</Td>
						<Td align="center">
							<Button
								className="client__delete"
								onClick={() => handleDeleteClient(client.id)}
							>
								Excluir
								<BsTrashFill />
							</Button>
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};

export default ClientsTable;
