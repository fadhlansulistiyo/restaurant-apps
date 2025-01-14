import CONFIG from "./config";

const API_ENDPOINT = {
  GET_LIST: `${CONFIG.BASE_URL}list`,
  GET_DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
};

export default API_ENDPOINT;
