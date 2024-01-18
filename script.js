document.addEventListener('DOMContentLoaded', function () {
    const list = document.querySelector('#movie-list ul');
    const forms = document.forms;

    // delete movies
    list.addEventListener('click', (e) => {
        if (e.target.className == 'delete') {
            const li = e.target.parentElement;
            li.parentNode.removeChild(li);
            updateLocalStorage();
        }
    })

    // add movies
    const addForm = forms['add-movie'];
    addForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // create elements
        const movieNameValue = addForm.querySelector('input[type="text"]').value;
        const releaseDateValue = addForm.querySelector('input[type="date"]').value;

        if (movieNameValue.trim() !== '' && releaseDateValue.trim() !== '') {
            const li = document.createElement('li');
            const movieName = document.createElement('span');
            const releaseDate = document.createElement('span');
            const deleteBtn = document.createElement('span');

            // add text content
            movieName.textContent = movieNameValue;
            releaseDate.textContent = releaseDateValue;
            deleteBtn.textContent = 'delete';

            // add classes
            movieName.classList.add('name');
            releaseDate.classList.add('date');
            deleteBtn.classList.add('delete');

            // append to DOM
            li.appendChild(movieName);
            li.appendChild(releaseDate);
            li.appendChild(deleteBtn);
            list.appendChild(li);

            // clear input
            addForm.querySelector('input[type="text"]').value = '';
            addForm.querySelector('input[type="date"]').value = '';

            // update local storage
            updateLocalStorage();
        } else {
            alert('Please enter both the movie name and release date.');
        }
    })

    // placeholder text for release date
    const releaseDateInput = document.getElementById('releaseDateInput');
    releaseDateInput.setAttribute('placeholder', 'Enter release date');

    // update local storage
    function updateLocalStorage() {
        const movieElements = document.querySelectorAll('#movie-list ul li');
        const movies = [];

        movieElements.forEach(movieElement => {
            const movieName = movieElement.querySelector('span.name').textContent;
            const releaseDate = movieElement.querySelector('span.date').textContent;
            movies.push({ name: movieName, date: releaseDate });
        });

        localStorage.setItem('movies', JSON.stringify(movies));
    }

    
});
