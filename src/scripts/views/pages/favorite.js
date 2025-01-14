import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Favorite = {
  async render() {
    return `
      <section class="content" style="margin-top: 5rem;">
        <div class="explore">
          <h1 class="explore__label">Favorite Restaurants</h1>
          <div class="restaurant explore-restaurant" id="restaurantList"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      const restaurantListContainer = document.querySelector('#restaurantList');

      if (restaurants.length === 0) {
        restaurantListContainer.innerHTML = `
          <p class="empty-message">You haven't added any favorite restaurants yet.</p>
        `;
        return;
      }

      restaurants.forEach((restaurant) => {
        const restaurantItem = document.createElement('restaurant-item');
        restaurantItem.id = restaurant.id;
        restaurantItem.name = restaurant.name;
        restaurantItem.description = restaurant.description;
        restaurantItem.pictureId = restaurant.pictureId;
        restaurantItem.city = restaurant.city;
        restaurantItem.rating = restaurant.rating;
        restaurantListContainer.appendChild(restaurantItem);
      });
    } catch (error) {
      console.error('Error loading favorite restaurants:', error);
      document.querySelector('#restaurantList').innerHTML = `
        <p class="error-message">Failed to load favorite restaurants. Please try again later.</p>
      `;
    }
  },
};

export default Favorite;
