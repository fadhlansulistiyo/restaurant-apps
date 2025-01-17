Feature("Liking Restaurants");

const assert = require("assert");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("showing empty favorited restaurants", ({ I }) => {
  I.see("You haven't added any favorite restaurants yet.", ".empty-message");
});

Scenario("liking one restaurant", async ({ I }) => {
  I.see("You haven't added any favorite restaurants yet.", ".empty-message");
  I.amOnPage("/");

  I.seeElement(".restaurant-item__title a");

  const firstRestaurant = locate(".restaurant-item__title a").first();
  const firstRestaurantTitle = (await I.grabTextFrom(firstRestaurant)).trim();
  I.click(firstRestaurant);

  I.seeElement("#favoriteButton");
  I.click("#favoriteButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-item");

  const favoritedRestaurantTitle = (
    await I.grabTextFrom(".restaurant-item__title")
  ).trim();

  assert.strictEqual(firstRestaurantTitle, favoritedRestaurantTitle);
});

Scenario("cancel liking a restaurant", async ({ I }) => {
  I.see("You haven't added any favorite restaurants yet.", ".empty-message");
  I.amOnPage("/");

  I.seeElement(".restaurant-item__title a");
  const firstRestaurant = locate(".restaurant-item__title a").first();
  const firstRestaurantTitle = (await I.grabTextFrom(firstRestaurant)).trim();
  I.click(firstRestaurant);

  I.seeElement("#favoriteButton");
  I.click("#favoriteButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-item");
  const favoritedRestaurantTitle = (
    await I.grabTextFrom(".restaurant-item__title")
  ).trim();
  assert.strictEqual(firstRestaurantTitle, favoritedRestaurantTitle);

  I.click(".restaurant-item__title a");
  I.seeElement("#favoriteButton");
  I.click("#favoriteButton");

  I.amOnPage("/#/favorite");
  I.see("You haven't added any favorite restaurants yet.", ".empty-message");
});
