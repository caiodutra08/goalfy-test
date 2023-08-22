import React from "react";
import { Modal } from ".././Modal";
import FormClient from "../FormClient";
import { BsPlus, BsBoxArrowUpRight } from "react-icons/bs";

export default function ModalClient({
	handleCloseModal,
	title,
	btnTitle,
	client,
	setEdit,
	getClients,
}) {
	return (
		<>
			<Modal.Root>
				<Modal.Header>
					<Modal.Title>
						<BsBoxArrowUpRight />
						{title}
					</Modal.Title>
					<Modal.Action
						onClick={() => handleCloseModal()}
						title="close"
						className="btnClose"
					>
						<BsPlus />
					</Modal.Action>
				</Modal.Header>
				<Modal.Content>
					<FormClient
						clientEdit={client}
						setEdit={setEdit}
						getClients={getClients}
						handleCloseModal={handleCloseModal}
					>
						<Modal.Actions>
							<Modal.Action className="btnCadastrar" type="submit">
								{btnTitle}
							</Modal.Action>
						</Modal.Actions>
					</FormClient>
				</Modal.Content>
			</Modal.Root>
		</>
	);
}
