export default {

    props: {

        session: {
            type: Object,
            required: true
        }

    },

    template: `

        <div class="session-card">

            <h3>{{ session.movie }}</h3>

            <p>Час: {{ session.time }}</p>

            <p>Зал: {{ session.hall }}</p>

            <p>Формат: {{ session.format }}</p>

            <p>Ціна: {{ session.price }} грн</p>

            <slot></slot>

        </div>

    `
}