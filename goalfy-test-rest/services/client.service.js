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
}

ClientService.countIfPhoneIsInUse = async (phone) => {
  try {
    const hasClient = await ClientRepository.countIfPhoneIsInUse(phone);
    
    if (hasClient) return json({ message: "Telefone já cadastrado" });

    return hasClient;
  } catch (e) {
    console.log("Ocorreu um erro no ClientService.countIfPhoneIsInUse: ", e);
    throw e;
  }
}