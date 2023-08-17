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
