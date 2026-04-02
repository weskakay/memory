export function renderHome(container: HTMLElement, onPlay: () => void): void {
  container.innerHTML = `
    <main class="home">
      <div class="home__controller">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="50" width="140" height="90" rx="20" stroke="currentColor" stroke-width="6"/>
          <circle cx="70" cy="85" r="8" stroke="currentColor" stroke-width="5"/>
          <circle cx="130" cy="85" r="8" stroke="currentColor" stroke-width="5"/>
          <rect x="62" y="100" width="16" height="6" rx="3" stroke="currentColor" stroke-width="3"/>
          <rect x="67" y="95" width="6" height="16" rx="3" stroke="currentColor" stroke-width="3"/>
          <circle cx="125" cy="78" r="3" fill="currentColor"/>
          <circle cx="135" cy="78" r="3" fill="currentColor"/>
          <circle cx="125" cy="92" r="3" fill="currentColor"/>
          <circle cx="135" cy="92" r="3" fill="currentColor"/>
          <rect x="85" y="140" width="12" height="20" rx="4" stroke="currentColor" stroke-width="4"/>
          <rect x="103" y="140" width="12" height="20" rx="4" stroke="currentColor" stroke-width="4"/>
        </svg>
      </div>
      <div class="home__content">
        <p class="home__subtitle">It's play time.</p>
        <h1 class="home__title">Ready to play?</h1>
        <button class="home__button">
          <svg class="home__button-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="6" width="20" height="12" rx="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <circle cx="8" cy="12" r="2" fill="currentColor"/>
            <circle cx="16" cy="12" r="2" fill="currentColor"/>
          </svg>
          Play →
        </button>
      </div>
    </main>
  `;

  container.querySelector('.home__button')?.addEventListener('click', onPlay);
}
