<template>
  <div class="home-view">
    <section class="about-section">
      <h2>Про кінотеатр</h2>
      <p>Укр-сіті — це сучасний кінотеатр з комфортними залами та новітнім обладнанням.</p>
      <p>У нашому кінотеатрі ви знайдете <strong>найновіші прем'єри</strong> та <em>улюблені фільми</em> для всієї родини.</p>
    </section>

    <section>
      <h2 class="center-title">Зараз у прокаті</h2>
      <div class="movies-grid">
        <MovieCard 
          v-for="movie in store.movies" 
          :key="movie.id"
          :item="movie"
          :isFavorite="store.favoriteIds.includes(movie.id)"
          @toggleFavorite="handleFavoriteToggle"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '../stores/useFavoritesStore';
import MovieCard from '../components/MovieCard.vue';

const store = useFavoritesStore();

// Додавання або видалення зі списку обраного при натисканні на кнопку в картці
const handleFavoriteToggle = (id: number) => {
  if (store.favoriteIds.includes(id)) {
    store.removeFromFavorites(id);
  } else {
    store.addToFavorites(id);
  }
};
</script>

<style scoped>
.about-section { 
  background: #1a1a1a; 
  padding: 20px; 
  border-radius: 8px; 
  margin-bottom: 35px;
  border-left: 4px solid var(--color-accent);
}
.about-section h2 { margin-bottom: 10px; color: #fff; }
.about-section p { margin-bottom: 8px; color: #ccc; }
.movies-grid { display: flex; flex-wrap: wrap; gap: 25px; justify-content: center; }
</style>