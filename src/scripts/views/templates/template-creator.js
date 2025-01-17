import CONFIG from "../../global/config";

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant-detail__title">${restaurant.name}</h2>
  <img
    class="restaurant-detail__poster"
    src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"
    alt="${restaurant.name}"
  />
  <div class="restaurant-detail__info">
    <h3>Information</h3>
    <h4>City</h4>
    <p>${restaurant.city}</p>
    <h4>Address</h4>
    <p>${restaurant.address}</p>
    <h4>Rating</h4>
    <p>${restaurant.rating}</p>
  </div>
  <div class="restaurant-detail__overview">
    <h3>Description</h3>
    <p>${restaurant.description}</p>
  </div>
  <div class="restaurant-detail__menus">
    <h3>Menu</h3>
    <div class="restaurant-detail__menu-category">
      <h4>Foods</h4>
      <ul>
        ${restaurant.menus.foods
          .map((food) => `<li>${food.name}</li>`)
          .join("")}
      </ul>
    </div>
    <div class="restaurant-detail__menu-category">
      <h4>Drinks</h4>
      <ul>
        ${restaurant.menus.drinks
          .map((drink) => `<li>${drink.name}</li>`)
          .join("")}
      </ul>
    </div>
  </div>
  <div class="restaurant-detail__reviews">
    <h3>Customer Reviews</h3>
    <ul>
      ${restaurant.customerReviews
        .map(
          (review) => `
        <li class="restaurant-detail__review-item">
          <p class="review-name"><strong>${review.name}</strong></p>
          <p class="review-date">${review.date}</p>
          <p class="review-text">${review.review}</p>
        </li>`
        )
        .join("")}
    </ul>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <article
    class="restaurant-item"
    aria-labelledby="restaurant-${restaurant.id}"
  >
    <img
      src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"
      alt="Picture of ${restaurant.name}"
      class="restaurant-item__image"
    />
    <div class="restaurant-item__content">
      <h2 id="restaurant-${restaurant.id}" class="restaurant-item__title">
        <a href="/#/detail/${restaurant.id}">${restaurant.name}</a>
      </h2>
      <p class="restaurant-item__city">📍 ${restaurant.city}</p>
      <p class="restaurant-item__rating">⭐ Rating: ${restaurant.rating}</p>
      <p class="restaurant-item__description">${restaurant.description}</p>
    </div>
  </article>
`;

const createFavoriteButtonTemplate = () => `
  <button aria-label="favorite this restaurant" id="favoriteButton" class="favorite">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createFavoritedButtonTemplate = () => `
  <button aria-label="unfavorite this restaurant" id="favoriteButton" class="favorite">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createFavoriteButtonTemplate,
  createFavoritedButtonTemplate,
};
