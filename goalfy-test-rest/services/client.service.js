import { ClientRepository } from "../repositories/client.repository.js";

export const ClientService = {};

ClientService.getClients = async () => {
	try {
		const clients = await ClientRepository.getClients();
		return clients;
	} catch (e) {
		console.log("Ocorreu um erro no ClientService.getClients: ", e);
		throw e;
	}
};

ClientService.countIfPhoneIsInUse = async (phone, id = null) => {
	try {
		const hasClient = await ClientRepository.countIfPhoneIsInUse(phone, id).then(
			(row) => row[0]["COUNT(id)"]
		);

		if (hasClient) return { message: "Já existe um cliente cadastrado com esse telefone." };

		return hasClient;
	} catch (e) {
		console.log("Ocorreu um erro no ClientService.countIfPhoneIsInUse: ", e);
		throw e;
	}
};

ClientService.insertClient = async (client) => {
	try {
		const newClient = await ClientRepository.insertClient(client);

		if (!newClient) return { message: "Ocorreu um erro ao cadastrar o cliente!" };

		return { message: "Cliente cadastrado com sucesso!" };
	} catch (e) {
		console.log("Ocorreu um erro no ClientService.insertClient: ", e);
		throw e;
	}
};

ClientService.getQuantityClients = async () => {
	try {
		const quantityClients = await ClientRepository.getQuantityClients();

		if (!quantityClients)
			return { message: "Ocorreu um erro ao buscar a quantidade de clientes!" };

		return quantityClients;
	} catch (e) {
		console.log("Ocorreu um erro no ClientService.getQuantityClients: ", e);
		throw e;
	}
};

ClientService.editClient = async (client, id) => {
	try {
		const editedClient = await ClientRepository.editClient(client, id);

		if (!editedClient) return { message: "Ocorreu um erro ao editar o cliente!" };

		return { message: "Cliente editado com sucesso!" };
	} catch (e) {
		console.log("Ocorreu um erro no ClientService.editClient: ", e);
		throw e;
	}
};

ClientService.deleteClient = async (id) => {
  try {
    const deletedClient = await ClientRepository.deleteClient(id);

    if (!deletedClient) return { message: "Ocorreu um erro ao deletar o cliente!" };

    return { message: "Cliente deletado com sucesso!" };
  } catch (e) {
    console.log("Ocorreu um erro no ClientService.deleteClient: ", e);
    throw e;
  }
}