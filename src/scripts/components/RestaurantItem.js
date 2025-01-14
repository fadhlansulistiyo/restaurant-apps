import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import CONFIG from '../global/config';

class RestaurantItem extends LitWithoutShadowDom {
  static properties = {
    id: { type: String },
    name: { type: String },
    description: { type: String },
    pictureId: { type: String },
    city: { type: String },
    rating: { type: Number },
  };

  constructor() {
    super();
    this.id = '';
    this.name = '';
    this.description = '';
    this.pictureId = '';
    this.city = '';
    this.rating = 0;
  }

  render() {
    return html`
      <article class="restaurant-item" aria-labelledby="restaurant-${this.id}">
        <img
          src="${CONFIG.BASE_IMAGE_URL + this.pictureId}"
          alt="Picture of ${this.name}"
          class="restaurant-item__image"
        />
        <div class="restaurant-item__content">
          <h2 id="restaurant-${this.id}" class="restaurant-item__title">
            <a href="/#/detail/${this.id}">${this.name}</a>
          </h2>
          <p class="restaurant-item__city">📍 ${this.city}</p>
          <p class="restaurant-item__rating">⭐ Rating: ${this.rating}</p>
          <p class="restaurant-item__description">${this.description}</p>
        </div>
      </article>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
