import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Movie } from '../types';

export const useFavoritesStore = defineStore('favorites', () => {

  const movies = ref<Movie[]>([
    {
      id: 1,
      title: 'Аладін',
      genre: 'Фентезі',
      rating: 7.4,
      duration: 128,
      image: 'https://upload.wikimedia.org/wikipedia/ru/1/19/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%90%D0%BB%D0%B0%D0%B4%D0%B4%D0%B8%D0%BD%C2%BB.jpg',
      description: 'Захоплююча та яскрава історія про вуличного бродягу Аладіна, чарівну лампу, вигадливого Джина та принцесу Жасмін.'
    },
    {
      id: 2,
      title: 'Месники: Фінал',
      genre: 'Екшен',
      rating: 8.4,
      duration: 181,
      image: 'https://content.rozetka.com.ua/goods/images/big/386625944.jpg',
      description: 'Фінальна і вирішальна битва супергероїв Землі проти космічного тирана Таноса за відновлення балансу у Всесвіті.'
    },
    {
      id: 3,
      title: 'Годзила: Король монстрів',
      genre: 'Фантастика',
      rating: 6.0,
      duration: 132,
      image: 'https://www.scifijapan.com/images/Godzilla/Godzilla-KOTM2019-10.jpg',
      description: 'Криптозоологічне агентство намагається стримати гігантських супермонстрів, які пробудилися і ведуть війну за домінування.'
    },
    {
      id: 4,
      title: 'Інтерстеллар',
      genre: 'Фантастика',
      rating: 8.7,
      duration: 169,
      image: 'https://i.pinimg.com/736x/5c/df/70/5cdf70bdba4808548fdfd8665f8f1db9.jpg',
      description: 'Група дослідників та астронавтів вирушає крізь нещодавно виявлену червоточину в космосі, щоб знайти нову домівку для людства.'
    },
    {
      id: 5,
      title: 'Король Лев',
      genre: 'Фентезі',
      rating: 6.9,
      duration: 118,
      image: 'https://m.media-amazon.com/images/I/819lfi-8XLL.jpg',
      description: 'Неймовірна історія про дорослішання левеняти Сімби, який долає зраду та труднощі, щоб повернути свій законний трон.'
    },
    {
      id: 6,
      title: 'Бетмен',
      genre: 'Екшен',
      rating: 7.8,
      duration: 176,
      image: 'https://static.posters.cz/image/1300/122125.jpg',
      description: 'Похмурий детективний екшен про другий рік боротьби Брюса Вейна проти корупції та серійного вбивці Загадочника в Готемі.'
    }
  ]);


  const favoriteIds = ref<number[]>([]);


  function addToFavorites(movieId: number) {
    if (!favoriteIds.value.includes(movieId)) {
      favoriteIds.value.push(movieId);
    }
  }

  function removeFromFavorites(movieId: number) {
    favoriteIds.value = favoriteIds.value.filter(id => id !== movieId);
  }


  const favoritesByGenre = computed(() => {
    return (genre: string) => {
      const favMovies = movies.value.filter(m => favoriteIds.value.includes(m.id));
      if (genre === 'all') return favMovies;
      return favMovies.filter(m => m.genre === genre);
    };
  });

  const totalFavoritesCount = computed(() => favoriteIds.value.length);

  return {
    movies,
    favoriteIds,
    addToFavorites,
    removeFromFavorites,
    favoritesByGenre,
    totalFavoritesCount
  };
});