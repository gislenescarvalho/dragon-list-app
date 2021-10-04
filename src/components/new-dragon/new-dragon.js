import React, { useState } from "react";
import { connect } from 'react-redux';
import { updateObject } from "../../utils/utils";
import * as actions from "../../store/actions/";
import "./new-dragon.css";
import { FaSave } from "react-icons/fa";

import Input from '../input/input';

const NewDragon = props => {
  const [addDragon, setNewDragon] = useState({
    name:'',
    type: '',
    createdAt: new Date().toString(),
    histories: []
  });

  const submitHandler = event => {
    if(addDragon.name.length > 0 && addDragon.type.length > 0  )
    {
      const creationDate = new Date().toString();
      const histories = [];
      const addDragonUpdate = updateObject(addDragon, {createdAt: creationDate, histories: histories})
      setNewDragon({...addDragonUpdate});
      props.addDragon(addDragon)
    }
    event.preventDefault();
  }

  const changeHandler = event => {
    const { id, value } = event.target;
    setNewDragon({ ...addDragon, [id]: value });
  };

  return (
    <div className="new-dragon" >
  
          <label>Name:</label>
          <Input
           type="text" 
           id="name"
          placeholder="Name" 
          onChange={changeHandler}
          />
          <label>Type:</label>
          <Input type="text" 
          id="type" 
          placeholder="Type" 
          onChange={changeHandler}
          />
  
        <span className="save-button" onClick={submitHandler}>
          <FaSave size={54} />
        </span>
        <div>
          {props.error && <p className="error-message">{props.error}</p>} 
        </div>
    </div>

  );
}

const mapStateToProps = state => {
  return {
    error: state.dragon.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addDragon: (addDragon) => dispatch(actions.addDragon(addDragon))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewDragon);
