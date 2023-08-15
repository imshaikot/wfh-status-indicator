import { Container } from "react-bootstrap";
import MainCard from "./components/main-card";
import { default as Context, defaultContext } from "./context";
import { useState } from "react";

function App() {
  const [isActive, setIsActive] = useState(false);
  return (
    <Context.Provider value={{ ...defaultContext, setIsActive }}>
      {!isActive ? (
        <Container className="d-flex justify-content-center align-items-center">
          <MainCard />
        </Container>
      ) : (
        <h1>Hello</h1>
      )}
    </Context.Provider>
  );
}

export default App;
