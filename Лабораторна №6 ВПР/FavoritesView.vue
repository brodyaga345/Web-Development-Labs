<template>
  <div class="favorites-view">
    <h2 class="center-title">Ваш список обраного</h2>

    <div class="filter-panel" v-if="store.favoriteIds.length > 0">
      <label for="fav-genre">Фільтрувати обрані за жанром: </label>
      <select id="fav-genre" v-model="favGenre">
        <option value="all">Всі обрані</option>
        <option value="Фентезі">Фентезі</option>
        <option value="Екшен">Екшен</option>
        <option value="Фантастика">Фантастика</option>
      </select>
    </div>

    <div v-if="favoriteItems.length > 0" class="movies-grid">
      <MovieCard 
        v-for="movie in favoriteItems" 
        :key="movie.id"
        :item="movie"
        :isFavorite="true"
        @toggleFavorite="store.removeFromFavorites"
      />
    </div>

    <div v-else class="empty-fav">
      <p>У вашому списку обраного порожньо (або немає фільмів обраного жанру).</p>
      <p style="font-size: 1rem; margin-top: 10px; color: #666;">Перейдіть на головну сторінку, щоб додати фільми.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import MovieCard from '../components/MovieCard.vue';

const store = useFavoritesStore();
const favGenre = ref('all');

// Виклик геттера-функції з Pinia сховища для фільтрації обраного всередині компонента
const favoriteItems = computed(() => store.favoritesByGenre(favGenre.value));
</script>

<style scoped>
.filter-panel { text-align: center; margin-bottom: 25px; }
select { 
  padding: 6px 12px; 
  background: #222; 
  color: #fff; 
  border: 1px solid var(--color-accent); 
  border-radius: 4px; 
}
.movies-grid { display: flex; flex-wrap: wrap; gap: 25px; justify-content: center; }
.empty-fav { text-align: center; color: #aa0000; margin-top: 50px; font-size: 1.3rem; background: #1a1a1a; padding: 4px; border-radius: 8px; }
</style>