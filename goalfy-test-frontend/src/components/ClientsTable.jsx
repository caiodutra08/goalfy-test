import React from "react";
import { BsAt, BsCardList, BsCursorText, BsPen, BsTelephone, BsTrashFill } from "react-icons/bs";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	border: 1px solid #e8e8e8;
`;

const Thead = styled.thead`
	background-color: #fff;
	color: #666d73;
	border: 1px solid #e8e8e8;
`;

const Tr = styled.tr`
	text-align: left;
`;

const Th = styled.th`
	padding: 16px;
	font-size: 14px;
	font-weight: 500;
`;

const Span = styled.span`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const Tbody = styled.tbody`
	background-color: #fff;

	//when hover the tr change the background color that the mouse is over
	tr:hover {
		background-color: #e9d9ff;
	}
`;

const Td = styled.td`
	padding: 16px;
	font-size: 14px;
	color: #363e40;
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

const ClientsTable = ({ clientData, setClientData, setEdit, handleOpenModal }) => {
	/**
	 * Função que edita um cliente
	 *
	 * @autor Caio Busarello Dutra
	 * @version 1.0.0
	 * @param {Object} client Objeto com os dados do cliente
	 * @returns {void}
	 */
	const handleEditClient = (client) => {
		setEdit(client);
		handleOpenModal(client);
	};

	/**
	 * Função que deleta um cliente
	 *
	 * @author Caio Busarello Dutra
	 * @version 1.0.0
	 * @param {Event} e Evento de mudança de valor do input
	 * @returns {void}
	 */
	const handleDeleteClient = async (id) => {
		try {
			await axios.delete(`http://localhost:8000/deleteclient/${id}`).then(({ data }) => {
				const newClientData = clientData.filter((client) => client.id !== id);
				setClientData(newClientData);
				toast.success(`${data}`, {
					position: "top-right",
					type: "success",
				});
			});
		} catch (error) {
			toast.error("Erro ao deletar cliente!", {
				position: "top-right",
				type: "error",
			});
		}
	};

	return (
		<>
			<Table>
				<Thead>
					<Tr>
						<Th>
							<Span>
								<BsCursorText />
								Nome
							</Span>
						</Th>
						<Th>
							<Span>
								<BsAt />
								Email
							</Span>
						</Th>
						<Th>
							<Span>
								<BsTelephone />
								Telefone
							</Span>
						</Th>
						<Th>
							<Span>
								<BsCardList />
								CNPJ
							</Span>
						</Th>
						<Th>
							<Span>
								<BsCursorText />
								Endereço
							</Span>
						</Th>
						<Th align="center" colSpan="2">
							Ações
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{clientData.length > 0 ? (
						clientData.map((client) => (
							<Tr key={client.id}>
								<Td>{client.name}</Td>
								<Td>{client.email}</Td>
								<Td>{client.phone}</Td>
								<Td>{client.cnpj}</Td>
								<Td>{client.address}</Td>
								<Td align="center">
									<Button
										className="client__edit"
										onClick={() => handleEditClient(client)}
									>
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
						))
					) : (
						<Tr>
							<Td colSpan="7" align="center">
								Nenhum cliente cadastrado!
							</Td>
						</Tr>
					)}
				</Tbody>
			</Table>
		</>
	);
};

export default ClientsTable;
