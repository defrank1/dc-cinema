async function loadMovies() {
  try {
    const response = await fetch('miracle-movies.json');
    if (!response.ok) throw new Error('Failed to load movie data');
    
    const data = await response.json();
    const container = document.getElementById('content');
    container.innerHTML = '';

    data.forEach(theater => {
      const theaterDiv = document.createElement('div');
      theaterDiv.className = 'theater';

      const theaterTitle = document.createElement('h2');
      theaterTitle.textContent = theater.theater;
      theaterDiv.appendChild(theaterTitle);

      theater.movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'movie-title';
        titleDiv.textContent = movie.title;

        const dateDiv = document.createElement('div');
        dateDiv.className = 'movie-date';
        dateDiv.textContent = `${movie.date} | ${movie.time}`;

        movieDiv.appendChild(titleDiv);
        movieDiv.appendChild(dateDiv);

        theaterDiv.appendChild(movieDiv);
      });

      container.appendChild(theaterDiv);
    });
  } catch (err) {
    document.getElementById('content').textContent = 'Failed to load movies.';
    console.error(err);
  }
}

loadMovies();
