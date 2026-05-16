<template>
  <div class="movie-card">
    <img :src="item.image" :alt="item.title" />
    <h3>{{ item.title }}</h3>
    <p class="genre">Жанр: {{ item.genre }}</p>
    <p class="rating">Рейтинг: ⭐ {{ item.rating }}</p>
    
    <div class="card-actions">
      <button class="btn info-btn" @click="goToDetails">Деталі</button>
      
      <button 
        v-if="!isFavorite" 
        class="btn fav-btn" 
        @click="$emit('toggleFavorite', item.id)"
      >
        ❤ Додати
      </button>
      <button 
        v-else 
        class="btn remove-btn" 
        @click="$emit('toggleFavorite', item.id)"
      >
        ❌ Видалити
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Movie } from '../types';

// Макроси Composition API для типізації вхідних даних та подій
const props = defineProps<{
  item: Movie;
  isFavorite: boolean;
}>();

defineEmits<{
  (e: 'toggleFavorite', id: number): void;
}>();

const router = useRouter();

// Програмна навігація на сторінку деталей конкретного фільму
const goToDetails = () => {
  router.push({ name: 'MovieDetail', params: { id: props.item.id } });
};
</script>

<style scoped>
.movie-card {
  background-color: #1c1c1c;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  width: 240px;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #333;
}
.movie-card:hover { 
  transform: scale(1.03); 
  box-shadow: 0 0 15px var(--color-accent);
}
.movie-card img { width: 100%; height: 320px; object-fit: cover; border-radius: 8px; }
.movie-card h3 { margin: 12px 0 6px; color: #fff; font-size: 1.3rem; }
.genre { color: #aaa; font-size: 0.95rem; margin-bottom: 4px; }
.rating { color: var(--color-accent); font-weight: bold; }
.card-actions { display: flex; gap: 10px; justify-content: center; margin-top: 15px; }

.btn { 
  border: none; 
  padding: 8px 14px; 
  border-radius: 6px; 
  cursor: pointer; 
  font-weight: bold; 
  transition: 0.2s;
}
.info-btn { background-color: var(--color-accent); color: #000; }
.info-btn:hover { background-color: #e6c200; }
.fav-btn { background-color: #28a745; color: white; }
.fav-btn:hover { background-color: #218838; }
.remove-btn { background-color: #dc3545; color: white; }
.remove-btn:hover { background-color: #c82333; }
</style>