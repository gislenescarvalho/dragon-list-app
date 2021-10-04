import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/";
import Input from '../input/input';
import { FaEdit, FaDragon, FaArrowCircleLeft, FaSave, FaTrashAlt } from "react-icons/fa";
import "./dragon.css";

const Dragon = props => {
  const [dragonDetails, setDragonDetails] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [wasDeleted, setWasDeleted] = useState(false)


  useEffect(() => {
    setDragonDetails({
      ...props.location.state
    });
    setWasDeleted(false)
  }, []);

  useEffect(() => {
    if(wasDeleted) {
      props.history.goBack();
    }
  },[wasDeleted])


  const formatDate = date => {
    return new Date(date).toLocaleString('pt-BR');
  };

  const changeHandler = (event) => {
    const { id, value } = event.target;
    setDragonDetails({ ...dragonDetails, [id]: value });
  };

  const goBackHandler = () => {
    props.history.goBack();
  };

  const saveDragonHandler = () => {
    props.saveDragon(dragonDetails);
    setIsEdit(false);
  }

  const deleteDragonHandler = () => {
    props.deleteDragon(dragonDetails.id);
    setWasDeleted(true);
  }
  
  const editDragonHandler = () => {
    setIsEdit(!isEdit);
  };

  const editMode = () => {
    return (
      <>
      <div>
        <input
          type="text"
          id="name"
          value={dragonDetails.name}
          onChange={changeHandler}
        />
      </div>
      <div>
        <input
          type="text"
          id="type"
          value={dragonDetails.type}
          onChange={changeHandler}
        />
      </div>
    </>
    );
  };
  const infoMode = () => {
    return (
      <>
      <div>
        <h2>{dragonDetails.name}</h2>
      </div>
      <div>
        <h3>{dragonDetails.type}</h3>
      </div>
    </>
    );
  };

  const setDisplayMode = () => {
    switch (isEdit) {
      case true:
        return editMode();
      case false:
        return infoMode();
    }
  };


  let display = (
    <div className="dragon-details">
    <div className="first-row-info">
      <span className="details-id">{dragonDetails.id}</span>
      <span>{formatDate(dragonDetails.createdAt)}</span>
    </div>
    {setDisplayMode()}
  </div>
  )
  
  return (
    <div>
        <div className="logo">
        <FaDragon size={92} />
      </div>
      {display}
      <div className="actions">
        <span onClick={goBackHandler}>
          <FaArrowCircleLeft size={32} />
        </span>
        <span onClick={editDragonHandler}>
          <FaEdit size={32} />
        </span>
        { isEdit && <span onClick={saveDragonHandler}>
          <FaSave size={32} />  
        </span>}
        {!isEdit && <span onClick={deleteDragonHandler}>
          <FaTrashAlt size={32} />          
        </span>}
      </div>
      <div>
          {props.error && <p className="error-message">{props.error}</p>} 
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    successMessage: state.dragon.successMessage,
    error: state.dragon.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDragon: (dragonDetails) => dispatch(actions.saveDragon(dragonDetails)),
    deleteDragon: (dragonId) => dispatch(actions.deleteDragon(dragonId))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Dragon);
