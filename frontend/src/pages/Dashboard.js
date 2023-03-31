import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './dashboard.css';

function Dashboard() {
  return (
    <div>
      <Navbar expand="lg" variant="light" bg="dark">
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Dashboard;
