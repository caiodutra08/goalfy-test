import React from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
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

const FormClient = ({ getClients, clientEdit, setEdit, children, handleCloseModal }) => {
	const [knowCEP, setKnowCEP] = React.useState(true);
	const ref = React.useRef();

	React.useEffect(() => {
		if (clientEdit) {
			const client = ref.current;

			client.name.value = clientEdit.name;
			client.email.value = clientEdit.email;
			client.phone.value = clientEdit.phone;
			client.cnpj.value = clientEdit.cnpj;
			client.address.value = clientEdit.address;
			if (clientEdit.cep) {
				client.cep.value = clientEdit.cep;
			}
		}
	}, [clientEdit]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const client = ref.current;

		if (!client.name.value || !client.email.value) {
			toast("Preencha todos os campos obrigatórios!", {
				position: "top-right",
				type: "error",
			});
			return;
		}

		const data = {};
		data.name = client.name.value;
		data.email = client.email.value;
		data.phone = client.phone.value.replace(/\D/g, "");
		data.cnpj = client.cnpj.value;
		data.address = client.address.value;
		// get cep that is in address but after the ;
		if (data.address) {
			const cep = data.address.split(";")[1];
			if (cep) {
				data.cep = cep.replace(/\D/g, "");
			}
		}

		if (clientEdit) {
			try {
				await axios
					.put(`http://localhost:8000/editclient/${clientEdit.id}`, data)
					.then(({ data }) => {
						toast.success("Cliente editado com sucesso!", {
							position: "top-right",
							type: "success",
						});
					});
			} catch (error) {
				toast.error("Erro ao editar cliente!");
			}
		} else {
			try {
				await axios.post("http://localhost:8000/newclient", data).then(({ data }) => {
					toast.success("Cliente cadastrado com sucesso!", {
						position: "top-right",
						type: "success",
					});
				});
			} catch (error) {
			}
		}

		client.name.value = "";
		client.email.value = "";
		client.phone.value = "";
		client.cnpj.value = "";
		client.address.value = "";

		setEdit(null);
		getClients();
		handleCloseModal();
	};

	/**
	 * Função que aplica a máscara de telefone no input
	 *
	 * @author Caio Busarello Dutra
	 * @version 1.0.0
	 * @param {Event} e Evento de mudança de valor do input
	 * @returns {void}
	 */
	const phoneMask = (e) => {
		let phone = e.target.value;
		phone = phone.replace(/\D/g, "");
		phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
		phone = phone.replace(/(\d)(\d{4})$/, "$1-$2");
		e.target.value = phone;
	};

	/**
	 * Função que verifica se o CEP é válido e preenche os campos de endereço
	 * caso o CEP seja válido
	 * @param {Event} e Evento de mudança de valor do input
	 * @returns {void}
	 * @version 1.0.0
	 * @todo Verificar se o CEP é válido
	 * @todo Preencher os campos de endereço
	 * @todo Mostrar mensagem de erro caso o CEP seja inválido
	 * @todo Mostrar mensagem de erro caso o CEP não seja encontrado
	 */
	const checkCEP = async (e) => {
		const cep = e.target.value.replace(/\D/g, "");
		console.log(cep);
	};

	return (
		<>
			<FormContainer ref={ref} onSubmit={handleSubmit}>
				<FormControl>
					<Label>Nome do Cliente *</Label>
					<Input type="text" name="name" required />
				</FormControl>
				<FormControl>
					<Label>Email *</Label>
					<Input type="email" name="email" required />
				</FormControl>
				<FormControl>
					<Label>Telefone</Label>
					<Input maxLength={15} type="text" name="phone" onKeyUp={phoneMask} />
				</FormControl>
				<FormControl>
					<Label>CNPJ</Label>
					<Input type="text" name="cnpj" />
				</FormControl>
				{knowCEP && (
					<FormControl>
						<Label>CEP</Label>
						<Input type="text" name="cep" onBlur={checkCEP} />
					</FormControl>
				)}
				<FormControl>
					<Label>Endereço</Label>
					<Input type="text" name="address" />
				</FormControl>
				{children}
			</FormContainer>
		</>
	);
};

export default FormClient;
