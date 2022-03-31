import { Button } from "bootstrap";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import memberStore from "../stores/memberStore";
import queueStore from "../stores/queueStore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Container } from "react-bootstrap";

const QueueForm = () => {
  const { queueId } = useParams();
  const [newMember, setMember] = useState({});

  // useEffect(async () => {
  //   console.log("first");
  //   await queueStore.fetchQueues();
  // }, []);

  const queues = queueStore.queues;
  const queue = queues?.find((queue) => queue._id == queueId);
  const navigate = useNavigate();

  console.log("queue", queue);
  const [fieldValues, setFieldValues] = useState(
    queue
      ? Object.assign({}, ...queue.fields.map((key) => ({ [key]: "" })))
      : {}
  );

  if (queueStore.loading) {
    return <div>loading...</div>;
  }

  const handleChange = (event) => {
    setMember({ ...newMember, [event.target.name]: event.target.value });
  };

  const handleFieldChange = (e, field) => {
    setFieldValues({ ...fieldValues, [field]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMember(newMember);
    if (queue?.isEmailRequired && !newMember.email) {
      alert("email is requred");
    } else {
      if (queue.isPhoneRequired && !newMember.phone) {
        alert("phone is requred");
      } else {
        memberStore.addMember(queue, newMember, fieldValues, navigate);
      }
    }
  };

  const fields = queue.fields
    ? queue.fields.map((field) => {
        return (
          <input
            alignItems="center"
            type="text"
            name={field}
            onChange={(e) => handleFieldChange(e, field)}
            placeholder={field}
            className="form-control my-3"
          />
        );
      })
    : "";

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

          {queue.isEmailAvailable && (
            <input
              alignItems="center"
              type="text"
              name="email"
              onChange={handleChange}
              placeholder={queue.isEmailRequired ? "email (required)" : "email"}
              className="form-control my-3"
            />
          )}

          {queue.isPhoneAvailable && (
            <PhoneInput
              country={"kw"}
              value={newMember.phone}
              placeholder={queue.isPhoneRequired ? "phone (required)" : "phone"}
              onChange={(phone) => setMember({ ...newMember, phone: phone })}
            />
          )}
          {fields}
          <button className="btn btn-warning" onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}
    </Container>
  );
};

export default observer(QueueForm);
