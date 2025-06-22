const theaters = [
  { name: "The Miracle Theatre", file: "miracle-movies.json" },
  { name: "AFI Silver", file: "afi-silver-movies.json" },
  { name: "Angelika Film Center – DC", file: "angelika-dc-movies.json" },
  { name: "Suns Cinema", file: "suns-cinema-movies.json" },
  { name: "Alamo Drafthouse – DC Metro", file: "alamo-dc-movies.json" }
];

async function loadAll() {
  const container = document.getElementById('content');
  container.innerHTML = '';
  for (const t of theaters) {
    try {
      const res = await fetch(t.file);
      if (!res.ok) throw new Error();
      const movies = await res.json();

      const thDiv = document.createElement('div');
      thDiv.className = 'theater';
      thDiv.innerHTML = `<h2>${t.name}</h2>`;
      movies.forEach(m => {
        const mDiv = document.createElement('div');
        mDiv.className = 'movie';
        mDiv.innerHTML = `<div class="movie-title">${m.title}</div>
                          <div class="movie-date">${m.date} | ${m.time}</div>`;
        thDiv.appendChild(mDiv);
      });

      container.appendChild(thDiv);
    } catch {
      console.error(`Failed to load ${t.name}`);
    }
  }
}

loadAll();
