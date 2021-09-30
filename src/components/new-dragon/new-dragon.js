import React, { useState } from "react";
import { connect } from 'react-redux';
import { updateObject } from "../../utils/utils";
import * as actions from "../../store/actions/";
import "./new-dragon.css";
import { FaSave } from "react-icons/fa";

import Input from './input';

const NewDragon = props => {
  const [newDragon, setNewDragon] = useState({
    name:'',
    type: '',
    createdAt: new Date().toString(),
    histories: []
  });

  const submitHandler = event => {
    if(newDragon.name.length && newDragon.type.length )
    {
      const creationDate = new Date().toString();
      const histories = [];
      const newDragonUpdate = updateObject(newDragon, {createdAt: creationDate, histories: histories})
      setNewDragon({...newDragonUpdate});
      props.createDragon(newDragon)
    }
    event.preventDefault();
  }

  const changeHandler = event => {
    const { id, value } = event.target;
    setNewDragon({ ...newDragon, [id]: value });
  };

  return (
    <div className="new-dragon" >
  
        <div>
          <label>Name:</label>
          <Input
           type="text" 
           id="name"
          placeholder="Name" 
          onChange={changeHandler}
          />
        </div>
        <div>
          <label>Type:</label>
          <Input type="text" 
          id="type" 
          placeholder="Type" 
          onChange={changeHandler}
          />
        </div>
  
        <span className="save-button" onClick={submitHandler}>
          <FaSave size="2x" />
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
    createDragon: (newDragon) => dispatch(actions.createDragon(newDragon))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewDragon);
