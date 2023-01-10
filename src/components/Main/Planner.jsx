import React from 'react'
import '../../css/planner.css'
import { useDispatch } from 'react-redux'
import { updateSelectedPlanner } from '../../redux/actions'

export const Planner = ({planner}) => {

  const dispatch = useDispatch()

  return (
    <li className='planner' onClick={() => dispatch(updateSelectedPlanner(planner.id))}>
      {planner.name}
    </li>
  )
}
