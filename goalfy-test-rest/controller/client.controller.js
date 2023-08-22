import { ClientService } from "../services/client.service.js";
import { db } from "../repositories/connection.js";

export const ClientController = {};

ClientController.handleGetClients = async (_, res) => {
	try {
		const clients = await ClientService.getClients();
		return res.status(200).json(clients);
	} catch (e) {
		console.log("Ocorreu um erro no ClientController.getClients: ", e);
		return res.status(400).json(e);
	}
};

ClientController.handleInsertClient = async (_, res) => {
	try {
		const client = await ClientService.countIfPhoneIsInUse();
		console.log("client: ", client);
		return res.status(200).json(client);
	} catch (e) {
		console.log("Ocorreu um erro no ClientController.getClients: ", e);
		return res.status(400).json(e);
	}
};

/**
 * Função que retorna a quantidade de clientes totais do banco de dados MySQL
 *
 * @author Caio Busarello Dutra
 * @version 1.0.0
 * @returns {object} - Retorna um objeto com a quantidade de clientes totais do banco de dados
 */
ClientController.getQuantityClients = (_, res) => {
	const q = "SELECT count(*) as quantity FROM clients";

	db.query(q, (err, data) => {
		if (err) return res.json(err);

		return res.status(200).json(data);
	});
};

/**
 * Função que cadastra um novo cliente no banco de dados MySQL
 *
 * @autor Caio Busarello Dutra
 * @version 1.0.0
 * @param {object} req - Requisição do cliente
 * @param {object} res - Resposta do servidor
 * @returns {object} - Retorna um objeto com o cliente cadastrado
 */
ClientController.postClient = (req, res) => {
	const q =
		"INSERT INTO clients(`name`, `email`, `phone`, `cnpj`, `address`) VALUES (?, ?, ?, ?, ?)";
	const { name, email, phone, cnpj, address, cep } = req.body;
	// add cep to address if cep is not null
	if (cep) {
		address += `; ${cep}`;
	}

	db.query(q, [name, email, phone, cnpj, address], (err, data) => {
		if (err) return res.json(err);

		return res.status(200).json(data);
	});
};

/**
 * Função que edita um cliente no banco de dados MySQL
 *
 * @autor Caio Busarello Dutra
 * @version 1.0.0
 * @param {object} req - Requisição do cliente
 * @param {object} res - Resposta do servidor
 * @returns {object} - Retorna um objeto com o cliente editado
 */
ClientController.editClient = (req, res) => {
	const q =
		"UPDATE clients SET name = ?, email = ?, phone = ?, cnpj = ?, address = ? WHERE id = ?";
	const { name, email, phone, cnpj, address, id } = req.body;

	db.query(q, [name, email, phone, cnpj, address, id], (err, data) => {
		if (err) return res.json(err);

		return res.status(200).json(data);
	});
};

/**
 * Função que deleta um cliente no banco de dados MySQL
 *
 * @autor Caio Busarello Dutra
 * @version 1.0.0
 * @param {object} req - Requisição do cliente
 * @param {object} res - Resposta do servidor
 * @returns {object} - Retorna um objeto com o cliente deletado
 */
ClientController.deleteClient = (req, res) => {
	const q = "DELETE FROM clients WHERE `id` = ?";

	db.query(q, [req.params.id], (err) => {
		if (err) return res.json(err);

		return res.status(200).json("Usuário deletado com sucesso.");
	});
};
