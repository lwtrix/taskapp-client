import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "../../css/task.css";
import { GiCheckMark } from "react-icons/gi";

export const Task = ({ task }) => {
  const [isTaskDone, setIsTaskDone] = useState(task.done);
  const [taskDoneLoading, setTaskDoneLoading] = useState(false);
  const handleCheck = (bool) => {
    setTaskDoneLoading(true);

    setTimeout(async () => {
      console.log(isTaskDone);
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          done: !isTaskDone,
        }),
      };
      console.log(options);
      const baseEndpoint = `http://localhost:5001/planners/${task.plannerId}/tasks/${task.id}`;

      const res = await fetch(baseEndpoint, options);
      if (res.ok) {
        console.log(res);
        console.log(await res.json());
        setIsTaskDone(bool);
        setTaskDoneLoading(false);
      }
    }, 250);
  };

  return (
    <div className="task">
      <p className="task-content">{task.content}</p>
      <span className="task-status">
        {console.log(isTaskDone)}
        {taskDoneLoading ? (
          isTaskDone ? (
            <Form.Check.Input aria-label="option 1" disabled={true} />
          ) : (
            <GiCheckMark style={{ color: "#4d9f3d36" }} />
          )
        ) : isTaskDone ? (
          <GiCheckMark
            onClick={() => handleCheck(false)}
            style={{ color: "#4E9F3D" }}
          />
        ) : (
          <Form.Check.Input
            aria-label="option 1"
            onClick={() => handleCheck(true)}
            style={{ border: "1px solid rgb(0, 0, 0, .65)" }}
          />
        )}
      </span>
    </div>
  );
};
