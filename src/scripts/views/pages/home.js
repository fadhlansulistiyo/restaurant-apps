import RestaurantSource from "../../data/restaurant-source";

const Home = {
  async render() {
    return `
      <!-- Hero Section -->
      <div class="hero">
        <picture>
          <source srcset="./images/heros/hero-image_1.jpg" />
          <img
            src="./images/heros/hero-image_1.jpg"
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
    const restaurantListContainer = document.getElementById("restaurantList");

    try {
      const { restaurants } = await RestaurantSource.getRestaurantList();

      restaurants.forEach((restaurant) => {
        const restaurantItem = document.createElement("restaurant-item");
        restaurantItem.id = restaurant.id;
        restaurantItem.name = restaurant.name;
        restaurantItem.description = restaurant.description;
        restaurantItem.pictureId = restaurant.pictureId;
        restaurantItem.city = restaurant.city;
        restaurantItem.rating = restaurant.rating;

        restaurantListContainer.appendChild(restaurantItem);
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
