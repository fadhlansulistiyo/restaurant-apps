import { createRestaurantItemTemplate } from "../../templates/template-creator";

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <section class="content" style="margin-top: 5rem;">
        <div class="explore">
          <h1 class="explore__label">Favorite Restaurants</h1>
          <div class="restaurant explore-restaurant" id="restaurantList"></div>
        </div>
      </section>
    `;
  }

  _getEmptyRestaurantTemplate() {
    return `
      <p class="empty-message">You haven't added any favorite restaurants yet.</p>
    `;
  }

  showFavoriteRestaurants(restaurants) {
    const restaurantListContainer = document.getElementById("restaurantList");
    let html;

    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) =>
          carry.concat(createRestaurantItemTemplate(restaurant)),
        ""
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    restaurantListContainer.innerHTML = html;

    document
      .getElementById("restaurantList")
      .dispatchEvent(new Event("restaurants:updated"));
  }
}

export default FavoriteRestaurantView;
