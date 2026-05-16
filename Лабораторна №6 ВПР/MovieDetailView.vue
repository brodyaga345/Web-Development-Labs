<template>
  <div class="detail-view">
    <div v-if="movie" class="movie-detail-container">
      <img :src="movie.image" :alt="movie.title" class="detail-img" />
      <div class="detail-info">
        <h2>{{ movie.title }}</h2>
        <p class="meta-item"><strong>Жанр:</strong> {{ movie.genre }}</p>
        <p class="meta-item"><strong>Тривалість:</strong> {{ movie.duration }} хвилин</p>
        <p class="meta-item"><strong>Рейтинг кінокритиків:</strong> ⭐ {{ movie.rating }} / 10</p>
        <p class="description"><strong>Опис фільму:</strong> {{ movie.description }}</p>
        
        <button 
          class="btn-fav" 
          :class="{ 'in-favorites': isFavorite }"
          @click="toggleFavorite"
        >
          {{ isFavorite ? '❌ Видалити з обраного' : '❤ Додати до обраного' }}
        </button>
      </div>
    </div>
    
    <div v-else class="error-box">
      <h2>Помилка: Фільм не знайдено!</h2>
      <p>Такого сеансу не існує або посилання застаріло.</p>
      <RouterLink to="/" class="back-link">Повернутися на головну сторінку</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useFavoritesStore } from '../stores/useFavoritesStore';

const route = useRoute();
const store = useFavoritesStore();

// Отримуємо ID з параметрів маршруту і перетворюємо рядок у число
const movieId = computed(() => Number(route.params.id));

// Динамічний пошук потрібного фільму в масиві сховища Pinia
const movie = computed(() => store.movies.find(m => m.id === movieId.value));

const isFavorite = computed(() => store.favoriteIds.includes(movieId.value));

const toggleFavorite = () => {
  if (isFavorite.value) {
    store.removeFromFavorites(movieId.value);
  } else {
    store.addToFavorites(movieId.value);
  }
};
</script>

<style scoped>
.movie-detail-container { display: flex; gap: 40px; background: #1c1c1c; padding: 30px; border-radius: 12px; border: 1px solid #333; }
.detail-img { width: 320px; height: 480px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
.detail-info { display: flex; flex-direction: column; gap: 15px; justify-content: center; }
.detail-info h2 { color: var(--color-accent); font-size: 2.2rem; margin-bottom: 10px; }
.meta-item { font-size: 1.1rem; color: #eee; }
.description { color: #ccc; line-height: 1.7; font-size: 1.05rem; background: #111; padding: 15px; border-radius: 6px; }

.btn-fav { 
  background: #28a745; 
  color: white; 
  border: none; 
  padding: 12px 24px; 
  border-radius: 6px; 
  cursor: pointer; 
  width: fit-content; 
  font-weight: bold; 
  font-size: 1rem;
  transition: 0.2s;
}
.btn-fav:hover { background: #218838; }
.in-favorites { background: #dc3545; }
.in-favorites:hover { background: #c82333; }

.error-box { text-align: center; padding: 60px; background: #2d1212; border: 1px solid #dc3545; border-radius: 8px; }
.error-box h2 { color: #dc3545; margin-bottom: 10px; }
.back-link { color: var(--color-accent); display: inline-block; margin-top: 25px; text-decoration: none; font-weight: bold; }
.back-link:hover { text-decoration: underline; }
</style>