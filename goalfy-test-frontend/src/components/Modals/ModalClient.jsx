import React from "react";
import { Modal } from ".././Modal";
import FormClient from "../FormClient";
import { BsPlus, BsBoxArrowUpRight } from "react-icons/bs";

export default function ModalClient({
	handleClient,
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
					<Modal.Action onClick={handleCloseModal} title="close" className="btnClose">
						<BsPlus />
					</Modal.Action>
				</Modal.Header>
				<Modal.Content>
					<FormClient client={client} setEdit={setEdit} getClients={getClients} />
					<Modal.Actions>
						<Modal.Action
							onClick={(e) => {
								handleClient(e);
								handleCloseModal();
							}}
							className="btnCadastrar"
							type="submit"
						>
							{btnTitle}
						</Modal.Action>
					</Modal.Actions>
				</Modal.Content>
			</Modal.Root>
		</>
	);
}
