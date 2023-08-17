import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 15px;
`;

const FormControl = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
`;

const Label = styled.label`
	color: #232426;
	font-size: 13px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const Input = styled.input`
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 10px;
	font-size: 14px;
`;

export default class Form extends Component {
	constructor(props) {
		super(props);
		this.clientData = props.clientData || {};
	}
	/**
	 * Função que manipula o formulário de cadastro de clientes
	 *
	 * @author Caio Busarello Dutra
	 * @version 1.0.0
	 * @param {Event} e Evento de mudança de valor do input
	 * @returns {void}
	 */
	handleForm = (e) => {
		let formData = { ...this.state };
		formData[e.target.name] = e.target.value;
		this.setState({ ...formData });
	};

	/**
	 * Função que aplica a máscara de telefone no input
	 *
	 * @author Caio Busarello Dutra
	 * @version 1.0.0
	 * @param {Event} e Evento de mudança de valor do input
	 * @returns {void}
	 */
	phoneMask = (e) => {
		let phone = e.target.value;
		phone = phone.replace(/\D/g, "");
		phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
		phone = phone.replace(/(\d)(\d{4})$/, "$1-$2");
		e.target.value = phone;
	};

	render() {
		return (
			<FormContainer>
				<FormControl>
					<Label>Nome do Cliente</Label>
					<Input type="text" name="name" onChange={this.handleForm} />
				</FormControl>
				<FormControl>
					<Label>Email</Label>
					<Input type="email" name="email" onChange={this.handleForm} />
				</FormControl>
				<FormControl>
					<Label>Telefone</Label>
					<Input
						maxLength={15}
						type="text"
						name="phone"
						onChange={this.handleForm}
						onKeyUp={this.phoneMask}
					/>
				</FormControl>
				<FormControl>
					<Label>CNPJ</Label>
					<Input type="text" name="cnpj" onChange={this.handleForm} />
				</FormControl>
				<FormControl>
					<Label>Endereço</Label>
					<Input type="text" name="address" onChange={this.handleForm} />
				</FormControl>
			</FormContainer>
		);
	}

	static propTypes = {
		projectData: PropTypes.object,
	};
}
