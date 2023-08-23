import { db } from "./connection.js";
export const ClientRepository = {};

ClientRepository.getClients = async () => {
	const q = "SELECT id, name, email, phone, cnpj, address, cep FROM clients";

	const [row, fields] = await db.execute(q);

	return row;
};

ClientRepository.countIfPhoneIsInUse = async (phone, id) => {
	if (id) {
		const q = "SELECT COUNT(id) FROM clients WHERE phone = ? AND id != ?";
		const [row, fields] = await db.execute(q, [phone, id]);

		return row;
	}

	const q = "SELECT COUNT(id) FROM clients WHERE phone = ?";
	const [row, fields] = await db.execute(q, [phone]);

	return row;
};

ClientRepository.insertClient = async (client) => {
	const q =
		"INSERT INTO clients(`name`, `email`, `phone`, `cnpj`, `address`, `cep`) VALUES (?, ?, ?, ?, ?, ?)";

	const { name, email, phone, cnpj, address, cep } = client;

	const [row, fields] = await db.execute(q, [name, email, phone, cnpj, address, cep]);

	return row;
};

ClientRepository.getQuantityClients = async () => {
	const q = "SELECT count(id) as quantity FROM clients";

	const [row, fields] = await db.execute(q);

	return row;
};

ClientRepository.editClient = async (client, id) => {
	const q =
		"UPDATE clients SET name = ?, email = ?, phone = ?, cnpj = ?, address = ?, cep = ? WHERE id = ?";
	const { name, email, phone, cnpj, address, cep } = client;

	const [row, fields] = await db.execute(q, [name, email, phone, cnpj, address, cep, id]);

	return row;
};

ClientRepository.deleteClient = async (id) => {
	const q = "DELETE FROM clients WHERE `id` = ?";

	const [row, fields] = await db.execute(q, [id]);

	return row;
};
