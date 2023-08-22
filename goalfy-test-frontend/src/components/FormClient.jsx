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
	const ref = React.useRef();

	React.useEffect(() => {
		if (clientEdit) {
			const client = ref.current;

			client.name.value = clientEdit.name;
			client.email.value = clientEdit.email;
			client.phone.value = clientEdit.phone;
			client.cnpj.value = clientEdit.cnpj;
			client.address.value = clientEdit.address;
		}
	}, [clientEdit]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const client = ref.current;

		if (!client.name.value || !client.email.value) {
			toast("Preencha todos os campos!", {
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
				toast.error("Erro ao cadastrar cliente!");
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

	return (
		<>
			<FormContainer ref={ref} onSubmit={handleSubmit}>
				<FormControl>
					<Label>Nome do Cliente</Label>
					<Input type="text" name="name" />
				</FormControl>
				<FormControl>
					<Label>Email</Label>
					<Input type="email" name="email" />
				</FormControl>
				<FormControl>
					<Label>Telefone</Label>
					<Input maxLength={15} type="text" name="phone" onKeyUp={phoneMask} />
				</FormControl>
				<FormControl>
					<Label>CNPJ</Label>
					<Input type="text" name="cnpj" />
				</FormControl>
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
