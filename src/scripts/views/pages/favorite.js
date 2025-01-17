import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import FavoriteRestaurantView from "./favorite-restaurant/favorite-restaurant-view";
import FavoriteRestaurantShowPresenter from "./favorite-restaurant/favorite-restaurant-show-presenter";

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurant: FavoriteRestaurantIdb,
    });
  },
};

export default Favorite;
