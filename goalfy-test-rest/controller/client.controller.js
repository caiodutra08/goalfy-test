import { ClientService } from "../services/client.service.js";
import { db } from "../repositories/connection.js";

export const ClientController = {};

/**
 * Método que retorna todos os clientes do banco de dados MySQL
 *
 * @autor Caio Busarello Dutra
 * @version 1.0.0
 * @param {object} res - Resposta do servidor
 * @returns {object} - Retorna um objeto com o cliente cadastrado
 */
ClientController.handleGetClients = async (_, res) => {
	try {
		const clients = await ClientService.getClients();
		return res.status(200).json(clients);
	} catch (e) {
		console.log("Ocorreu um erro no ClientController.getClients: ", e);
		return res.status(400).json(e);
	}
};

/**
 * Método que cadastra um novo cliente no banco de dados MySQL
 *
 * @autor Caio Busarello Dutra
 * @version 1.0.0
 * @param {object} req - Requisição do cliente
 * @param {object} res - Resposta do servidor
 * @returns {Object} - Retorna mensagem de sucesso ou erro
 */
ClientController.handleInsertClient = async (req, res) => {
	try {
		const phoneAlreadyInUse = await ClientService.countIfPhoneIsInUse(req.body.phone);

		if (phoneAlreadyInUse) return res.status(400).json(phoneAlreadyInUse.message);

		const client = await ClientService.insertClient(req.body);

		return res.status(200).json(client.message);
	} catch (e) {
		console.log("Ocorreu um erro no ClientController.getClients: ", e);
		return res.status(400).json(e);
	}
};

/**
 * Método que retorna a quantidade de clientes totais do banco de dados MySQL
 *
 * @author Caio Busarello Dutra
 * @version 1.0.0
 * @param {object} res - Resposta do servidor
 * @returns {object} - Retorna um objeto com a quantidade de clientes
 */
ClientController.handleGetQuantityClients = async (_, res) => {
	try {
		const quantityClients = await ClientService.getQuantityClients();

		return res.status(200).json(quantityClients.message);
	} catch (e) {
		console.log("Ocorreu um erro no ClientController.getClients: ", e);
		return res.status(400).json(e);
	}
};

/**
 * Método que edita um cliente no banco de dados MySQL
 *
 * @autor Caio Busarello Dutra
 * @version 1.0.0
 * @param {object} req - Requisição do cliente
 * @param {object} res - Resposta do servidor
 * @returns {object} - Retorna um objeto com o cliente editado
 */
ClientController.handleEditClient = async (req, res) => {
	const phoneAlreadyInUse = await ClientService.countIfPhoneIsInUse(
		req.body.phone,
		req.params.id
	);

	if (phoneAlreadyInUse) return res.status(400).json(phoneAlreadyInUse.message);

	const client = await ClientService.editClient(req.body, req.params.id);

	return res.status(200).json(client.message);
};

/**
 * Método que deleta um cliente no banco de dados MySQL
 *
 * @autor Caio Busarello Dutra
 * @version 1.0.0
 * @param {object} req - Requisição do cliente
 * @param {object} res - Resposta do servidor
 * @returns {object} - Retorna um objeto com o cliente deletado
 */
ClientController.handleDeleteClient = async (req, res) => {
	try {
		const deleteClient = await ClientService.deleteClient(req.params.id);

		if (!deleteClient) return res.status(400).json(deleteClient.message);

		return res.status(200).json(deleteClient.message);
	} catch (e) {
		console.log("Ocorreu um erro no ClientController.handleDeleteClient: ", e);
		return res.status(400).json(e);
	}
};
