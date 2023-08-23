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

	&.knowCEP {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
	}
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

const Switch = styled.label`
	position: relative;
	display: inline-block;
	width: 48px;
	height: 24px;

	input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 16px;
		width: 16px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #7f23f7;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #7f23f7;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(24px);
		-ms-transform: translateX(24px);
		transform: translateX(24px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
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

	/**
	 * Função que manipula o envio do formulário de cadastro de cliente
	 *
	 * @author Caio Busarello Dutra
	 * @version 1.0.0
	 * @param {Event} e Evento de envio do formulário
	 * @returns {void}
	 */
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
				await axios.put(`/editclient/${clientEdit.id}`, data).then(({ data }) => {
					console.log(data);
					toast.success(`${data}`, {
						position: "top-right",
						type: "success",
					});
				});
			} catch (error) {
				toast.error("Erro ao editar cliente!");
			}
		} else {
			try {
				await axios.post("/newclient", data).then(({ data }) => {
					toast.success(`${data}`, {
						position: "top-right",
						type: "success",
					});
				});
			} catch (error) {}
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
	function phoneMask(e) {
		let phone = e.target.value;
		phone = phone.replace(/\D/g, "");
		phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
		phone = phone.replace(/(\d)(\d{4})$/, "$1-$2");
		e.target.value = phone;
	}

	/**
	 * Função que busca o endereço do cliente pelo CEP
	 * @param {Event} e Evento de mudança de valor do input
	 * @returns {void}
	 * @version 1.0.0
	 */
	const checkCEP = async (e) => {
		if (typeof e.target.value === String) {
			const cep = e.target.value.replace(/\D/g, "");
			axios
				.get(`https://viacep.com.br/ws/${cep}/json/`)
				.then(({ data }) => {
					const client = ref.current;
					client.address.value = `${data.logradouro}; Bairro: ${data.bairro}; Cidade: ${data.localidade}; Estado: ${data.uf}`;
				})
				.catch((error) => {
					toast.error("CEP inválido!");
				});
		}

		return;
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
				<FormControl className="knowCEP">
					<Label>Conhece o CEP?</Label>
					<Switch>
						<input
							type="checkbox"
							name="knowCEP"
							checked={knowCEP}
							onChange={() => setKnowCEP(!knowCEP)}
						/>
						<span className="slider round"></span>
					</Switch>
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
