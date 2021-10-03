import axios from "axios";

const MOCK_API_URL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

const getDragons = () =>
  axios({
    method: "GET",
    url: MOCK_API_URL
  });

const getDragonDetail = dragonId =>
  axios({
    method: "GET",
    url: `${MOCK_API_URL}/${dragonId}`
  });

const addDragon = dragon =>
  axios({
    method: "POST",
    url: `${MOCK_API_URL}/`,
    dragon
  });

const editDragon = dragonId =>
    axios({
    method: "PUT",
    url: `${MOCK_API_URL}/${dragonId}`
  });

const deleteDragonById = dragonId =>
  axios({
    method: "DELETE",
    url: `${MOCK_API_URL}/${dragonId}`
  });

export default {
  getDragons,
  getDragonDetail, 
  addDragon,
  editDragon,
  deleteDragonById
};