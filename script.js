console.log('🔧 script.js loaded');

async function fetchMiracle() {
  try {
    const response = await fetch('https://themiracletheatre.com/calendar/');
    const html = await response.text();

    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html');

    // Select all event titles (h3 with class mec-event-title)
    const events = dom.querySelectorAll('h3.mec-event-title');

    const list = document.getElementById('miracle-list');
    list.innerHTML = '';

    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    events.forEach(h3 => {
      const a = h3.querySelector('a');
      const title = a?.textContent.trim();
      const url = a?.href;
      const eventBox = h3.closest('.mec-event-article');

      // Extract date string from possible selectors
      let dateStr = '';
      if (eventBox) {
        dateStr = eventBox.querySelector('.mec-event-datetime')?.textContent.trim()
          || eventBox.querySelector('.mec-start-date')?.textContent.trim()
          || eventBox.querySelector('time')?.getAttribute('datetime')
          || '';
      }
      if (!dateStr) return; // Skip if no date string

      // Parse dateStr to Date object
      let eventDate = new Date(dateStr);
      if (isNaN(eventDate)) {
        eventDate = new Date(Date.parse(dateStr));
      }
      if (isNaN(eventDate)) {
        return; // Skip if invalid date
      }

      // Filter for events in next 7 days
      if (eventDate >= today && eventDate <= sevenDaysFromNow) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a><div class="date">${dateStr}</div>`;
        list.appendChild(li);
      }
    });

    if (!list.hasChildNodes()) {
      list.innerHTML = '<li>No upcoming events in the next 7 days.</li>';
    }

    console.log('✅ Miracle events loaded');
  } catch (error) {
    console.error('Error fetching Miracle calendar:', error);
  }
}

window.addEventListener('DOMContentLoaded', fetchMiracle);
