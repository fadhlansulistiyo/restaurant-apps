import FavoriteRestaurantView from "../src/scripts/views/pages/favorite-restaurant/favorite-restaurant-view";
import FavoriteRestaurantShowPresenter from "../src/scripts/views/pages/favorite-restaurant/favorite-restaurant-show-presenter";

describe("Showing all favorite restaurants", () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe("When no restaurants have been liked", () => {
    it("should ask for the favorite restaurants", () => {
      const favoriteRestaurant = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });

      expect(favoriteRestaurant.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it("should show the information that no restaurants have been liked", (done) => {
      document
        .getElementById("restaurantList")
        .addEventListener("restaurants:updated", () => {
          expect(document.querySelectorAll(".empty-message").length).toEqual(1);
          done();
        });

      const favoriteRestaurant = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });
    });
  });

  describe("When favorite restaurants exist", () => {
    it("should show the restaurants", (done) => {
      document
        .getElementById("restaurantList")
        .addEventListener("restaurants:updated", () => {
          expect(document.querySelectorAll(".restaurant-item").length).toEqual(
            2
          );
          done();
        });

      const favoriteRestaurant = {
        getAllRestaurants: jest.fn().mockImplementation(() => [
          {
            id: 11,
            title: "A",
            vote_average: 3,
            overview: "Sebuah film A",
          },
          {
            id: 22,
            title: "B",
            vote_average: 4,
            overview: "Sebuah film B",
          },
        ]),
      };
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });
    });
  });
});
