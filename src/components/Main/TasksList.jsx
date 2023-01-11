import React, { useState, useEffect } from "react";
import { Task } from "./Task";
import saveAs from 'file-saver'
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
    const SERVER_URL = process.env.REACT_APP_SERVER_URL
    const baseEndpoint = `${SERVER_URL}/planners/${plannerId}/tasks`;

    const res = await fetch(baseEndpoint);
    const tasksArr = await res.json();

    setTasks(tasksArr);
  };

  const handleDownloadPDF = async () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL
    const baseEndpoint = `${SERVER_URL}/planners/${plannerId}/pdf`;

    const res = await fetch(baseEndpoint)
    if(res.ok) {
      const blob = await res.blob()
      saveAs(blob, 'planner.pdf')
    }
  }

  useEffect(() => {
    fetchSelectedPlannerTasks();
  }, [plannerId]);

  return (
    <>
      <div className="tasks-list">
        {tasks.length
          ? tasks.map((task) => (
            <div className="task-wrapper" key={task.id}>
              <div className="controls">
                    <span>
                      <HiTrash style={{color: '#E94560'}}/>
                    </span>
                    <span>
                      <MdEdit style={{color: '#fff'}}/>
                    </span>
                  </div>
                  <Task task={task}/>
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
        <>
        <Button variant="success" onClick={() => setShowCreateNewTask(true)}>
          New Task +
        </Button>
        {tasks.length ? (<Button className="mx-3" onClick={handleDownloadPDF} variant="info">Download Planner PDF</Button>) : ''}
        </>
      )}
      
    </>
  );
};
