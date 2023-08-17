import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Clients from "./Clients";
import axios from "axios";

const ClientsContainer = () => {
	const [clientData, setClientData] = useState([]);

	useEffect(() => {
		async function getClients() {
			try {
				axios.get("http://localhost:8000/clients").then((response) => {
					setClientData( response.data );
					console.log(response.data);
				});
			} catch (error) {
				console.error(error);
			}
		}

		getClients();
	}, [setClientData]);

	return (
		<>
      <Topbar>
        
      </Topbar>
			<Clients clientData={clientData} />
		</>
	);
};

export default ClientsContainer;


