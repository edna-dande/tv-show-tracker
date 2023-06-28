<template>
  <div>
    <!-- Other components and content here -->
    <!-- <AdminLogin v-if="!isLoggedIn" />
    <Navbar v-if="isLoggedIn" />
    <TVShowList v-if="isLoggedIn" />
    <SubscriptionsView v-if="isLoggedIn" />
    <ShowDetails v-if="isLoggedIn" :show="selectedShow" />
    <FavoriteShows
      v-if="isLoggedIn"
      :favoriteShows="favoriteShows"
      @remove="removeFromFavorites"
    />
    <SearchShows v-if="isLoggedIn" :shows="shows" /> -->
    <router-view />
    <!-- Display other components or content for authenticated user -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Set to true when user is logged in
      selectedShow: {
        title: `Show 1`,
        genre: `Drama`,
        reviews: [
          { id: 1, text: `Great show!`, user: `User1` },
          { id: 2, text: `Loved the storyline.`, user: `User2` },
        ],
        cast: [
          { id: 1, name: `Actor1` },
          { id: 2, name: `Actor2` },
        ],
        ratings: [
          { id: 1, source: `Rotten Tomatoes`, value: `85%` },
          { id: 2, source: `IMDb`, value: `8.5` },
        ],
      },
    };
  },
  methods: {
    removeFromFavorites(showId) {
      // Remove the show with the provided ID from the favoriteShows array
      this.favoriteShows = this.favoriteShows.filter(
        (show) => show.id !== showId
      );
    },
  },
};
</script>
