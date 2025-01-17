import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <!-- Hero Section -->
      <div class="hero">
        <picture>
          <source srcset="./images/hero-small.jpg" media="(max-width: 768px)" />
          <source
            srcset="./images/hero-medium.jpg"
            media="(min-width: 768px) and (max-width: 1200px)"
          />
          <source
            srcset="./images/hero-large.jpg"
            media="(min-width: 1200px)"
          />
          <img
            src="./images/hero-large.jpg"
            alt="Delicious food served at YumYum Apps"
            class="hero__image"
          />
        </picture>
        <div class="hero__content">
          <h1>Welcome to YumYum Apps</h1>
          <p>Explore the best dishes in town, handpicked just for you!</p>
        </div>
      </div>

      <!-- Main Content -->
      <section class="content">
        <div class="explore">
          <h1 class="explore__label">Explore Restaurant</h1>
          <div class="restaurant explore-restaurant" id="restaurantList"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurantListContainer = document.getElementById('restaurantList');

    try {
      const { restaurants } = await RestaurantSource.getRestaurantList();
      console.log(restaurants);

      restaurants.forEach((restaurant) => {
        restaurantListContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      restaurantListContainer.innerHTML = `
        <p class="error-message">Failed to load restaurant data. Please try again later.</p>
      `;
      console.error(error);
    }
  },
};

export default Home;
