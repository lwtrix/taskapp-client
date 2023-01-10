import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateSelectedPlanner } from "../../redux/actions";

export const NewPlannerModal = ({ show, handleClose, refreshPlanners }) => {
    const [plannerName, setPlannerName] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async () => {
      setPlannerName('')

        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name: plannerName
            })
        }

        const baseEndpoint = 'http://localhost:5001/planners'

        const res = await fetch(baseEndpoint, options)

        if(res.ok) {
            handleClose()
            refreshPlanners() 
            const {id} = await res.json()
            dispatch(updateSelectedPlanner(id))
        }
    }

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{color: 'black'}}>
        <Modal.Header closeButton>
          <Modal.Title>Create Planner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Planner Name</Form.Label>
            <Form.Control type="text" value={plannerName} onChange={(e) => setPlannerName(e.target.value)} placeholder="Books to read, Daily routine"/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
