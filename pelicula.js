(() => {
  const root = document.querySelector('#cast-switcher');
  if (!root) return;
  const buttons = [...root.querySelectorAll('.cast-switcher-name')];
  const card = root.querySelector('.cast-switcher-card');
  // Repetir los primeros nombres al final para reforzar la sensación de cinta circular en móvil.
  const nav = root.querySelector('.cast-switcher-nav');
  ['marc', 'gonzalo'].forEach(key => {
    const sourceButton = buttons.find(button => button.dataset.cast === key);
    if (!nav || !sourceButton || nav.querySelector('[data-cast-clone="' + key + '"]')) return;
    const clone = sourceButton.cloneNode(true);
    clone.dataset.castClone = key;
    clone.classList.remove('is-active');
    clone.setAttribute('aria-pressed', 'false');
    nav.appendChild(clone);
    clone.addEventListener('click', () => select(key));
  });
  const people = {
    marc: { name: 'Marc <em>Bonnin</em>', character: 'Sergio Martínez', role: 'ACTOR · PRODUCTOR', bio: 'Actor y productor mallorquín formado en Interpretación Textual en la RESAD. Desarrolla su carrera entre el cine, la televisión y el teatro, y compagina la interpretación con la producción cinematográfica.', photo: 'https://www.aleighthouse.com/wp-content/uploads/2022/06/MARC-BONNIN-FOTO-4-715x1024.jpg', alt: 'Retrato profesional de Marc Bonnin, fotografía de su perfil de representación', caption: 'MARC BONNIN', works: [['2026','Papi Ricky','PELÍCULA'],['2026','Por cien millones','SERIE'],['2022','Élite','SERIE'],['2022','42 segundos','PELÍCULA']] },
    gonzalo: { name: 'Gonzalo <em>Cortés</em>', role: 'ACTOR · GUIONISTA · PRODUCTOR', bio: 'Actor, guionista y productor nacido en Málaga y licenciado en Arte Dramático. Su trayectoria combina la interpretación con la escritura y la producción, con experiencia en distintos ámbitos de las artes escénicas y audiovisuales.', photo: 'imágenes/actores/gonzalo-cortes.jpg', alt: 'Retrato de Gonzalo Cortés', caption: 'GONZALO CORTÉS', character: 'Miguel', works: [['2020','Siempre es Otoño','CORTOMETRAJE'],['2024','Dos Lunas','PELÍCULA'],['2026','The art of walking','PELÍCULA'],['2023','Folie à Famille','PELÍCULA']] },
    ruben: { name: 'Rubén <em>Faura</em>', role: 'ACTOR · CÓMICO · PRESENTADOR', bio: 'Actor, cómico y presentador español. Su perfil artístico combina la interpretación con la comedia y la comunicación, y desarrolla también su faceta creativa en la escritura y la dirección.', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKOpixj3Q1boeQ-AzLmMGNkfGcwLLkA4DtPp2zqJiL1Q&s=10', alt: 'Retrato de Rubén Faura publicado en su web oficial', caption: 'RUBÉN FAURA', character: 'Agustín Ceballos', works: [['2025','La que se avecina','SERIE'],['2024','Sujétame el cubata','CORTOMETRAJE'],['2023','Orgasmo','TEATRO'],['2016','Ligones','PELÍCULA']] },
    eva: { name: 'Eva <em>Bonald</em>', role: 'ACTRIZ · GUIONISTA · CREADORA', bio: 'Actriz y creadora española con formación en interpretación ante la cámara y distintas técnicas actorales. Su trabajo abarca el audiovisual y las artes escénicas, y combina la interpretación con la escritura y el desarrollo de proyectos propios.', photo: 'https://irp.cdn-website.com/7543631a/dms3rep/multi/opt/EVA_BONALD_AMCA_13-1920w.jpeg', alt: 'Retrato profesional de Eva Bonald publicado por su agencia', caption: 'EVA BONALD', character: 'Cristina García', works: [['2025','El Donante','CORTOMETRAJE'],['2025','Yo aquí Solo','CORTOMETRAJE'],['2025','Vértigo','CORTOMETRAJE'],['2018','La Peste','SERIE']] },
    antonio: { name: 'Antonio <em>Reyes</em>', role: 'ACTOR', bio: 'Actor formado en Interpretación Textual en la RESAD. Su trayectoria profesional se desarrolla entre el cine, la televisión y el teatro, con experiencia en distintos formatos de ficción y en la interpretación de personajes diversos.', photo: 'https://lirp.cdn-website.com/7543631a/dms3rep/multi/opt/AntonioReyes17-min-1920w.jpg', alt: 'Retrato profesional de Antonio Reyes publicado por su agencia', caption: 'ANTONIO REYES', character: 'Don Ramón', works: [['2025','El Jardinero','SERIE'],['2016','El Ministerio del Tiempo','SERIE'],['2011–13','Gran Hotel','SERIE'],['2020–21','Servir y Proteger','SERIE']] },
    jaime: { name: 'Jaime <em>Wang</em>', role: 'ACTOR · PRODUCTOR', bio: 'Actor español que desarrolla su carrera en el cine y la televisión. Su perfil combina trabajos en distintos formatos audiovisuales, desde la ficción televisiva hasta el cortometraje.', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS49pJ5yb5bWZghuIO461mFg0zP2BtlhaBwPtl-ZRgMaQ&s=10', alt: 'Fotografía de Jaime Wang', caption: 'JAIME WANG', character: 'SR. Chen', works: [['2026','El Donante','CORTOMETRAJE'],['2022','Tú no eres especial','SERIE'],['2021','3 caminos','SERIE'],['2020','Tótem Loba','CORTOMETRAJE']] },
    angel: { name: 'Ángel <em>Martínez</em>', role: 'ACTOR', bio: 'Actor español con experiencia en televisión, cortometrajes y videoclips. Su trayectoria abarca distintos formatos de ficción, tanto en producciones televisivas como en proyectos audiovisuales independientes.', photo: 'https://www.aleighthouse.com/wp-content/uploads/2019/11/Captura-de-pantalla-2025-07-28-a-las-17.33.05-700x797.png', alt: 'Retrato profesional de Ángel Martínez publicado por su agencia en 2025', caption: 'ÁNGEL MARTÍNEZ', character: 'Raúl Cisneros', works: [['2025','Los Protegidos: ADN','SERIE'],['—','Nuovo Tentativo','CORTOMETRAJE'],['—','Adiós','CORTOMETRAJE'],['—','Hermanos','CORTOMETRAJE']] }
  };
  function select(key) {
    if (buttons.some(button => button.dataset.cast === key && button.classList.contains('is-active'))) return;
    const previousKey = buttons.find(button => button.classList.contains('is-active'))?.dataset.cast;
    const person = people[key];
    if (!person) return;
    buttons.forEach(button => {
      const active = button.dataset.cast === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const nav = root.querySelector('.cast-switcher-nav');
    const marcClone = nav?.querySelector('[data-cast-clone="marc"]');
    if (marcClone) {
      const cloneActive = key === 'marc' && previousKey === 'angel';
      marcClone.classList.toggle('is-active', cloneActive);
      marcClone.setAttribute('aria-pressed', String(cloneActive));
    }
    let activeButton = buttons.find(button => button.dataset.cast === key);
    if (key === 'marc' && previousKey === 'angel' && marcClone) activeButton = marcClone;
    if (activeButton && window.matchMedia('(max-width: 650px)').matches && nav) {
      const targetLeft = activeButton.offsetLeft - (nav.clientWidth - activeButton.offsetWidth) / 2;
      nav.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
    card.classList.remove('cast-card-enter');
    void card.offsetWidth;
    card.classList.add('cast-card-enter');
    const portrait = card.querySelector('.cast-switcher-portrait');
    let photo = portrait.querySelector('.cast-switcher-photo');
    if (person.photo) {
      if (!photo) {
        photo = document.createElement('img');
        photo.className = 'cast-switcher-photo';
        portrait.prepend(photo);
      }
      photo.onerror = () => { photo.hidden = true; };
      photo.src = person.photo;
      photo.alt = person.alt;
      photo.dataset.castPhoto = key;
      photo.hidden = false;
    } else if (photo) {
      photo.hidden = true;
      photo.removeAttribute('src');
    }
    portrait.querySelector('.cast-portrait-caption').textContent = person.caption;
    card.querySelector('.cast-switcher-role').textContent = person.role;
    card.querySelector('.cast-switcher-title').innerHTML = person.name;
    const character = card.querySelector('.cast-switcher-character');
    character.textContent = person.character || '';
    character.hidden = !person.character;
    card.querySelector('.cast-switcher-bio').textContent = person.bio;
    card.querySelector('.cast-switcher-works').innerHTML = person.works.map(work => '<li><span>'+work[0]+'</span><div class="cast-work-info"><em>'+work[1]+'</em><small>'+(work[2] || 'PROYECTO')+'</small></div></li>').join('');

  }
  const castNav = root.querySelector('.cast-switcher-nav');
  if (castNav) {
    castNav.addEventListener('pointerleave', () => {
      if (window.matchMedia('(min-width: 651px)').matches) select('marc');
    });
  }
  buttons.forEach(button => {
    button.addEventListener('pointerenter', () => {
      if (window.matchMedia('(min-width: 651px)').matches) select(button.dataset.cast);
    });
    button.addEventListener('focus', () => {
      if (window.matchMedia('(min-width: 651px)').matches) select(button.dataset.cast);
    });
    button.addEventListener('click', () => select(button.dataset.cast));
  });

  // En móvil, deslizar la propia ficha cambia de actor y desplaza la fila de nombres con ella.
  let swipeStartX = 0;
  let swipeStartY = 0;
  const swipeSurface = card;
  let swipeAxis = null;
  swipeSurface.style.touchAction = 'pan-y pinch-zoom';
  swipeSurface.addEventListener('touchstart', event => {
    if (!event.touches || event.touches.length !== 1) return;
    swipeStartX = event.touches[0].clientX;
    swipeStartY = event.touches[0].clientY;
    swipeAxis = null;
  }, { passive: true });
  swipeSurface.addEventListener('touchmove', event => {
    if (!window.matchMedia('(max-width: 650px)').matches || !event.touches || event.touches.length !== 1) return;
    const dx = event.touches[0].clientX - swipeStartX;
    const dy = event.touches[0].clientY - swipeStartY;
    if (!swipeAxis && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      swipeAxis = Math.abs(dx) > Math.abs(dy) * 1.15 ? 'horizontal' : 'vertical';
    }
    // Al detectar un gesto horizontal, evitar que el navegador desplace la página arriba o abajo.
    if (swipeAxis === 'horizontal') event.preventDefault();
  }, { passive: false });
  swipeSurface.addEventListener('touchend', event => {
    if (!window.matchMedia('(max-width: 650px)').matches || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - swipeStartX;
    const dy = event.changedTouches[0].clientY - swipeStartY;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
    const currentIndex = buttons.findIndex(button => button.classList.contains('is-active'));
    const nextIndex = dx < 0
      ? (currentIndex + 1) % buttons.length
      : (currentIndex - 1 + buttons.length) % buttons.length;
    if (nextIndex !== currentIndex) select(buttons[nextIndex].dataset.cast);
  }, { passive: true });
  // La ficha inicial de Marc ya está renderizada en el HTML.
})();

(() => {
  const modal = document.getElementById('external-preview-modal');
  if (!modal) return;
  const title = document.getElementById('external-preview-title');
  const content = document.getElementById('external-preview-content');
  const openLink = document.getElementById('external-preview-open');
  let lastFocus = null;
  function closePreview() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('external-preview-open');
    content.replaceChildren();
    if (lastFocus) lastFocus.focus();
  }
  function showPreview(anchor) {
    lastFocus = anchor;
    const url = anchor.href;
    const host = new URL(url).hostname.replace('www.', '');
    const label = anchor.getAttribute('aria-label') || anchor.innerText.trim().replace(/\s+/g, ' ') || host;
    const context = anchor.closest('article, .film-news-card, .social-card, section, footer');
    const contextText = context ? context.innerText.trim().replace(/\s+/g, ' ').slice(0, 340) : '';
    title.textContent = label;
    openLink.href = url;
    content.replaceChildren();
    if (host.includes('instagram.com')) {
      const follow = document.createElement('a');
      follow.className = 'instagram-follow-cta';
      follow.href = 'https://www.instagram.com/javierdiazcaballero/';
      follow.target = '_blank';
      follow.rel = 'noopener noreferrer';
      follow.textContent = 'Seguir';
      content.appendChild(follow);
      const quote = document.createElement('blockquote');
      quote.className = 'instagram-media';
      quote.setAttribute('data-instgrm-permalink', url);
      quote.setAttribute('data-instgrm-version', '14');
      quote.style.cssText = 'background:#fff;border:0;border-radius:8px;margin:0 auto;max-width:540px;min-width:280px;width:100%;';
      content.appendChild(quote);
      if (!document.querySelector('script[data-instagram-embed]')) {
        const embedScript = document.createElement('script');
        embedScript.async = true;
        embedScript.src = 'https://www.instagram.com/embed.js';
        embedScript.dataset.instagramEmbed = 'true';
        embedScript.onload = () => { if (window.instgrm) window.instgrm.Embeds.process(); };
        document.body.appendChild(embedScript);
      } else if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    } else if (anchor.classList.contains('film-news-card')) {
      const article = document.createElement('article');
      article.className = 'article-reading-preview';
      const sourceLabel = document.createElement('div');
      sourceLabel.className = 'article-reading-source';
      sourceLabel.textContent = host.includes('ultimahora') ? 'ÚLTIMA HORA' : 'EL BLOG DE CINE ESPAÑOL';
      const dateLabel = document.createElement('div');
      dateLabel.className = 'article-reading-date';
      const articleData = {
        'https://www.elblogdecineespanol.com/?p=83919': {
          date: '2 JULIO 2026',
          paragraphs: [
            'El artículo anuncia el final del rodaje de ¿Quién mató al jefe en Navidad?, ópera prima de Javier Díaz, producida por Castilla Nova Productions y con Marc Bonnin en el reparto.',
            'Presenta la película como una comedia coral que mezcla humor negro, misterio y thriller. La trama arranca cuando, en Nochebuena, los empleados descubren que su jefe ha muerto justo antes de cerrar un acuerdo decisivo para la empresa.'
          ]
        },
        'https://www.ultimahora.es/noticias/cultura/2026/08/18/2690869/javier-diaz-caballero-despedido-anterior-trabajando-rodando-primera-peli-alli.html': {
          date: '18 AGOSTO 2026',
          paragraphs: [
            'La entrevista cuenta cómo Javier Díaz Caballero rodó su primera película en las mismas oficinas donde había trabajado durante años. La película está producida por Marc Bonnin y sitúa su historia en una empresa durante la noche de Navidad.',
            'También habla del reto de rodar en planos secuencia: el planteamiento inicial se dividió finalmente en 28 bloques de unos siete u ocho minutos para mantener al espectador dentro de la jornada laboral y cuidar el ritmo.'
          ]
        },
        'https://www.ultimahora.es/noticias/cultura/2026/08/06/2683843/marc-bonnín-salto-produccion-estrenara-comedia-navidena.html': {
          date: '6 AGOSTO 2026',
          paragraphs: [
            'La noticia repasa el salto de Marc Bonnin a la producción de largometrajes. El actor mallorquín participa como productor en ¿Quién mató al jefe en Navidad?, una comedia navideña rodada en Mallorca.',
            'El artículo también sitúa este proyecto dentro de su trayectoria como actor y presenta la película como su nueva apuesta en producción cinematográfica.'
          ]
        }
      };
      const data = articleData[url];
      dateLabel.textContent = data ? data.date : '';
      const heading = document.createElement('h3');
      heading.className = 'article-reading-title';
      heading.textContent = anchor.querySelector('h3') ? anchor.querySelector('h3').textContent : label;
      const rule = document.createElement('div');
      rule.className = 'article-reading-rule';
      article.append(sourceLabel, dateLabel, heading, rule);
      (data ? data.paragraphs : [anchor.querySelector('p')?.textContent || 'Vista previa del artículo.']).forEach(text => {
        const paragraph = document.createElement('p');
        paragraph.className = 'article-reading-paragraph';
        paragraph.textContent = text;
        article.appendChild(paragraph);
      });
      const note = document.createElement('p');
      note.className = 'article-reading-note';
      note.textContent = 'Resumen de lectura preparado a partir de la noticia original. Para consultar el artículo completo, puedes abrir la fuente voluntariamente.';
      article.appendChild(note);
      content.appendChild(article);
    } else if (host.includes('imdb.com')) {
      const profile = document.createElement('article');
      profile.className = 'imdb-profile-preview';
      const head = document.createElement('div');
      head.className = 'imdb-profile-head';
      const monogram = document.createElement('div');
      monogram.className = 'imdb-profile-monogram';
      monogram.textContent = 'JD';
      const identity = document.createElement('div');
      const name = document.createElement('h3');
      name.className = 'imdb-profile-name';
      name.textContent = 'Javier Díaz Caballero';
      const roles = document.createElement('p');
      roles.className = 'imdb-profile-roles';
      roles.textContent = 'Director · Editor';
      identity.append(name, roles);
      head.append(monogram, identity);
      const line = document.createElement('div');
      line.className = 'imdb-profile-divider';
      const caption = document.createElement('p');
      caption.className = 'imdb-profile-caption';
      caption.textContent = 'Perfil profesional en IMDb';
      const credits = document.createElement('div');
      credits.className = 'imdb-profile-credit';
      const creditName = document.createElement('strong');
      creditName.textContent = '¿Quién mató al jefe en Navidad?';
      const creditRole = document.createElement('span');
      creditRole.textContent = 'Largometraje';
      credits.append(creditName, creditRole);
      profile.append(head, line, caption, credits);
      content.appendChild(profile);
    } else {
      const card = document.createElement('div');
      card.className = 'external-preview-card';
      const source = document.createElement('span');
      source.className = 'external-preview-source';
      source.textContent = host;
      const description = document.createElement('p');
      description.className = 'external-preview-description';
      description.textContent = contextText || ('Has seleccionado contenido de ' + host + '. Puedes consultar la referencia desde aquí sin salir automáticamente del portfolio.');
      const note = document.createElement('p');
      note.className = 'external-preview-note';
      note.textContent = 'La página completa de esta fuente no se puede garantizar dentro de otra web. Permaneces en el portfolio; solo saldrás si eliges abrir la fuente.';
      card.append(source, description, note);
      content.appendChild(card);
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('external-preview-open');
    modal.querySelector('[data-preview-close="true"]').focus();
  }
  document.querySelectorAll('a[target="_blank"][href^="https://"]').forEach(anchor => {
    if (anchor.dataset.video || anchor.closest('#external-preview-modal')) return;
    const targetHost = new URL(anchor.href).hostname;
    if (targetHost.includes('youtube.com') || targetHost.includes('youtu.be') || targetHost.includes('instagram.com') || targetHost.includes('imdb.com')) return;
    anchor.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showPreview(anchor);
    });
  });
  modal.addEventListener('click', event => {
    if (event.target.dataset.previewClose === 'true') closePreview();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closePreview();
  });
})();