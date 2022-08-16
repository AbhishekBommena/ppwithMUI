import axios from "axios";

//Get Message Code Count
const getMessageCount = async () => {
  const response = await axios.get(`http://localhost:8080/getMessageCount`);
  return response.data;
};

//Get Transfer Type Code Count
const getTransferCount = async () => {
  const response = await axios.get(`http://localhost:8080/getTransferCount`);
  return response.data;
};

//Get Top Customers
const getTopCustomers = async () => {
  const response = await axios.get(`http://localhost:8080/getTopCustomers`);
  return response.data;
};

//Get Top Banks
const getTopBanks = async () => {
  const response = await axios.get(`http://localhost:8080/getTopBanks`);
  return response.data;
};

const UserService = {
  getMessageCount,
  getTransferCount,
  getTopCustomers,
  getTopBanks,
};

export default UserService;
