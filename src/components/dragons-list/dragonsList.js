import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";
import NewDragon from "../new-dragon/new-dragon";
import Loading from "../loading/loading";
import { FaDragon, FaPlus } from "react-icons/fa";
import "./dragonList.css";

const DragonsList = props => {

  const [isAddingNew, setIsAddingNew] = useState(false)


  const onClickDragonHandler = event => {
    props.history.push({ pathname: `/dragon/${event.id}`, state: event });
  };

  const addNewDragonHandler = () => {
    setIsAddingNew(!isAddingNew);
  }

  const getDragonList = props => {
    return  props.dragonsList.forEach(dragon => (
      <div key={dragon.id} className="dragon">
        <FaDragon />
        <li onClick={() => onClickDragonHandler(dragon)}>
          {dragon.name}
        </li>
      </div>
    ));
  }


  let list = <Loading />;
  if (!props.loading) {
    list = getDragonList(props);
  }

  return (
    <div className="dragon-list">

      <div>
        <div className="logo">
          <FaDragon size="5x" />
        </div>
        <ul>{list}</ul>
        <div>
          <hr />
          <span className="actions-list">
            <FaPlus/>
            <span onClick={addNewDragonHandler}>Add New Dragon</span>
          </span>
        </div>
        <div>
          {isAddingNew && <NewDragon />}
        </div>
        <div>
          {props.error && <p className="error-message">{props.error}</p>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    dragonsList: state.dragonList.dragons,
    loading: state.dragonList.loading,
    wasAdded: state.dragon.wasAdded,
    wasUpdate: state.dragonList.wasUpdate,
    error: state.dragonList.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetDragonsList: () => dispatch(actions.getDragonsList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragonsList);
