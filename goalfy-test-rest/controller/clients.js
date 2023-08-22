import { db } from "../db.js";

/**
 * Função que retorna todos clientes do banco de dados MySQL
 *
 * @author Caio Busarello Dutra
 * @version 1.0.0
 * @returns {object} - Retorna um objeto com todos os clientes do banco de dados
 */
export const getClients = (_, res) => {
	const q = "SELECT id, name, email, phone, cnpj, address FROM clients";

	db.query(q, (err, data) => {
		if (err) return res.json(err);

		return res.status(200).json(data);
	});
};

/**
 * Função que retorna a quantidade de clientes totais do banco de dados MySQL
 *
 * @author Caio Busarello Dutra
 * @version 1.0.0
 * @returns {object} - Retorna um objeto com a quantidade de clientes totais do banco de dados
 */
export const getQuantityClients = (_, res) => {
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
export const postClient = (req, res) => {
	const q =
		"INSERT INTO clients(`name`, `email`, `phone`, `cnpj`, `address`) VALUES (?, ?, ?, ?, ?)";
	const { name, email, phone, cnpj, address } = req.body;

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
export const editClient = (req, res) => {
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
export const deleteClient = (req, res) => {
	const q = "DELETE FROM clients WHERE `id` = ?";

	db.query(q, [req.params.id], (err) => {
		if (err) return res.json(err);

		return res.status(200).json("Usuário deletado com sucesso.");
	});
};
