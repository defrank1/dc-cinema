console.log("🔧 script.js loaded");

const proxy = 'https://api.allorigins.win/raw?url=';
const miracleURL = 'https://themiracletheatre.com/calendar/';

fetch(proxy + encodeURIComponent(miracleURL))
  .then(res => res.text())
  .then(html => {
    console.log("✅ Fetched Miracle HTML");
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const list = document.getElementById('miracle-list');

    const events = doc.querySelectorAll('h3.mec-event-title');
    if (!events.length) {
      list.innerHTML = "<li>No upcoming events found.</li>";
      return;
    }

    events.forEach(h3 => {
  const a = h3.querySelector('a');
  const title = a?.textContent.trim();
  const url = a?.href;
  const eventBox = h3.closest('.mec-event-article');

  let dateStr = '';
  if (eventBox) {
    dateStr = eventBox.querySelector('.mec-event-datetime')?.textContent.trim()
        || eventBox.querySelector('.mec-start-date')?.textContent.trim()
        || eventBox.querySelector('time')?.getAttribute('datetime')
        || '';
  }

  if (!dateStr) return; // Skip if no date

  // Try to parse the date string into a Date object
  let eventDate = new Date(dateStr);

  // If parsing fails, try alternate parsing (some date strings might need it)
  if (isNaN(eventDate)) {
    // For example, if dateStr is like "Sat, Aug 12 8:00 PM", try this:
    eventDate = new Date(Date.parse(dateStr));
  }
  if (isNaN(eventDate)) {
    // If still invalid, skip event
    return;
  }

  const today = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);

  // Include event only if its date is between today and 7 days ahead
  if (eventDate >= today && eventDate <= sevenDaysFromNow) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${url}" target="_blank">${title}</a><div class="date">${dateStr}</div>`;
    list.appendChild(li);
  }
});


  })
  .catch(err => {
    console.error("❌ Failed to fetch Miracle data:", err);
    document.getElementById('miracle-list').innerHTML = "<li>Error loading events.</li>";
  });
