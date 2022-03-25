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
    memberStore.addMember(queue, newMember);
    navigate("/");
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
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="email"
            className="form-control my-3"
          />
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            placeholder="phone"
            className="form-control my-3"
          />
          <button onClick={handleSubmit}>Button</button>
        </>
      )}
    </div>
  );
};

export default observer(QueueForm);
