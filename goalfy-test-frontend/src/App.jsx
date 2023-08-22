import React from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/global";
import ClientsContainer from "./components/ClientsContainer";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Container = styled.div`
	margin: 0 auto;
`;

const Header = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid #f2f2f2;
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
	display: flex;
	align-items: center;
	gap: 4px;

	// color the svg
	svg {
		font-weight: bold;
		color: #7f23f7;
	}
`;

const H1 = styled.h1`
	font-size: 18px;
	font-weight: 500;
`;

export default function App() {
	return (
		<>
			<Container>
				<Header>
					<Title>
						<Span>Goalfy</Span>
						<Span>
							<BsBoxArrowUpRight />
							<H1>Registro de Clientes</H1>
						</Span>
					</Title>
				</Header>
				<ToastContainer />
				<ClientsContainer />
			</Container>
			<GlobalStyle />
		</>
	);
}
