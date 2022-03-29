import { Button } from "bootstrap";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import memberStore from "../stores/memberStore";
import queueStore from "../stores/queueStore";

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
    if (queue.isEmailRequired && !newMember.email) {
      alert("email is requred");
    } else {
      if (queue.isPhoneRequired && !newMember.phone) {
        alert("phone is requred");
      } else {
        memberStore.addMember(queue, newMember);
        navigate("/");
      }
    }
  };
  const queues = queueStore.queues;
  const queue = queues.find((queue) => queue._id === queueId);

  console.log("queue", queue);
  return (
    <div>
      {!queue ? (
        <h1>Welcome to the Quely, the provided URL is invalid</h1>
      ) : (
        <>
          <h1>Welcome to: {queue.name}</h1>

          {queue.isEmailAvailable && (
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder={queue.isEmailRequired ? "email (required)" : "email"}
              className="form-control my-3"
            />
          )}

          {queue.isPhoneAvailable && (
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              placeholder={queue.isPhoneRequired ? "phone (required)" : "phone"}
              className="form-control my-3"
            />
          )}
          <button onClick={handleSubmit}>Button</button>
        </>
      )}
    </div>
  );
};

export default observer(QueueForm);
