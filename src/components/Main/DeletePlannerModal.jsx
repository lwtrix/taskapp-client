import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { updateSelectedPlanner } from "../../redux/actions";

export const DeletePlannerModal = ({show, handleClose, plannerId, plannerName, refreshPlanners}) => {

    const dispatch = useDispatch()

    const deletePlanner = async () => {
        handleClose()
        const options = {
          method: 'DELETE'
        }
        
        const SERVER_URL = process.env.REACT_APP_SERVER_URL
        const res = await fetch(`${SERVER_URL}/planners/${plannerId}`, options)
        if(res.ok) {    
          dispatch(updateSelectedPlanner(null))
          refreshPlanners()
        }
      }

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{color: 'black'}}> 
        <Modal.Header closeButton>
          <Modal.Title>Delete {plannerName}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            All the current tasks of this planner will be removed permanently.
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">Cancel</Button>
          <Button variant="success" onClick={deletePlanner}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
