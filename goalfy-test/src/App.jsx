import React, { Component } from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/global";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

export default class App extends Component {
	render() {
		return (
			<>
      <Container>
        Teste
      </Container>
				<GlobalStyle />
			</>
		);
	}
}
