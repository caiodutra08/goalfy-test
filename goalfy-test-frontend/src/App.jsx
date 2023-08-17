import React from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/global";
import ClientsContainer from "./components/ClientsContainer";

const Container = styled.div`
	margin: 0 auto;
`;

const Header = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid #ccc;
`;

const Title = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	gap: 32px;
`;

const Span = styled.span`
	font-size: 18px;
	font-weight: normal;
`;

const H1 = styled.h1`
	font-size: 18px;
	font-weight: bold;
`;

export default function App() {
	return (
		<>
			<Container>
				<Header>
					<Title>
						<Span>Goalfy</Span>
						<H1>Registro de Clientes</H1>
					</Title>
				</Header>
				<ClientsContainer />
			</Container>
			<GlobalStyle />
		</>
	);
}
