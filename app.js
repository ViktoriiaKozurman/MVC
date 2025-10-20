/**
 * 
 * 
 */
class MovieModel {
    constructor() {
        // Набір даних із прізвищем автора (режисера)
        this.movies = [
            { title: "З міркувань совісті", directorSurname: "Мел Гибсон", releaseYear: 2016, genre: "Воєнний / Драма" },
            { title: "Зелена миля", directorSurname: "Річард Френсіс-Брюс", releaseYear: 1999, genre: "Кримінал / Фентезі" },
            { title: "Злість", directorSurname: "Девід Ейер", releaseYear: 2014, genre: "Воєнний / Боєвик" },
        ];
    }

    // Для отримання всіх фільмів
    getMovies() {
        return this.movies;
    }

    // Для додавання нового фільму
    addMovie(movie) {
        // Додаємо новий фільм до масиву
        this.movies.push(movie);
    }
}


/**
 * 
 * Відображення даних та збір введення користувача
 */
class MovieView {
    constructor() {
        this.listElement = document.getElementById('movie-list');
        this.formElement = document.getElementById('add-movie-form');
    }

    // Відображення списку фільмів
    render(movies) {
        this.listElement.innerHTML = ''; 
        
        movies.forEach(movie => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${movie.title}</strong><br>
                Режисер: <em>${movie.directorSurname}</em> (Рік: ${movie.releaseYear})<br>
                Жанр: ${movie.genre}
            `;
            this.listElement.appendChild(li);
        });
    }

    // Отримання даних із форми
    getFormData() {
        const title = document.getElementById('title').value;
        const directorSurname = document.getElementById('directorSurname').value;
        const releaseYear = document.getElementById('releaseYear').value;
        const genre = document.getElementById('genre').value;
        
        // Очищаю поля форми
        this.formElement.reset();
        
        return { 
            title: title, 
            directorSurname: directorSurname, // Автор/режисер
            releaseYear: parseInt(releaseYear),
            genre: genre
        };
    }

    // Прив'язка обробника подій форми 
    bindAddMovie(handler) {
        this.formElement.addEventListener('submit', event => {
            event.preventDefault();
            // Перевірка на порожні поля 
            if (document.getElementById('title').value && document.getElementById('directorSurname').value) {
                 // Викликаю функцію-обробник 
                handler(this.getFormData());
            } else {
                alert("Будь ласка, заповніть усі обов'язкові поля!");
            }
        });
    }
}


/**
 * 
 * 
 */
class MovieController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Відображення початкового списку
        this.onMovieListChanged(this.model.getMovies());
        this.view.bindAddMovie(this.handleAddMovie);
    }

    // Метод, що викликається, коли список фільмів змінюється 
    onMovieListChanged = (movies) => {
        this.view.render(movies);
    }

    // Додавання фільму 
    handleAddMovie = (movie) => {
        this.model.addMovie(movie);  
        this.onMovieListChanged(this.model.getMovies());
    }
}


// Запуск програми
document.addEventListener('DOMContentLoaded', () => {
    const model = new MovieModel();
    const view = new MovieView();
    new MovieController(model, view);
});