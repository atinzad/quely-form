import { Button } from "bootstrap";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import memberStore from "../stores/memberStore";
import queueStore from "../stores/queueStore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Container } from "react-bootstrap";

const QueueForm = () => {
  const { queueId } = useParams();
  const [newMember, setMember] = useState({});
  const navigate = useNavigate();

  if (queueStore.loading) {
    return <div>loading...</div>;
  }

  const handleChange = (event) => {
    setMember({ ...newMember, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    memberStore.addMember(queue, newMember, navigate);
  };
  const queues = queueStore.queues;
  const queue = queues.find((queue) => queue._id === queueId);

  console.log("queue", queue);
  return (
    <Container
      style={{
        width: "100%",
        alignItems: "center",
        backgroundColor: "#3f93a2",
        height: "100vh",
        justifyContent: "center",
        flex: "1",
        padding: "45px",
      }}
    >
      {!queue ? (
        <h1>Welcome to the Quely, the provided URL is invalid</h1>
      ) : (
        <>
          <h1 style={{ color: "white" }}>Welcome to {queue.name}</h1>
          <input
            alignItems="center"
            type="text"
            name="Email"
            onChange={handleChange}
            placeholder="Email"
            className="form-control my-3"
          />

          <PhoneInput
            country={"us"}
            value={newMember.phone}
            placeholder="Phone Number"
            onChange={(phone) => setMember({ ...newMember, phone: phone })}
          />
          <button className="btn btn-warning" onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}
    </Container>
  );
};

export default observer(QueueForm);
