import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export const NewTaskModal = ({show, handleClose, refreshTasks, plannerId}) => {

    const [newTask, setNewTask] = useState({
        content: '',
        done: false
    })

    const handleChange = (value, fieldToSet) => {
        setNewTask({
            ...newTask,
            [fieldToSet]: value
        })
    }

    const handleSubmit = async () => {
        handleChange('', 'content')  

        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newTask)
        }

        const SERVER_URL = process.env.REACT_APP_SERVER_URL
        const baseEndpoint = `${SERVER_URL}/planners/${plannerId}/tasks`

        const res = await fetch(baseEndpoint, options)
        if(res.ok) {
            handleClose()
            refreshTasks()
        }
    }

  return (
    <>
    {console.log(plannerId)}
      <Modal show={show} onHide={handleClose} style={{color: 'black'}}>
        <Modal.Header closeButton>
          <Modal.Title>Add task for Planner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Task Content</Form.Label>
            <Form.Control type="text" value={newTask.content} onChange={(e) => handleChange(e.target.value, 'content')} placeholder="Run 10 miles, meditate.."/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
