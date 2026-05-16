<template>
  <div class="sessions-view">
    <h2 class="center-title">Розклад сеансів</h2>
    
    <div class="filter-panel">
      <label for="genre">Оберіть жанр: </label>
      <select id="genre" v-model="selectedGenre">
        <option value="all">Всі жанри</option>
        <option value="Фентезі">Фентезі</option>
        <option value="Екшен">Екшен</option>
        <option value="Фантастика">Фантастика</option>
      </select>
    </div>

    <table class="sessions-table">
      <thead>
        <tr>
          <th>Фільм</th>
          <th>Жанр</th>
          <th>Рейтинг</th>
          <th>Тривалість</th>
          <th>Дія</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in filteredMovies" :key="movie.id">
          <td><strong>{{ movie.title }}</strong></td>
          <td><span class="genre-tag">{{ movie.genre }}</span></td>
          <td>⭐ {{ movie.rating }}</td>
          <td>{{ movie.duration }} хв</td>
          <td>
            <button class="table-btn" @click="goToDetails(movie.id)">Деталі</button>
          </td>
        </tr>
        <tr v-if="filteredMovies.length === 0">
          <td colspan="5" class="empty-row">Сеансів за вказаним жанром не знайдено</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFavoritesStore } from '../stores/useFavoritesStore';

const store = useFavoritesStore();
const router = useRouter();

// Реактивна змінна для збереження вибраного в select фільтра
const selectedGenre = ref('all');

// Обчислювальний масив, який автоматично реагує на зміну фільтра
const filteredMovies = computed(() => {
  if (selectedGenre.value === 'all') return store.movies;
  return store.movies.filter(m => m.genre === selectedGenre.value);
});

const goToDetails = (id: number) => {
  router.push({ name: 'MovieDetail', params: { id } });
};
</script>

<style scoped>
.filter-panel { margin-bottom: 25px; text-align: center; font-size: 1.1rem; }
select { 
  padding: 6px 12px; 
  background: #222; 
  color: #fff; 
  border: 1px solid var(--color-accent); 
  border-radius: 4px;
  cursor: pointer;
}
.sessions-table { width: 100%; border-collapse: collapse; background: #1c1c1c; border-radius: 8px; overflow: hidden; }
th, td { padding: 14px; text-align: center; border-bottom: 1px solid #333; }
th { background-color: var(--color-primary); color: var(--color-accent); font-size: 1.1rem; }
tbody tr:hover { background-color: #252525; }
.genre-tag { background: #333; padding: 3px 8px; border-radius: 12px; font-size: 0.85rem; }
.table-btn { background: var(--color-accent); border: none; padding: 6px 12px; cursor: pointer; border-radius: 4px; font-weight: bold; }
.table-btn:hover { background: #e6c200; }
.empty-row { color: #888; padding: 30px; }
</style>