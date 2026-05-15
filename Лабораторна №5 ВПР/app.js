import SessionCard from './components/SessionCard.js';

const app = Vue.createApp({

    data() {

        return {

            selectedGenre: 'all',

            sessions: [

                {
                    id: 1,
                    movie: 'Аладін',
                    genre: 'Фентезі',
                    time: '12:00',
                    hall: 'Зал 1',
                    format: '3D',
                    price: 150
                },

                {
                    id: 2,
                    movie: 'Месники: Фінал',
                    genre: 'Екшен',
                    time: '15:00',
                    hall: 'Зал 2',
                    format: 'IMAX',
                    price: 180
                },

                {
                    id: 3,
                    movie: 'Годзіла',
                    genre: 'Фантастика',
                    time: '18:00',
                    hall: 'Зал 3',
                    format: '2D',
                    price: 200
                }

            ]

        }

    },

    computed: {

        filteredSessions() {

            if (this.selectedGenre === 'all') {
                return this.sessions;
            }

            return this.sessions.filter(session =>
                session.genre === this.selectedGenre
            );

        }

    },

    components: {
        SessionCard
    }

});

app.mount('#app');