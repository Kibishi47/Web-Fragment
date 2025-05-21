<script>
  // Proportion des sections (en pourcentage)
  // Par exemple: 40/60, 50/50, 30/70, etc.
  export let topSectionHeight = 50; // Pourcentage de la hauteur totale pour la section du haut
  export let bottomSectionHeight = 50; // Pourcentage de la hauteur totale pour la section du bas
</script>

<section id="features" class="content-1">
  <h1 class="section-title">Nos fonctionnalités</h1>
  
  <!-- Section du haut -->
  <div class="parent-section top-section" style="height: {topSectionHeight}%;">
    <div class="col left">
      <h2>
        <span class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </span>
        Pour les créatifs
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, nisl erat dictum enim, nec dictum massa enim nec erat.
      </p>
      <ul>
        <li>
          <span class="list-icon">✓</span>
          Idée 1 : Ut enim ad minim veniam
        </li>
        <li>
          <span class="list-icon">✓</span>
          Idée 2 : Quis nostrud exercitation ullamco
        </li>
        <li>
          <span class="list-icon">✓</span>
          Idée 3 : Laboris nisi ut aliquip ex ea commodo
        </li>
      </ul>
    </div>
  </div>
  
  <!-- Section du bas - maintenant avec alignement en haut -->
  <div class="parent-section bottom-section" style="height: {bottomSectionHeight}%;">
    <div class="col right">
      <h2>
        <span class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </span>
        Pour les équipes
      </h2>
      <p>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <ol>
        <li>
          <span class="number">1</span>
          Collaboration en temps réel
        </li>
        <li>
          <span class="number">2</span>
          Gestion des accès simplifiée
        </li>
        <li>
          <span class="number">3</span>
          Suivi des modifications
        </li>
      </ol>
    </div>
  </div>
  
  <div class="features-footer">
    <a href="#features" class="cta-button">
      Voir toutes les fonctionnalités
      <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </a>
  </div>
</section>

<style>
.content-1 {
    max-height: 250vh;
    height: 250vh;
    background-color: var(--card-bg);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
    padding: 2.5vh 0 2vh 0;
    position: relative;
    overflow: hidden;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    transition: height 0.3s ease;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin: 0 0 2rem 0;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: var(--foreground);
    position: relative;
    z-index: 1;
    transition: font-size 0.3s ease;
}

/* Nouvelles sections parentes */
.parent-section {
    width: 100%;
    display: flex;
    position: relative;
    box-sizing: border-box;
    transition: all 0.3s ease;
}

.top-section {
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 2vh;
}

.bottom-section {
    justify-content: flex-end;
    align-items: flex-start; /* Modifié: maintenant aligné en haut */
    padding-top: 2vh; /* Modifié: padding en haut au lieu d'en bas */
}

.col {
    flex: 0 1 auto;
    width: clamp(18rem, 35vw, 30rem);
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 1rem;
    box-sizing: border-box;
    color: var(--foreground);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid var(--border);
    box-shadow: 0 10px 30px var(--shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, padding 0.3s ease;
    margin: 0 2vw;
}

.col:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px var(--shadow);
}

.left {
    margin-left: 4vw;
}

.right {
    margin-right: 4vw;
}

h2 {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    color: var(--foreground);
    transition: font-size 0.3s ease;
}

.icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--accent);
    opacity: 0.2;
    border-radius: 8px;
    margin-right: 12px;
    transition: width 0.3s ease, height 0.3s ease;
}

.icon {
    width: 24px;
    height: 24px;
    color: var(--accent);
    transition: width 0.3s ease, height 0.3s ease;
}

p {
    margin-bottom: 1.5rem;
    color: var(--muted);
    transition: font-size 0.3s ease;
}

ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.8rem;
    color: var(--foreground);
    transition: font-size 0.3s ease;
}

.list-icon {
    color: var(--accent);
    margin-right: 10px;
    font-weight: bold;
}

.number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: var(--accent);
    opacity: 0.2;
    border-radius: 50%;
    margin-right: 10px;
    font-weight: bold;
    color: var(--accent);
    transition: width 0.3s ease, height 0.3s ease;
}

.features-footer {
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 1;
}

.cta-button {
    display: inline-flex;
    align-items: center;
    color: var(--background);
    background: var(--accent);
    padding: 0.8em 1.8em;
    border-radius: 2em;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px var(--shadow);
}

.cta-button:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow);
}

.arrow-icon {
    width: 20px;
    height: 20px;
    margin-left: 8px;
    transition: width 0.3s ease, height 0.3s ease;
}

/* Tablette */
@media (max-width: 1024px) {
    .col {
        width: clamp(16rem, 45vw, 28rem);
        padding: 1.75rem;
    }
    
    .section-title {
        font-size: 2.2rem;
    }
    
    .icon-wrapper {
        width: 36px;
        height: 36px;
    }
    
    .icon {
        width: 22px;
        height: 22px;
    }
    
    .cta-button {
        font-size: 1rem;
        padding: 0.7em 1.6em;
    }
    
    .arrow-icon {
        width: 18px;
        height: 18px;
    }
}

/* Mobile */
@media (max-width: 900px) {
    .content-1 {
        height: auto;
        max-height: none;
        padding: 2rem 0;
    }
    
    .section-title {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
    }
    
    .parent-section {
        height: auto !important;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;
    }
    
    .top-section, .bottom-section {
        padding: 1vh 0;
    }
    
    .col {
        width: 90%;
        max-width: 100%;
        margin: 0 0 1.5rem 0;
        padding: 1.5rem;
    }
    
    .left, .right {
        margin-left: auto;
        margin-right: auto;
    }
    
    h2 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }
    
    .icon-wrapper {
        width: 32px;
        height: 32px;
        margin-right: 10px;
    }
    
    .icon {
        width: 18px;
        height: 18px;
    }
    
    p {
        font-size: 0.95rem;
        margin-bottom: 1rem;
    }
    
    li {
        font-size: 0.95rem;
        margin-bottom: 0.6rem;
    }
    
    .number {
        width: 22px;
        height: 22px;
    }
    
    .cta-button {
        font-size: 0.95rem;
        padding: 0.6em 1.4em;
    }
    
    .arrow-icon {
        width: 16px;
        height: 16px;
    }
}

/* Petit mobile */
@media (max-width: 480px) {
    .section-title {
        font-size: 1.6rem;
        margin-bottom: 1rem;
    }
    
    .col {
        padding: 1.25rem;
    }
    
    h2 {
        font-size: 1.2rem;
    }
    
    .icon-wrapper {
        width: 28px;
        height: 28px;
    }
    
    .icon {
        width: 16px;
        height: 16px;
    }
    
    p, li {
        font-size: 0.9rem;
    }
    
    .number {
        width: 20px;
        height: 20px;
    }
    
    .cta-button {
        font-size: 0.9rem;
        padding: 0.5em 1.2em;
    }
    
    .arrow-icon {
        width: 14px;
        height: 14px;
    }
}
</style>
