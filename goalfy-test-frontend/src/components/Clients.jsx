import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";

const Table = styled.table`
	width: 100%;
	max-width: 1300px;
	margin: 0 auto;
	padding: 0 15px;
`;

const Thead = styled.thead`
	background-color: #232426;
	color: #fff;
`;

const Tr = styled.tr`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Th = styled.th`
	padding: 10px;
`;

const Tbody = styled.tbody`
	background-color: #fff;
`;

const Td = styled.td`
	padding: 10px;
`;

export default class Clients extends Component {
	static propTypes = {
		clientData: PropTypes.array.isRequired,
	};

	render() {
		return (
			<Table>
				<Thead>
					<Tr>
						<Th>Nome</Th>
						<Th>Email</Th>
						<Th>Telefone</Th>
						<Th>CNPJ</Th>
						<Th>Endereço</Th>
					</Tr>
				</Thead>
				<Tbody>
					{this.props.clientData.map((client) => (
						<Tr key={client.id}>
							<Td>{client.name}</Td>
							<Td>{client.email}</Td>
							<Td>{client.phone}</Td>
							<Td>{client.cnpj}</Td>
							<Td>{client.address}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		);
	}
}
