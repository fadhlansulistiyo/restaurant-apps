import axios from 'axios';
import ApiEndpoint from '../global/api-endpoint';

const RestaurantSource = {
  async getRestaurantList() {
    return this._fetchData(ApiEndpoint.GET_LIST);
  },

  async getRestaurantDetail(id) {
    return this._fetchData(ApiEndpoint.GET_DETAIL(id));
  },

  async _fetchData(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  },

  handleError(error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Something went wrong',
    };
  },
};

export default RestaurantSource;
