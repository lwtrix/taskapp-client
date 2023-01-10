import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'

import { MainContent } from '../components/Main/MainContent'
import { PlanSidebar } from '../components/Main/PlanSidebar'
import { RightSidebar } from '../components/Main/RightSidebar'

export const Main = () => {

  const [planners, setPlanners] = useState([])

  const fetchResults = async () => {
    const res = await fetch('http://localhost:5001/planners')
    const data = await res.json()

    setPlanners(data)
  }

  useEffect(() => {
    fetchResults()
  }, [])

  return (
    <div className='mx-auto pt-3 px-2' style={{width: "960px"}}>
      <Row>
        <Col xs={3}><PlanSidebar planners={planners} fetchResults={fetchResults}/></Col>
        <Col xs={7}><MainContent refreshPlanners={fetchResults}/></Col>
        <Col xs={2}><RightSidebar /></Col>
      </Row>  
    </div>
  )
}
