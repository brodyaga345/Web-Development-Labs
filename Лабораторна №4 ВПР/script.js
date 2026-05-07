
document.addEventListener('DOMContentLoaded', () => {
    // 1. Ініціалізація та вибірка елементів [cite: 40]
    const genreSelect = document.getElementById('genre-select');
    const quickFilterButtons = document.querySelectorAll('.filter-btn');
    const movieCards = document.querySelectorAll('.movie-card');
    const counterDisplay = document.getElementById('count');

    /**
     * Основна функція фільтрації
     * @param {string} selectedGenre - Жанр для фільтрації
     */
    const filterMovies = (selectedGenre) => {
        let visibleCount = 0;

        movieCards.forEach(card => {
            // Отримуємо жанр конкретної картки через dataset 
            const cardGenre = card.dataset.genre;

            // Логіка відображення: якщо обрано "all" або жанри збігаються 
            if (selectedGenre === 'all' || cardGenre === selectedGenre) {
                card.classList.remove('hidden'); // Показуємо [cite: 14, 69]
                visibleCount++;
            } else {
                card.classList.add('hidden');    // Приховуємо [cite: 14, 69]
            }
        });

        // Динамічне оновлення вмісту (лічильника) 
        if (counterDisplay) {
            counterDisplay.textContent = visibleCount;
        }

        console.log(`Фільтрація завершена. Відображено фільмів: ${visibleCount}`);
    };

    // 2. Реєстрація обробника події 'change' для <select> [cite: 19, 72]
    genreSelect.addEventListener('change', (event) => {
        const genre = event.target.value;
        filterMovies(genre);
        
        // Скидаємо активний стан кнопок при зміні селекту
        quickFilterButtons.forEach(btn => btn.classList.remove('active'));
    });

    // 3. Реєстрація обробників події 'click' для кнопок [cite: 19, 72]
    quickFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Візуальне перемикання активного класу [cite: 14, 69]
            quickFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const genre = button.getAttribute('data-genre');
            
            // Синхронізуємо випадаючий список
            genreSelect.value = genre;
            
            filterMovies(genre);
        });
    });

    // Початковий підрахунок при завантаженні
    filterMovies('all');
});