import React, { useEffect, useState } from "react";
import { TasksList } from "./TasksList";
import { useDispatch, useSelector } from "react-redux";
import { IoIosTrash } from "react-icons/io";
import { updateSelectedPlanner } from "../../redux/actions";
import { DeletePlannerModal } from "./DeletePlannerModal";
import '../../css/main-content.css'

export const MainContent = ({refreshPlanners}) => {
  const plannerId = useSelector((state) => state.planner.selectedPlanner);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [plannerName, setPlannerName] = useState("");

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false)
  }

  const fetchPlannerInfo = async () => {
    if(plannerId) {
      const SERVER_URL = process.env.REACT_APP_SERVER_URL
      const res = await fetch(`${SERVER_URL}/planners/${plannerId}`);
      const selectedPlanner = await res.json();
      setPlannerName(selectedPlanner.name);
    } 
   
  };

  useEffect(() => {
    fetchPlannerInfo();
  }, [plannerId]);

  return (
    <div className="main-content">
    
      {console.log(plannerId)}
      {plannerId ? (
        <>
          <h2 className='planner-name'>
            <span>{plannerName}</span>
            <IoIosTrash style={{color: '#E94560'}} onClick={() => setShowDeleteModal(true)} />
          </h2>
          <TasksList />
        </>
      ) : 'Select a planner'}

        <DeletePlannerModal show={showDeleteModal} refreshPlanners={refreshPlanners} plannerId={plannerId} plannerName={plannerName} handleClose={handleDeleteModalClose}/>
    </div>
  );
};
