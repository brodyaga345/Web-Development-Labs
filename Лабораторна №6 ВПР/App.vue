<template>
  <div class="app-wrapper">
    <header>
      <h1>Кінотеатр Укр-сіті</h1>
      <p>Кінотеатр нашої країни, аналогів якому нема!</p>
    </header>

    <nav aria-label="Головна навігація">
      <ul>
        <li><RouterLink to="/" active-class="active-link">Головна</RouterLink></li>
        <li><RouterLink to="/sessions" active-class="active-link">Сеанси</RouterLink></li>
        <li>
          <RouterLink to="/favorites" active-class="active-link">
            Обране 
            <span class="badge" v-if="store.totalFavoritesCount > 0">
              {{ store.totalFavoritesCount }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <RouterView />
    </main>

    <footer>
      <p>Контакти: info@Ukr-city.ua</p>
      <p>© 2026 CinemaStar</p>
      <p>Гаряча лінія: 096 759 88 23</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useFavoritesStore } from './stores/useFavoritesStore';

const store = useFavoritesStore();
</script>

<style>
/* Глобальні стилі з твоєї ЛР №2. 
  Тег style спеціально без атрибуту scoped, щоб стилі застосовувалися до всього SPA.
*/
:root {
    --color-primary: #0A0A0A;
    --color-accent: #FFD700;
    --color-bg: #111;
    --color-text: #eaeaf0;
    --spacing-md: 20px;
    --spacing-lg: 40px;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
}

header {
    background-color: var(--color-primary);
    padding: var(--spacing-md);
    text-align: center;
    border-bottom: 2px solid var(--color-accent);
}

header h1 {
    color: var(--color-accent);
    font-size: 2.5rem;
}

nav {
    background-color: #1a1a1a;
    padding: 12px;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 35px;
}

nav a {
    color: var(--color-text);
    text-decoration: none;
    font-size: 1.2rem;
    transition: 0.3s;
    font-weight: 500;
}

nav a:hover, .active-link {
    color: var(--color-accent) !important;
}

/* Стиль круглого червоного лічильника для обраного */
.badge {
  background: #dc3545;
  color: white;
  border-radius: 50%;
  padding: 2px 7px;
  font-size: 0.8rem;
  margin-left: 5px;
  vertical-align: middle;
  font-weight: bold;
}

.main-content {
    padding: var(--spacing-md);
    max-width: 1200px;
    margin: auto;
    min-height: 65vh; /* Гарантує, що футер не буде стрибати догори на пустих сторінках */
}

.center-title {
    text-align: center;
    margin-bottom: var(--spacing-md);
    font-size: 2rem;
    color: var(--color-accent);
}

footer {
    background-color: var(--color-primary);
    text-align: center;
    padding: var(--spacing-md);
    border-top: 2px solid var(--color-accent);
    color: #aaa;
    margin-top: var(--spacing-lg);
}
</style>