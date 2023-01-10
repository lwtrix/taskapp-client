import React, { useState, useEffect } from "react";
import { Task } from "./Task";
import "../../css/tasks-list.css";
import { useSelector } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { NewTaskModal } from "./NewTaskModal";
import { MdEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";

export const TasksList = () => {
  const [showCreateNewTask, setShowCreateNewTask] = useState(false);
  const plannerId = useSelector((state) => state.planner.selectedPlanner);

  const handleClose = () => {
    setShowCreateNewTask(false);
  };

  const [tasks, setTasks] = useState([]);

  const fetchSelectedPlannerTasks = async () => {
    const baseEndpoint = `http://localhost:5001/planners/${plannerId}/tasks`;

    const res = await fetch(baseEndpoint);
    const tasksArr = await res.json();

    setTasks(tasksArr);
    console.log(tasksArr);
  };

  useEffect(() => {
    fetchSelectedPlannerTasks();
  }, [plannerId]);

  return (
    <>
      <div className="tasks-list">
        {tasks.length
          ? tasks.map((task) => (
            <div className="task-wrapper">
              <div className="controls">
                    <span>
                      <HiTrash style={{color: '#E94560'}}/>
                    </span>
                    <span>
                      <MdEdit style={{color: '#fff'}}/>
                    </span>
                  </div>
                  <Task task={task} key={task.id}/>
              </div>
                  
            ))
          : "This planner has no tasks"}

        <NewTaskModal
          show={showCreateNewTask}
          handleClose={handleClose}
          refreshTasks={fetchSelectedPlannerTasks}
          plannerId={plannerId}
        />
      </div>
      {plannerId && (
        <Button variant="success" onClick={() => setShowCreateNewTask(true)}>
          New Task +
        </Button>
      )}
    </>
  );
};
