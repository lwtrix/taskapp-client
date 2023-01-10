import React, { useEffect, useState } from 'react'
import '../../css/plan-sidebar.css'
import { Button } from 'react-bootstrap'
import { Planner } from './Planner'
import { NewPlannerModal } from './NewPlannerModal'

export const PlanSidebar = ({planners, fetchResults}) => {

  const [showCreatePlanner, setShowCreatePlanner] = useState(false)

  const handleClose = () => {
    setShowCreatePlanner(false)
  }

  return (
    <div className='plan-sidebar'>
      <h3>Planner</h3>
      <ul className='planners-list'>
        {planners && planners.map(plan => (
          <Planner key={plan.id} planner={plan} />
        ))}
      </ul>
      <NewPlannerModal show={showCreatePlanner} handleClose={handleClose} refreshPlanners={fetchResults}/>
      <Button style={{backgroundColor: '#064663', border: 'none'}} onClick={() => setShowCreatePlanner(true)}>New Planner</Button>
      
    </div>
  )
}
