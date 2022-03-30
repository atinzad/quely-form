import React from "react";
import memberStore from "../stores/memberStore";
import "../App.css";
import { Container } from "react-bootstrap";

const Confirmation = () => {
  return (
    <Container
      style={{
        alignItems: "center",
        backgroundColor: "#3f93a2",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <h1>You have been Successfully added to the Queue</h1>
      {""}
      <h1 style={{ color: "white" }}>
        Your Id is : {memberStore.member._id.slice(-4)}
      </h1>
    </Container>
  );
};

export default Confirmation;
