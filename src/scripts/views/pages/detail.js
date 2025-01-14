import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import FavoriteButtonInitiator from '../../utils/favorite-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="restaurant-detail" class="restaurant-detail"></div>
      <div id="favoriteButtonContainer"></div>
    `;
  },

  async afterRender() {
    try {
      // Lazy load FontAwesome script
      if (
        !document.querySelector(
          'script[src="https://use.fontawesome.com/b070c8f1df.js"]'
        )
      ) {
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://use.fontawesome.com/b070c8f1df.js';
        document.body.appendChild(scriptElement);
      }

      // Parse URL and fetch restaurant data
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const { restaurant } = await RestaurantSource.getRestaurantDetail(url.id);

      if (!restaurant) {
        throw new Error('Restaurant data not found!');
      }

      // Populate restaurant detail content
      const restaurantContainer = document.querySelector('#restaurant-detail');
      restaurantContainer.innerHTML =
        createRestaurantDetailTemplate(restaurant);

      // Initialize favorite button
      FavoriteButtonInitiator.init({
        favoriteButtonContainer: document.querySelector(
          '#favoriteButtonContainer'
        ),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          address: restaurant.address,
          city: restaurant.city,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
          menus: restaurant.menus,
          customerReviews: restaurant.customerReviews,
        },
      });
    } catch (error) {
      console.error('Error loading restaurant detail:', error);
      const restaurantContainer = document.querySelector('#restaurant-detail');
      restaurantContainer.innerHTML = `
        <p class="error-message">Failed to load restaurant details. Please try again later.</p>
      `;
    }
  },
};

export default Detail;
