import { db } from "./connection.js";
export const ClientRepository = {};

ClientRepository.getClients = async () => {
	const q = "SELECT id, name, email, phone, cnpj, address FROM clients";

	const [row, fields] = await db.execute(q);

	return row;
};

ClientRepository.countIfPhoneIsInUse = async (phone) => {
	const q = "SELECT COUNT(id) FROM clients WHERE phone = ?";

	const [row, fields] = await db.execute(q, [phone]);

	return row;
};
