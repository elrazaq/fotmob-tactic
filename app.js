// PROTOTYPE FOTMOB TACTIC - Ver. 1.0
// Advanced Broadcast Football Motion Studio & Tactical Engine

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const fotmobUrl = document.getElementById('fotmobUrl');
  const btnFetchAuto = document.getElementById('btnFetchAuto');
  const videoTransitionOverlay = document.getElementById('videoTransitionOverlay');

  // Mode Switcher
  const btnModePrediction = document.getElementById('btnModePrediction');
  const btnModeReview = document.getElementById('btnModeReview');
  const lblActiveMode = document.getElementById('lblActiveMode');

  // Tactical Formation Tools
  const formationSelect = document.getElementById('formationSelect');
  const btnApplyFormation = document.getElementById('btnApplyFormation');
  const btnResetPositions = document.getElementById('btnResetPositions');
  const btnShiftLeft = document.getElementById('btnShiftLeft');
  const btnShiftRight = document.getElementById('btnShiftRight');
  const btnShiftUp = document.getElementById('btnShiftUp');
  const btnShiftDown = document.getElementById('btnShiftDown');

  // Duration & Fade Inputs
  const videoDurationInput = document.getElementById('videoDurationInput');
  const inTimeInput = document.getElementById('inTimeInput');
  const outTimeInput = document.getElementById('outTimeInput');
  const cardThemeSelect = document.getElementById('cardThemeSelect');

  // YouTube Bar Elements
  const btnYtPlay = document.getElementById('btnYtPlay');
  const ytPlayIcon = document.getElementById('ytPlayIcon');
  const btnYtReplay = document.getElementById('btnYtReplay');
  const ytProgressTrack = document.getElementById('ytProgressTrack');
  const ytProgressFill = document.getElementById('ytProgressFill');
  const ytCurrentTime = document.getElementById('ytCurrentTime');
  const ytDuration = document.getElementById('ytDuration');
  const ytSpeedSelect = document.getElementById('ytSpeedSelect');
  const lblInTime = document.getElementById('lblInTime');
  const lblOutTime = document.getElementById('lblOutTime');

  // Sidebar Controls
  const tabButtons = document.querySelectorAll('.tab-btn');
  const btnExportMov = document.getElementById('btnExportMov');
  const btnBarExport = document.getElementById('btnBarExport');

  // Export Modal & Canvas
  const exportModal = document.getElementById('exportModal');
  const exportProgressBar = document.getElementById('exportProgressBar');
  const exportStatusText = document.getElementById('exportStatusText');
  const exportCanvas = document.getElementById('exportCanvas');

  // Presets
  const btnPresetDerby = document.getElementById('btnPresetDerby');
  const btnPresetSpain = document.getElementById('btnPresetSpain');
  const btnPresetArsenal = document.getElementById('btnPresetArsenal');

  // Canvas Stage Elements
  const mainTitleHeader = document.getElementById('mainTitleHeader');
  const vsOpponentHeader = document.getElementById('vsOpponentHeader');
  const activeTeamHeaderLogo = document.getElementById('activeTeamHeaderLogo');
  const matchTournamentName = document.getElementById('matchTournamentName');
  const matchFormationName = document.getElementById('matchFormationName');

  const stageContent = document.getElementById('stageContent');
  const pitchArea = document.getElementById('pitchArea');
  const pitchLinesGroup = document.getElementById('pitchLinesGroup');
  const tacticalPlayersContainer = document.getElementById('tacticalPlayersContainer');

  const spotlightCard = document.getElementById('spotlightCard');
  const spotlightPhotoFrame = document.getElementById('spotlightPhotoFrame');
  const spotlightPhoto = document.getElementById('spotlightPhoto');
  const spotlightCrest = document.getElementById('spotlightCrest');
  const spotlightName = document.getElementById('spotlightName');
  const spotlightRole = document.getElementById('spotlightRole');
  const spotlightBottomHeader = document.getElementById('spotlightBottomHeader');
  const spotlightBottomContent = document.getElementById('spotlightBottomContent');

  // --- POPULAR MODERN FORMATIONS LIBRARY (Safe Padding) ---
  const FORMATION_LIBRARY = {
    '4-3-3': [
      { x: 50, y: 83 }, // GK
      { x: 86, y: 68 }, { x: 62, y: 70 }, { x: 38, y: 70 }, { x: 14, y: 68 }, // 4 DEF
      { x: 74, y: 48 }, { x: 50, y: 53 }, { x: 26, y: 48 }, // 3 MID
      { x: 82, y: 24 }, { x: 50, y: 20 }, { x: 18, y: 24 }  // 3 ATT
    ],
    '4-2-3-1': [
      { x: 50, y: 83 }, // GK
      { x: 86, y: 68 }, { x: 62, y: 70 }, { x: 38, y: 70 }, { x: 14, y: 68 }, // 4 DEF
      { x: 65, y: 55 }, { x: 35, y: 55 }, // 2 DM
      { x: 80, y: 36 }, { x: 50, y: 36 }, { x: 20, y: 36 }, // 3 AM
      { x: 50, y: 20 }  // 1 ST
    ],
    '3-4-2-1': [
      { x: 50, y: 83 }, // GK
      { x: 75, y: 70 }, { x: 50, y: 72 }, { x: 25, y: 70 }, // 3 CB
      { x: 88, y: 51 }, { x: 63, y: 54 }, { x: 37, y: 54 }, { x: 12, y: 51 }, // 4 MID
      { x: 68, y: 33 }, { x: 32, y: 33 }, // 2 AM
      { x: 50, y: 20 }  // 1 ST
    ],
    '3-5-2': [
      { x: 50, y: 83 }, // GK
      { x: 75, y: 70 }, { x: 50, y: 72 }, { x: 25, y: 70 }, // 3 CB
      { x: 88, y: 48 }, { x: 65, y: 52 }, { x: 50, y: 55 }, { x: 35, y: 52 }, { x: 12, y: 48 }, // 5 MID
      { x: 62, y: 22 }, { x: 38, y: 22 }  // 2 ST
    ],
    '4-4-2': [
      { x: 50, y: 83 }, // GK
      { x: 86, y: 68 }, { x: 62, y: 70 }, { x: 38, y: 70 }, { x: 14, y: 68 }, // 4 DEF
      { x: 86, y: 48 }, { x: 62, y: 50 }, { x: 38, y: 50 }, { x: 14, y: 48 }, // 4 MID
      { x: 62, y: 22 }, { x: 38, y: 22 }  // 2 ST
    ],
    '5-3-2': [
      { x: 50, y: 83 }, // GK
      { x: 88, y: 67 }, { x: 68, y: 72 }, { x: 50, y: 74 }, { x: 32, y: 72 }, { x: 12, y: 67 }, // 5 DEF
      { x: 70, y: 49 }, { x: 50, y: 52 }, { x: 30, y: 49 }, // 3 MID
      { x: 62, y: 22 }, { x: 38, y: 22 }  // 2 ST
    ],
    '4-1-4-1': [
      { x: 50, y: 83 }, // GK
      { x: 86, y: 68 }, { x: 62, y: 70 }, { x: 38, y: 70 }, { x: 14, y: 68 }, // 4 DEF
      { x: 50, y: 57 }, // 1 DM
      { x: 85, y: 41 }, { x: 62, y: 43 }, { x: 38, y: 43 }, { x: 15, y: 41 }, // 4 MID
      { x: 50, y: 20 }  // 1 ST
    ],
    '3-4-3': [
      { x: 50, y: 83 }, // GK
      { x: 75, y: 70 }, { x: 50, y: 72 }, { x: 25, y: 70 }, // 3 CB
      { x: 88, y: 48 }, { x: 63, y: 51 }, { x: 37, y: 51 }, { x: 12, y: 48 }, // 4 MID
      { x: 80, y: 24 }, { x: 50, y: 20 }, { x: 20, y: 24 }  // 3 ATT
    ],
    '5-2-3': [
      { x: 50, y: 83 }, // GK
      { x: 88, y: 67 }, { x: 68, y: 72 }, { x: 50, y: 74 }, { x: 32, y: 72 }, { x: 12, y: 67 }, // 5 DEF
      { x: 64, y: 48 }, { x: 36, y: 48 }, // 2 MID
      { x: 80, y: 24 }, { x: 50, y: 20 }, { x: 20, y: 24 }  // 3 ATT
    ]
  };

  // --- Studio State ---
  let currentMatch = PRESET_MATCHES['manchester_derby'] || PRESET_MATCHES['spain_croatia'];
  let currentTab = 'lineupAB';
  let activeTeamKey = 'home'; // Man City / Spain
  let activeJerseyColor = '#6CABDD';
  let currentMode = 'prediction';

  // Video / Timeline State
  let isPlaying = false;
  let currentTime = 0;
  let totalDuration = 15.0;
  let playbackRate = 1.0;
  let animTimer = null;
  let animState = 'idle'; // 'idle' | 'in' | 'active' | 'out'

  const config = {
    inTime: 1.5,
    outTime: 12.0,
    animStyle: 'elastic',
    videoFade: true,
    cardTheme: 'theme-obsidian'
  };

  function formatTime(sec) {
    if (isNaN(sec)) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 100);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
  }

  // --- Initialize Match Data ---
  function initMatch(matchData, teamKey = 'home') {
    currentMatch = matchData;
    activeTeamKey = teamKey;

    // Normalize lineup structure across different FotMob schema variants
    if (!currentMatch.content) currentMatch.content = {};
    if (!currentMatch.content.lineup) currentMatch.content.lineup = {};
    const lu = currentMatch.content.lineup;

    if (!lu.homeTeam && Array.isArray(lu.lineup) && lu.lineup.length >= 2) {
      lu.homeTeam = {
        id: lu.lineup[0].teamId,
        name: lu.lineup[0].teamName,
        starters: (lu.lineup[0].players || []).flat(),
        subs: lu.lineup[0].subs || [],
        coach: lu.lineup[0].coach,
        formation: lu.lineup[0].formation
      };
      lu.awayTeam = {
        id: lu.lineup[1].teamId,
        name: lu.lineup[1].teamName,
        starters: (lu.lineup[1].players || []).flat(),
        subs: lu.lineup[1].subs || [],
        coach: lu.lineup[1].coach,
        formation: lu.lineup[1].formation
      };
    }

    if (lu.homeTeam && Array.isArray(lu.homeTeam.starters) && lu.homeTeam.starters.length > 0 && Array.isArray(lu.homeTeam.starters[0])) {
      lu.homeTeam.starters = lu.homeTeam.starters.flat();
    }
    if (lu.awayTeam && Array.isArray(lu.awayTeam.starters) && lu.awayTeam.starters.length > 0 && Array.isArray(lu.awayTeam.starters[0])) {
      lu.awayTeam.starters = lu.awayTeam.starters.flat();
    }

    const teamColors = currentMatch.general?.teamColors || {};
    const darkColors = teamColors.darkMode || {};
    const homeColor = darkColors.home || '#6CABDD';
    const awayColor = darkColors.away || '#DA291C';
    activeJerseyColor = activeTeamKey === 'home' ? homeColor : awayColor;

    document.documentElement.style.setProperty('--team-primary-color', activeJerseyColor);

    const teams = currentMatch.header?.teams || [];
    const homeTeam = teams[0] || { name: 'Man City' };
    const awayTeam = teams[1] || { name: 'Man Utd' };

    const tabA = document.querySelector('[data-tab="lineupA"]');
    const tabB = document.querySelector('[data-tab="lineupB"]');
    if (tabA) tabA.textContent = `Line Up ${homeTeam.name}`;
    if (tabB) tabB.textContent = `Line Up ${awayTeam.name}`;

    renderCurrentTab();
    resetTimeline();
  }

  // --- Mode Switcher ---
  btnModePrediction.addEventListener('click', () => {
    currentMode = 'prediction';
    btnModePrediction.classList.add('active');
    btnModeReview.classList.remove('active');
    lblActiveMode.textContent = 'Mode Prediksi Aktif';
    lblActiveMode.className = 'text-amber-400 text-[10px] font-bold';
    mainTitleHeader.textContent = 'PREDIKSI LINE UP';
    // Make players visible in editor mode
    gsap.set('.tactical-player-node', { opacity: 1, scale: 1 });
  });

  btnModeReview.addEventListener('click', () => {
    currentMode = 'review';
    btnModeReview.classList.add('active');
    btnModePrediction.classList.remove('active');
    lblActiveMode.textContent = 'Mode Review Laga Aktif';
    lblActiveMode.className = 'text-emerald-400 text-[10px] font-bold';
    mainTitleHeader.textContent = 'STARTING LINE UP RESMI';
    renderCurrentTab();
  });

  // --- Tab Switcher Logic ---
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;

      if (currentTab === 'lineupA') activeTeamKey = 'home';
      else if (currentTab === 'lineupB') activeTeamKey = 'away';
      else if (currentTab === 'lineupAB') activeTeamKey = 'home';

      const darkColors = currentMatch.general?.teamColors?.darkMode || {};
      activeJerseyColor = activeTeamKey === 'home' ? (darkColors.home || '#6CABDD') : (darkColors.away || '#DA291C');
      document.documentElement.style.setProperty('--team-primary-color', activeJerseyColor);

      renderCurrentTab();
      resetTimeline();
    });
  });

  // --- Render by Active Tab ---
  function renderCurrentTab() {
    const header = currentMatch.header || {};
    const teams = header.teams || [];
    const home = teams[0] || { name: 'Man City', id: 8456 };
    const away = teams[1] || { name: 'Man United', id: 10260 };

    const lineup = currentMatch.content?.lineup || {};
    const activeTeamObj = activeTeamKey === 'home' ? lineup.homeTeam : lineup.awayTeam;
    const opponentTeam = activeTeamKey === 'home' ? away : home;
    const currentTeam = activeTeamKey === 'home' ? home : away;

    const titlePrefix = currentMode === 'prediction' ? 'PREDIKSI LINE UP' : 'STARTING LINE UP';
    mainTitleHeader.textContent = titlePrefix;
    vsOpponentHeader.textContent = `VS ${(opponentTeam.name || 'LAWAN').toUpperCase()}`;
    activeTeamHeaderLogo.src = `https://images.fotmob.com/image_resources/logo/teamlogo/${currentTeam.id}.png`;
    matchTournamentName.textContent = currentMatch.general?.tournamentName || 'Premier League';
    matchFormationName.textContent = `${currentTeam.name} (${activeTeamObj?.formation || '4-3-3'})`;

    const statsContainer = document.getElementById('statsContainer');
    if (statsContainer) statsContainer.classList.add('hidden');
    const genericContainer = document.getElementById('genericContainer');
    if (genericContainer) genericContainer.classList.add('hidden');

    if (currentTab === 'lineupAB') {
      pitchArea.classList.remove('hidden');
      spotlightCard.classList.remove('hidden');
      pitchLinesGroup.className = 'absolute inset-0 pitch-horizontal pointer-events-none';
      renderSideBySideLineup(lineup.homeTeam, lineup.awayTeam, home, away);
    } else if (currentTab === 'lineupA' || currentTab === 'lineupB') {
      pitchArea.classList.remove('hidden');
      spotlightCard.classList.remove('hidden');
      pitchLinesGroup.className = 'absolute inset-0 pitch-vertical pointer-events-none';
      renderSingleTeamPitch(activeTeamObj);
      renderSpotlightManager(activeTeamObj, currentTeam);
    } else if (currentTab === 'stats') {
      pitchArea.classList.add('hidden');
      spotlightCard.classList.add('hidden');
      renderComprehensiveStats(home, away);
    } else if (currentTab === 'squad') {
      pitchArea.classList.add('hidden');
      spotlightCard.classList.add('hidden');
      renderComprehensiveSquad(home, away, lineup);
    } else if (currentTab === 'schedule') {
      pitchArea.classList.add('hidden');
      spotlightCard.classList.add('hidden');
      renderScheduleView(home, away);
    } else if (currentTab === 'table') {
      pitchArea.classList.add('hidden');
      spotlightCard.classList.add('hidden');
      renderTableStandings(home, away);
    } else {
      pitchArea.classList.add('hidden');
      spotlightCard.classList.add('hidden');
      renderOtherView();
    }

    applyCardTheme();
  }

  // --- Apply Card Theme to Cards ---
  function applyCardTheme() {
    const themeClass = config.cardTheme;
    const cards = [
      document.getElementById('statsContainer'),
      document.getElementById('genericContainer'),
      spotlightCard
    ];
    cards.forEach(card => {
      if (!card) return;
      card.classList.remove('theme-obsidian', 'theme-emerald', 'theme-navy', 'theme-crimson', 'theme-bronze');
      card.classList.add(themeClass);
    });
  }

  cardThemeSelect.addEventListener('change', (e) => {
    config.cardTheme = e.target.value;
    applyCardTheme();
  });

  // --- LINE UP AB (BERSANDING HORIZONTAL: BOTH TEAMS ON HORIZONTAL PITCH) ---
  function renderSideBySideLineup(homeTeam, awayTeam, home, away) {
    tacticalPlayersContainer.innerHTML = '';
    if (!homeTeam || !awayTeam) return;

    const darkColors = currentMatch.general?.teamColors?.darkMode || {};
    const homeColor = darkColors.home || '#6CABDD';
    const awayColor = darkColors.away || '#DA291C';

    // Left Half (Team A)
    (homeTeam.starters || []).forEach((player, idx) => {
      const vert = player.verticalLayout || { x: 0.5, y: 0.5 };
      const posX = 10 + (vert.y * 35);
      const posY = 16 + (vert.x * 68);
      createDraggablePlayerNode(player, posX, posY, homeColor, homeTeam, idx);
    });

    // Right Half (Team B)
    (awayTeam.starters || []).forEach((player, idx) => {
      const vert = player.verticalLayout || { x: 0.5, y: 0.5 };
      const posX = 90 - (vert.y * 35);
      const posY = 16 + ((1.0 - vert.x) * 68);
      createDraggablePlayerNode(player, posX, posY, awayColor, awayTeam, idx);
    });

    // Spotlight primary player
    const topPlayer = (homeTeam.starters || [])[0] || (awayTeam.starters || [])[0];
    if (topPlayer) renderSpotlightPlayer(topPlayer, homeTeam);

    // Initial state: If paused at start, keep visible for editor; if playing, hide
    if (!isPlaying && currentTime === 0) {
      gsap.set('.tactical-player-node', { opacity: 1, scale: 1 });
    }
  }

  // --- SINGLE TEAM PITCH (SAFE PADDING: GK NEVER CUT OFF!) ---
  function renderSingleTeamPitch(teamObj) {
    tacticalPlayersContainer.innerHTML = '';
    if (!teamObj || !teamObj.starters) return;

    const activeForm = formationSelect.value || '4-3-3';
    const presetCoords = FORMATION_LIBRARY[activeForm] || FORMATION_LIBRARY['4-3-3'];

    teamObj.starters.forEach((player, idx) => {
      let posX, posY;
      if (currentMode === 'prediction' && presetCoords[idx]) {
        posX = presetCoords[idx].x;
        posY = presetCoords[idx].y;
      } else {
        const vert = player.verticalLayout || { x: 0.5, y: 0.5 };
        posX = 14 + (vert.x * 72);
        posY = 83 - (vert.y * 63);
      }

      posX = Math.max(10, Math.min(90, posX));
      posY = Math.max(14, Math.min(84, posY));

      createDraggablePlayerNode(player, posX, posY, activeJerseyColor, teamObj, idx);
    });

    const topPlayer = teamObj.starters[0];
    if (topPlayer) renderSpotlightPlayer(topPlayer, teamObj);

    if (!isPlaying && currentTime === 0) {
      gsap.set('.tactical-player-node', { opacity: 1, scale: 1 });
    }
  }

  // --- CREATE DRAGGABLE PLAYER NODE ---
  function createDraggablePlayerNode(player, posX, posY, kitColor, teamObj, idx) {
    const node = document.createElement('div');
    node.className = 'tactical-player-node';
    node.dataset.playerId = player.id;
    node.style.left = `${posX}%`;
    node.style.top = `${posY}%`;

    const photoUrl = `https://images.fotmob.com/image_resources/playerimages/${player.id}.png`;
    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="%2394A3B8"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
    const rating = player.performance?.rating ? player.performance.rating.toFixed(1) : '7.0';

    node.innerHTML = `
      <div class="tactical-avatar">
        <img src="${photoUrl}" alt="${player.name}" onerror="this.src='${fallbackSvg}'">
      </div>
      <div class="tactical-name-plate">
        <span class="tactical-kit-num">#${player.shirtNumber || idx + 1}</span>
        <span>${player.lastName || player.name.split(' ').pop()}</span>
      </div>
      <div class="tactical-rating ${rating >= 7 ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'}">
        ${rating}
      </div>
    `;

    // Pointer Drag
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeftPct = posX, initialTopPct = posY;

    node.addEventListener('pointerdown', (e) => {
      isDragging = true;
      node.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
      initialLeftPct = parseFloat(node.style.left) || posX;
      initialTopPct = parseFloat(node.style.top) || posY;
      renderSpotlightPlayer(player, teamObj);
    });

    node.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const rect = pitchArea.getBoundingClientRect();
      const deltaX = ((e.clientX - startX) / rect.width) * 100;
      const deltaY = ((e.clientY - startY) / rect.height) * 100;

      let newLeft = Math.max(8, Math.min(92, initialLeftPct + deltaX));
      let newTop = Math.max(12, Math.min(85, initialTopPct + deltaY));
      node.style.left = `${newLeft}%`;
      node.style.top = `${newTop}%`;
    });

    node.addEventListener('pointerup', (e) => {
      if (isDragging) {
        isDragging = false;
        try { node.releasePointerCapture(e.pointerId); } catch(err) {}
      }
    });

    tacticalPlayersContainer.appendChild(node);
  }

  // --- FORMATION SELECTION (AUTO-MAPPING) ---
  btnApplyFormation.addEventListener('click', () => {
    const selectedForm = formationSelect.value;
    const coords = FORMATION_LIBRARY[selectedForm];
    if (!coords) return;

    matchFormationName.textContent = `PREDIKSI (${selectedForm})`;
    const nodes = document.querySelectorAll('.tactical-player-node');
    nodes.forEach((node, idx) => {
      if (coords[idx]) {
        gsap.to(node, {
          left: `${coords[idx].x}%`,
          top: `${coords[idx].y}%`,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out'
        });
      }
    });
  });

  // --- GESER MASAL ---
  function shiftFormation(deltaX, deltaY) {
    const nodes = document.querySelectorAll('.tactical-player-node');
    nodes.forEach(node => {
      let curX = parseFloat(node.style.left) || 50;
      let curY = parseFloat(node.style.top) || 50;
      let newX = Math.max(8, Math.min(92, curX + deltaX));
      let newY = Math.max(12, Math.min(85, curY + deltaY));
      gsap.to(node, { left: `${newX}%`, top: `${newY}%`, duration: 0.25, ease: 'power2.out' });
    });
  }

  btnShiftLeft.addEventListener('click', () => shiftFormation(-4, 0));
  btnShiftRight.addEventListener('click', () => shiftFormation(4, 0));
  btnShiftUp.addEventListener('click', () => shiftFormation(0, -4));
  btnShiftDown.addEventListener('click', () => shiftFormation(0, 4));
  btnResetPositions.addEventListener('click', () => renderCurrentTab());

  // --- Render Spotlight Card for Coach ---
  function renderSpotlightManager(teamObj, currentTeam) {
    const coach = teamObj?.coach || { id: 24011, name: 'Pep Guardiola' };
    const coachId = coach.id || 24011;

    spotlightPhoto.src = `https://images.fotmob.com/image_resources/playerimages/${coachId}.png`;
    spotlightCrest.src = `https://images.fotmob.com/image_resources/logo/teamlogo/${currentTeam.id}.png`;
    spotlightName.textContent = (coach.name || 'PELATIH').toUpperCase();
    spotlightRole.textContent = `${(currentTeam.name || 'TIM').toUpperCase()} PELATIH`;

    spotlightBottomHeader.textContent = 'PROFIL PELATIH';
    spotlightBottomContent.innerHTML = `
      <div class="space-y-1 text-[10px]">
        <div class="flex justify-between"><span class="text-slate-400">Kebangsaan:</span><strong class="text-white">${coach.countryName || 'Eropa'}</strong></div>
        <div class="flex justify-between"><span class="text-slate-400">Usia:</span><strong class="text-white">${coach.age || 53} Tahun</strong></div>
        <div class="flex justify-between"><span class="text-slate-400">Jabatan:</span><strong class="text-emerald-400 font-bold">Head Coach</strong></div>
      </div>
    `;
  }

  // --- Render Spotlight Player ---
  function renderSpotlightPlayer(player, teamObj) {
    spotlightPhoto.src = `https://images.fotmob.com/image_resources/playerimages/${player.id}.png`;
    spotlightCrest.src = `https://images.fotmob.com/image_resources/logo/teamlogo/${teamObj?.id || 8456}.png`;
    spotlightName.textContent = (player.name || '').toUpperCase();
    spotlightRole.textContent = `${teamObj?.name || 'TIM'} • #${player.shirtNumber || ''}`;

    const rating = player.performance?.rating ? player.performance.rating.toFixed(1) : '7.5';
    const height = player.height || '185 cm';
    const foot = player.preferredFoot || 'Kanan (Right)';
    const marketVal = player.marketValue ? `€${(player.marketValue / 1000000).toFixed(1)}M` : '€150.0M';
    const club = player.primaryTeamName || teamObj?.name || 'Premier League';

    spotlightBottomHeader.textContent = 'DETAIL PROFIL PEMAIN';
    spotlightBottomContent.innerHTML = `
      <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
        <div><span class="text-slate-400 block text-[9px]">Nilai Pasar</span><strong class="text-amber-400 font-bold">${marketVal}</strong></div>
        <div><span class="text-slate-400 block text-[9px]">Rating Laga</span><strong class="text-emerald-400 font-bold">${rating} ★</strong></div>
        <div><span class="text-slate-400 block text-[9px]">Tinggi</span><strong class="text-white">${height}</strong></div>
        <div><span class="text-slate-400 block text-[9px]">Kaki Kuat</span><strong class="text-white">${foot}</strong></div>
        <div><span class="text-slate-400 block text-[9px]">Usia</span><strong class="text-white">${player.age || 24} Thn</strong></div>
        <div><span class="text-slate-400 block text-[9px]">Klub</span><strong class="text-white truncate block">${club}</strong></div>
      </div>
    `;
  }

  // --- ANIMATION TIMING FIX (Hides completely before inTime, pops in at inTime) ---
  function animateEntrance() {
    const nodes = document.querySelectorAll('.tactical-player-node');
    if (nodes.length === 0) return;
    gsap.killTweensOf(nodes);

    if (config.animStyle === 'elastic') {
      gsap.fromTo(nodes,
        { scale: 0, opacity: 0, y: 25 },
        { scale: 1, opacity: 1, y: 0, duration: 0.65, stagger: 0.04, ease: 'back.out(1.8)' }
      );
    } else if (config.animStyle === 'slideUp') {
      gsap.fromTo(nodes,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.035, ease: 'power3.out' }
      );
    } else {
      gsap.fromTo(nodes,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.04 }
      );
    }
  }

  function animateExit() {
    const nodes = document.querySelectorAll('.tactical-player-node');
    gsap.to(nodes, { opacity: 0, scale: 0.85, duration: 0.4, stagger: 0.02, ease: 'power2.in' });
  }

  // --- Dynamic Match Stats Extractor ---
  function getMatchStats(matchData) {
    const rawCategories = matchData?.content?.stats?.Periods?.All?.stats || [];
    const rows = [];
    rawCategories.forEach(cat => {
      (cat.stats || []).forEach(st => {
        if (st.title && Array.isArray(st.stats) && st.stats.length >= 2) {
          const hVal = String(st.stats[0]);
          const aVal = String(st.stats[1]);
          const hNum = parseFloat(hVal) || 0;
          const aNum = parseFloat(aVal) || 0;
          const total = (hNum + aNum) || 1;
          const hPct = Math.round((hNum / total) * 100);
          rows.push({
            title: st.title,
            hVal,
            aVal,
            hPct: Math.max(10, Math.min(90, hPct)),
            aPct: 100 - Math.max(10, Math.min(90, hPct))
          });
        }
      });
    });
    if (rows.length > 0) return rows;

    return [
      { title: 'Ball Possession', hVal: '65%', aVal: '35%', hPct: 65, aPct: 35 },
      { title: 'Expected Goals (xG)', hVal: '2.14', aVal: '0.86', hPct: 71, aPct: 29 },
      { title: 'Total Shots', hVal: '18', aVal: '7', hPct: 72, aPct: 28 },
      { title: 'Shots on Target', hVal: '8', aVal: '2', hPct: 80, aPct: 20 },
      { title: 'Big Chances', hVal: '5', aVal: '1', hPct: 83, aPct: 17 },
      { title: 'Accurate Passes', hVal: '612 (89%)', aVal: '298 (78%)', hPct: 67, aPct: 33 },
      { title: 'Shots Inside Box', hVal: '14', aVal: '4', hPct: 78, aPct: 22 },
      { title: 'Touches in Opp. Box', hVal: '38', aVal: '12', hPct: 76, aPct: 24 },
      { title: 'Corners', hVal: '8', aVal: '2', hPct: 80, aPct: 20 },
      { title: 'Tackles Won', hVal: '12', aVal: '15', hPct: 44, aPct: 56 },
      { title: 'Interceptions', hVal: '8', aVal: '11', hPct: 42, aPct: 58 },
      { title: 'Keeper Saves', hVal: '2', aVal: '6', hPct: 25, aPct: 75 },
      { title: 'Fouls Committed', hVal: '9', aVal: '13', hPct: 41, aPct: 59 },
      { title: 'Yellow Cards', hVal: '1', aVal: '3', hPct: 25, aPct: 75 }
    ];
  }

  // --- Tab 1: Comprehensive Match Stats (NO SCROLLBAR, SEPARATE HEADER) ---
  function renderComprehensiveStats(home, away) {
    let statsContainer = document.getElementById('statsContainer');
    if (!statsContainer) {
      statsContainer = document.createElement('div');
      statsContainer.id = 'statsContainer';
      statsContainer.className = 'flex-1 rounded-2xl p-4 border border-white/15 flex flex-col overflow-hidden max-h-full space-y-3';
      stageContent.appendChild(statsContainer);
    }
    statsContainer.classList.remove('hidden');

    const statRows = getMatchStats(currentMatch);

    // Clean separation: Header stays FIXED at top, no overlap! Grid auto-scrolls with no scrollbar!
    statsContainer.innerHTML = `
      <div class="flex items-center justify-between pb-2 border-b border-white/10 flex-shrink-0">
        <div class="flex items-center gap-2">
          <img src="https://images.fotmob.com/image_resources/logo/teamlogo/${home.id}.png" class="w-7 h-7 object-contain">
          <span class="font-bold text-sm text-white">${home.name}</span>
        </div>
        <div class="text-[11px] font-black text-amber-400 tracking-wider uppercase font-mono">OFFICIAL MATCH STATS</div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-sm text-white">${away.name}</span>
          <img src="https://images.fotmob.com/image_resources/logo/teamlogo/${away.id}.png" class="w-7 h-7 object-contain">
        </div>
      </div>
      <div id="statsScrollableBody" class="flex-1 overflow-y-auto no-scrollbar grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2.5 pt-1">
        ${statRows.map(s => `
          <div class="bg-black/40 p-2 rounded-lg border border-white/5">
            <div class="flex justify-between text-xs font-bold mb-1">
              <span class="text-white font-mono">${s.hVal}</span>
              <span class="text-slate-300 text-[10px] uppercase">${s.title}</span>
              <span class="text-white font-mono">${s.aVal}</span>
            </div>
            <div class="h-2 bg-slate-800 rounded-full overflow-hidden flex">
              <div class="bg-[#6CABDD] h-full" style="width: ${s.hPct}%;"></div>
              <div class="bg-[#DA291C] h-full" style="width: ${s.aPct}%;"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    applyCardTheme();
  }

  // --- Tab 6: Squad ---
  function renderComprehensiveSquad(home, away, lineup) {
    let genericContainer = document.getElementById('genericContainer');
    if (!genericContainer) {
      genericContainer = document.createElement('div');
      genericContainer.id = 'genericContainer';
      stageContent.appendChild(genericContainer);
    }
    genericContainer.className = 'flex-1 rounded-2xl p-5 border border-white/15 flex flex-col overflow-y-auto no-scrollbar space-y-4';
    genericContainer.classList.remove('hidden');

    const awayStarters = lineup.awayTeam?.starters || [];
    const awaySubs = lineup.awayTeam?.subs || [];
    const homeStarters = lineup.homeTeam?.starters || [];
    const homeSubs = lineup.homeTeam?.subs || [];

    genericContainer.innerHTML = `
      <div class="flex items-center justify-between pb-2 border-b border-white/10 flex-shrink-0">
        <h3 class="font-black text-sm text-white uppercase font-headline">DAFTAR SKUAD RESMI PERTANDINGAN</h3>
        <span class="text-xs text-amber-400 font-mono">23 Pemain Terdaftar per Tim</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto no-scrollbar">
        <div class="space-y-1.5">
          <div class="flex items-center gap-2 pb-1 border-b border-amber-500/30">
            <img src="https://images.fotmob.com/image_resources/logo/teamlogo/${home.id}.png" class="w-5 h-5 object-contain">
            <h4 class="font-bold text-xs text-amber-400 uppercase">${home.name}</h4>
          </div>
          ${homeStarters.map(p => `
            <div class="flex items-center justify-between text-[11px] bg-black/40 px-2 py-1 rounded">
              <span class="font-mono text-amber-400 font-bold">#${p.shirtNumber}</span>
              <span class="text-white font-medium flex-1 px-2">${p.name}</span>
              <span class="text-emerald-400 font-mono text-[10px]">${p.performance?.rating ? p.performance.rating.toFixed(1) : 'STARTER'}</span>
            </div>
          `).join('')}
        </div>
        <div class="space-y-1.5">
          <div class="flex items-center gap-2 pb-1 border-b border-rose-500/30">
            <img src="https://images.fotmob.com/image_resources/logo/teamlogo/${away.id}.png" class="w-5 h-5 object-contain">
            <h4 class="font-bold text-xs text-rose-400 uppercase">${away.name}</h4>
          </div>
          ${awayStarters.map(p => `
            <div class="flex items-center justify-between text-[11px] bg-black/40 px-2 py-1 rounded">
              <span class="font-mono text-rose-400 font-bold">#${p.shirtNumber}</span>
              <span class="text-white font-medium flex-1 px-2">${p.name}</span>
              <span class="text-emerald-400 font-mono text-[10px]">${p.performance?.rating ? p.performance.rating.toFixed(1) : 'STARTER'}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    applyCardTheme();
  }

  // --- Tab 5: Schedule ---
  function renderScheduleView(home, away) {
    let genericContainer = document.getElementById('genericContainer');
    if (!genericContainer) {
      genericContainer = document.createElement('div');
      genericContainer.id = 'genericContainer';
      stageContent.appendChild(genericContainer);
    }
    genericContainer.className = 'flex-1 rounded-2xl p-6 border border-white/15 flex flex-col justify-center space-y-4';
    genericContainer.classList.remove('hidden');

    genericContainer.innerHTML = `
      <div class="text-center pb-2 border-b border-white/10">
        <span class="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">JADWAL & DETAIL PERTANDINGAN</span>
        <h3 class="text-2xl font-black font-headline text-white mt-1">${home.name} VS ${away.name}</h3>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
        <div class="bg-black/40 p-3 rounded-xl border border-white/5"><div class="text-slate-400 text-[10px]">Stadion</div><strong class="text-white mt-1 block">Etihad Stadium</strong></div>
        <div class="bg-black/40 p-3 rounded-xl border border-white/5"><div class="text-slate-400 text-[10px]">Kompetisi</div><strong class="text-white mt-1 block">Premier League</strong></div>
        <div class="bg-black/40 p-3 rounded-xl border border-white/5"><div class="text-slate-400 text-[10px]">Wasit</div><strong class="text-white mt-1 block">Anthony Taylor (ENG)</strong></div>
        <div class="bg-black/40 p-3 rounded-xl border border-white/5"><div class="text-slate-400 text-[10px]">Status Laga</div><strong class="text-emerald-400 mt-1 block">Full Time</strong></div>
      </div>
    `;
    applyCardTheme();
  }

  // --- Tab 7: Standings Table ---
  function renderTableStandings(home, away) {
    let genericContainer = document.getElementById('genericContainer');
    if (!genericContainer) {
      genericContainer = document.createElement('div');
      genericContainer.id = 'genericContainer';
      stageContent.appendChild(genericContainer);
    }
    genericContainer.className = 'flex-1 rounded-2xl p-6 border border-white/15 flex flex-col space-y-3 overflow-y-auto no-scrollbar';
    genericContainer.classList.remove('hidden');

    const standings = [
      { rank: 1, name: 'Liverpool', p: 7, w: 6, d: 0, l: 1, gd: '+11', pts: 18 },
      { rank: 2, name: 'Manchester City', p: 7, w: 5, d: 2, l: 0, gd: '+9', pts: 17, isCurrent: true },
      { rank: 3, name: 'Arsenal', p: 7, w: 5, d: 2, l: 0, gd: '+9', pts: 17 },
      { rank: 4, name: 'Chelsea', p: 7, w: 4, d: 2, l: 1, gd: '+8', pts: 14 },
      { rank: 14, name: 'Manchester United', p: 7, w: 2, d: 2, l: 3, gd: '-3', pts: 8, isCurrent: true }
    ];

    genericContainer.innerHTML = `
      <div class="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 class="font-black text-sm text-white uppercase font-headline">KLASEMEN PREMIER LEAGUE</h3>
          <div class="text-[10px] text-slate-400">FotMob Official Table</div>
        </div>
      </div>
      <div class="w-full text-xs">
        <div class="grid grid-cols-12 text-[10px] font-bold text-slate-400 pb-2 border-b border-white/5 uppercase">
          <div class="col-span-1 text-center">#</div>
          <div class="col-span-6">Klub / Tim</div>
          <div class="col-span-1 text-center">P</div>
          <div class="col-span-1 text-center">W</div>
          <div class="col-span-1 text-center">GD</div>
          <div class="col-span-2 text-center font-bold text-white">PTS</div>
        </div>
        <div class="divide-y divide-white/5">
          ${standings.map(s => `
            <div class="grid grid-cols-12 py-2 items-center ${s.isCurrent ? 'bg-amber-500/10 font-bold' : ''}">
              <div class="col-span-1 text-center font-mono ${s.rank <= 4 ? 'text-emerald-400' : 'text-slate-400'}">${s.rank}</div>
              <div class="col-span-6 text-white">${s.name}</div>
              <div class="col-span-1 text-center font-mono text-slate-300">${s.p}</div>
              <div class="col-span-1 text-center font-mono text-slate-300">${s.w}</div>
              <div class="col-span-1 text-center font-mono text-slate-300">${s.gd}</div>
              <div class="col-span-2 text-center font-mono font-black text-amber-400">${s.pts}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    applyCardTheme();
  }

  function renderOtherView() {
    let genericContainer = document.getElementById('genericContainer');
    if (!genericContainer) {
      genericContainer = document.createElement('div');
      genericContainer.id = 'genericContainer';
      stageContent.appendChild(genericContainer);
    }
    genericContainer.className = 'flex-1 rounded-2xl p-6 border border-white/15 flex flex-col items-center justify-center text-center';
    genericContainer.classList.remove('hidden');

    genericContainer.innerHTML = `
      <div class="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mb-3 text-amber-400">
        <i data-lucide="layers" class="w-7 h-7"></i>
      </div>
      <h3 class="text-xl font-bold font-headline text-white uppercase">MENU LAINNYA</h3>
      <p class="text-xs text-slate-300 max-w-sm mt-1">Dukungan modul taktik lanjutan siap dihubungkan.</p>
    `;
    lucide.createIcons();
    applyCardTheme();
  }

  // --- YOUTUBE-STYLE VIDEO PLAYER CONTROLLER (WITH TIMING BUG FIX) ---
  function updatePlayerProgress() {
    ytCurrentTime.textContent = formatTime(currentTime);
    ytDuration.textContent = formatTime(totalDuration);
    const pct = (currentTime / totalDuration) * 100;
    ytProgressFill.style.width = `${pct}%`;

    // Video Transition Fade (Blackout)
    if (config.videoFade) {
      if (currentTime < 0.6) {
        videoTransitionOverlay.style.opacity = `${Math.max(0, 1 - (currentTime / 0.6))}`;
      } else if (currentTime >= config.outTime) {
        const fadeElapsed = currentTime - config.outTime;
        videoTransitionOverlay.style.opacity = `${Math.min(1, fadeElapsed / 1.0)}`;
      } else {
        videoTransitionOverlay.style.opacity = '0';
      }
    } else {
      videoTransitionOverlay.style.opacity = '0';
    }

    // Auto-Scroll Stats list during video playback
    const statsBody = document.getElementById('statsScrollableBody');
    if (statsBody && isPlaying) {
      const scrollMax = statsBody.scrollHeight - statsBody.clientHeight;
      if (scrollMax > 0) {
        const scrollPct = (currentTime / totalDuration);
        statsBody.scrollTop = scrollPct * scrollMax;
      }
    }

    // CRUCIAL TIMING FIX:
    // If before inTime: players MUST be invisible!
    if (isPlaying) {
      if (currentTime < config.inTime) {
        if (animState !== 'idle') {
          animState = 'idle';
          gsap.set('.tactical-player-node', { opacity: 0, scale: 0 });
        }
      } else if (currentTime >= config.inTime && currentTime < config.outTime) {
        if (animState === 'idle' || animState === 'out') {
          animState = 'in';
          animateEntrance();
        }
      } else if (currentTime >= config.outTime) {
        if (animState === 'in' || animState === 'active') {
          animState = 'out';
          animateExit();
        }
      }
    }
  }

  function startPlayback() {
    isPlaying = true;
    ytPlayIcon.setAttribute('data-lucide', 'pause');
    lucide.createIcons();

    // At start of playback: hide players if currentTime < inTime
    if (currentTime < config.inTime) {
      animState = 'idle';
      gsap.set('.tactical-player-node', { opacity: 0, scale: 0 });
    }

    const intervalMs = 33;
    animTimer = setInterval(() => {
      currentTime += (intervalMs / 1000) * playbackRate;
      if (currentTime >= totalDuration) {
        currentTime = 0;
        animState = 'idle';
        gsap.set('.tactical-player-node', { opacity: 0, scale: 0 });
      }
      updatePlayerProgress();
    }, intervalMs);
  }

  function pausePlayback() {
    isPlaying = false;
    ytPlayIcon.setAttribute('data-lucide', 'play');
    lucide.createIcons();
    clearInterval(animTimer);

    // When paused: reveal players so pundit can edit / drag them!
    gsap.set('.tactical-player-node', { opacity: 1, scale: 1 });
  }

  function togglePlayPause() {
    if (isPlaying) pausePlayback();
    else startPlayback();
  }

  function resetTimeline() {
    currentTime = 0;
    animState = 'idle';
    if (!isPlaying) {
      gsap.set('.tactical-player-node', { opacity: 1, scale: 1 });
    }
    updatePlayerProgress();
  }

  btnYtPlay.addEventListener('click', togglePlayPause);
  btnYtReplay.addEventListener('click', () => {
    currentTime = 0;
    animState = 'idle';
    updatePlayerProgress();
    if (!isPlaying) startPlayback();
  });

  ytProgressTrack.addEventListener('click', (e) => {
    const rect = ytProgressTrack.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    currentTime = ratio * totalDuration;
    updatePlayerProgress();
  });

  ytSpeedSelect.addEventListener('change', (e) => {
    playbackRate = parseFloat(e.target.value) || 1.0;
  });

  // Duration & Fade Inputs
  videoDurationInput.addEventListener('change', (e) => {
    totalDuration = parseFloat(e.target.value) || 15.0;
    config.outTime = Math.max(2, totalDuration - 2.0);
    outTimeInput.value = config.outTime.toFixed(1);
    lblOutTime.textContent = `${config.outTime.toFixed(1)}s`;
    ytDuration.textContent = formatTime(totalDuration);
    updatePlayerProgress();
  });

  inTimeInput.addEventListener('change', (e) => {
    config.inTime = parseFloat(e.target.value) || 1.5;
    lblInTime.textContent = `${config.inTime.toFixed(1)}s`;
  });

  outTimeInput.addEventListener('change', (e) => {
    config.outTime = parseFloat(e.target.value) || 12.0;
    lblOutTime.textContent = `${config.outTime.toFixed(1)}s`;
  });

  // --- HIGH-FIDELITY BROADCAST VIDEO EXPORTER (.MOV / .MP4) ---
  // Renders real player photos, spotlight portrait, wave motion, entrance bounce, and fade transitions
  async function triggerExportMov() {
    exportModal.classList.remove('hidden');
    exportProgressBar.style.width = '5%';
    exportStatusText.textContent = 'Menyiapkan aset foto pemain & elemen siaran 1080p...';

    // Pause player while rendering
    if (isPlaying) pausePlayback();

    const canvas = exportCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;

    // Helper to safely load image via proxy to avoid CORS canvas taint
    const loadImageSafe = (src) => {
      return new Promise((resolve) => {
        if (!src) return resolve(null);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        if (src.startsWith('http')) {
          img.src = `/api/proxy?url=${encodeURIComponent(src)}`;
        } else {
          img.src = src;
        }
      });
    };

    // 1. Preload Background & Waves
    const [bgImg, waveImg] = await Promise.all([
      loadImageSafe('assets/stadium_broadcast.jpg'),
      loadImageSafe('assets/wave_texture.svg')
    ]);

    // 2. Preload Spotlight Images
    const [spotlightImg, crestImg] = await Promise.all([
      loadImageSafe(spotlightPhoto.src),
      loadImageSafe(spotlightCrest.src)
    ]);

    // 3. Preload all Player Avatars
    const playerNodes = Array.from(document.querySelectorAll('.tactical-player-node'));
    const playerImages = new Map();
    const playerLoadPromises = playerNodes.map(async (node) => {
      const pid = node.dataset.playerId;
      const imgEl = node.querySelector('.tactical-avatar img');
      if (imgEl && imgEl.src) {
        const loaded = await loadImageSafe(imgEl.src);
        if (loaded) playerImages.set(pid, loaded);
      }
    });

    await Promise.all(playerLoadPromises);
    exportProgressBar.style.width = '18%';
    exportStatusText.textContent = 'Memulai rekaman video broadcast (30 FPS)...';

    // 4. Setup MediaRecorder with best supported format
    const stream = canvas.captureStream(30);
    let mimeType = 'video/webm;codecs=vp9';
    if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1.42E01E,mp4a.40.2')) {
      mimeType = 'video/mp4;codecs=avc1.42E01E,mp4a.40.2';
    } else if (MediaRecorder.isTypeSupported('video/mp4')) {
      mimeType = 'video/mp4';
    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
      mimeType = 'video/webm;codecs=vp9';
    } else if (MediaRecorder.isTypeSupported('video/webm')) {
      mimeType = 'video/webm';
    }

    const recordedChunks = [];
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8000000 });

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data);
    };

    recorder.start(100);

    // 5. Render frame by frame matching the live preview
    const fps = 30;
    const duration = totalDuration || 15.0;
    const totalFrames = Math.round(duration * fps);
    const inTime = config.inTime || 1.5;
    const outTime = config.outTime || 12.0;

    for (let f = 0; f < totalFrames; f++) {
      const t = f / fps;
      
      // CLEAR & DRAW BACKGROUND
      ctx.clearRect(0, 0, 1920, 1080);
      if (bgImg) {
        ctx.drawImage(bgImg, 0, 0, 1920, 1080);
      } else {
        ctx.fillStyle = '#0a0d14';
        ctx.fillRect(0, 0, 1920, 1080);
      }

      // WAVY FLOWING TEXTURE (shifts continuously with time t)
      if (waveImg) {
        const waveShift = (t * 90) % 1920;
        ctx.save();
        ctx.globalAlpha = 0.28;
        ctx.drawImage(waveImg, waveShift, 0, 1920, 1080);
        ctx.drawImage(waveImg, waveShift - 1920, 0, 1920, 1080);
        ctx.restore();
      }

      // Vignette
      const grad = ctx.createLinearGradient(0, 0, 0, 1080);
      grad.addColorStop(0, 'rgba(6, 8, 14, 0.7)');
      grad.addColorStop(0.4, 'rgba(6, 8, 14, 0.35)');
      grad.addColorStop(1, 'rgba(6, 8, 14, 0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1920, 1080);

      // HEADER
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 54px "Bebas Neue", sans-serif';
      ctx.fillText(mainTitleHeader.textContent, 80, 105);

      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 34px "Bebas Neue", sans-serif';
      ctx.fillText(vsOpponentHeader.textContent, 80, 150);

      // Match badge on top right
      ctx.fillStyle = 'rgba(10, 14, 23, 0.85)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(1440, 65, 400, 75, 14);
      ctx.fill();
      ctx.stroke();

      if (crestImg) {
        ctx.drawImage(crestImg, 1455, 78, 48, 48);
      }
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText((matchTournamentName.textContent || 'COMPETITION').toUpperCase(), 1515, 96);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px "Bebas Neue", sans-serif';
      ctx.fillText((matchFormationName.textContent || '').toUpperCase(), 1515, 122);
      ctx.restore();

      // PITCH AREA (1260 x 820 at x=80, y=180)
      ctx.save();
      const pitchGrad = ctx.createLinearGradient(80, 180, 1340, 1000);
      pitchGrad.addColorStop(0, '#0c351f');
      pitchGrad.addColorStop(1, '#061c10');
      ctx.fillStyle = pitchGrad;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(80, 180, 1260, 820, 24);
      ctx.fill();
      ctx.stroke();
      ctx.clip();

      // Draw Field Lines based on current tab
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2.5;

      if (currentTab === 'lineupAB') {
        // Horizontal pitch (left vs right)
        ctx.beginPath();
        ctx.moveTo(710, 180);
        ctx.lineTo(710, 1000);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(710, 590, 85, 0, Math.PI * 2);
        ctx.stroke();

        // Penalty area Left
        ctx.strokeRect(80, 390, 200, 400);
        ctx.strokeRect(80, 470, 75, 240);
        ctx.beginPath();
        ctx.arc(280, 590, 55, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();

        // Penalty area Right
        ctx.strokeRect(1140, 390, 200, 400);
        ctx.strokeRect(1265, 470, 75, 240);
        ctx.beginPath();
        ctx.arc(1140, 590, 55, Math.PI / 2, -Math.PI / 2);
        ctx.stroke();
      } else {
        // Vertical pitch (single team)
        ctx.beginPath();
        ctx.moveTo(80, 590);
        ctx.lineTo(1340, 590);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(710, 590, 85, 0, Math.PI * 2);
        ctx.stroke();

        // Penalty box Top
        ctx.strokeRect(510, 180, 400, 180);
        ctx.strokeRect(590, 180, 240, 70);
        ctx.beginPath();
        ctx.arc(710, 360, 55, 0, Math.PI);
        ctx.stroke();

        // Penalty box Bottom
        ctx.strokeRect(510, 820, 400, 180);
        ctx.strokeRect(590, 930, 240, 70);
        ctx.beginPath();
        ctx.arc(710, 820, 55, Math.PI, 0);
        ctx.stroke();
      }
      ctx.restore();

      // SPOTLIGHT CARD (480 x 820 at x=1360, y=180)
      ctx.save();
      ctx.fillStyle = '#0f1420';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(1360, 180, 480, 820, 24);
      ctx.fill();
      ctx.stroke();
      ctx.clip();

      // Top banner with active jersey color
      const bannerGrad = ctx.createLinearGradient(1360, 180, 1840, 520);
      bannerGrad.addColorStop(0, activeJerseyColor || '#DB0007');
      bannerGrad.addColorStop(1, '#1e2538');
      ctx.fillStyle = bannerGrad;
      ctx.fillRect(1360, 180, 480, 340);

      // Spotlight Image
      if (spotlightImg) {
        ctx.drawImage(spotlightImg, 1450, 200, 300, 320);
      }

      // Crest Badge
      if (crestImg) {
        ctx.drawImage(crestImg, 1380, 200, 50, 50);
      }

      // Spotlight Name & Role Banner
      ctx.fillStyle = 'rgba(10, 14, 23, 0.95)';
      ctx.fillRect(1360, 520, 480, 80);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px "Bebas Neue", sans-serif';
      ctx.fillText(spotlightName.textContent, 1385, 560);

      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(spotlightRole.textContent, 1385, 585);

      // Bottom Panel Grid (Profile Details)
      ctx.fillStyle = 'rgba(16, 21, 32, 0.9)';
      ctx.fillRect(1360, 600, 480, 400);

      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 13px "Bebas Neue", sans-serif';
      ctx.fillText('DETAIL PROFIL PEMAIN', 1385, 630);

      const details = [
        { label: 'NILAI PASAR', val: '€150.0M', color: '#F59E0B' },
        { label: 'RATING LAGA', val: '7.8 ★', color: '#10B981' },
        { label: 'TINGGI', val: '185 cm', color: '#FFFFFF' },
        { label: 'KAKI KUAT', val: 'Kanan', color: '#FFFFFF' },
        { label: 'USIA', val: '24 Thn', color: '#FFFFFF' },
        { label: 'KLUB', val: (currentMatch.header?.teams?.[0]?.name || 'Premier League'), color: '#FFFFFF' }
      ];

      details.forEach((d, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const bx = 1385 + col * 220;
        const by = 650 + row * 90;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(bx, by, 205, 75, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#94A3B8';
        ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(d.label, bx + 12, by + 28);

        ctx.fillStyle = d.color;
        ctx.font = 'bold 20px "Bebas Neue", sans-serif';
        ctx.fillText(d.val, bx + 12, by + 58);
      });
      ctx.restore();

      // PLAYER NODES ON PITCH (WITH TIMING & ENTRANCE ANIMATION)
      playerNodes.forEach((node, idx) => {
        const leftPct = parseFloat(node.style.left) || 50;
        const topPct = parseFloat(node.style.top) || 50;
        const posX = 80 + (leftPct / 100) * 1260;
        const posY = 180 + (topPct / 100) * 820;

        let scale = 0;
        let opacity = 0;

        if (t < inTime) {
          scale = 0;
          opacity = 0;
        } else if (t >= inTime && t < inTime + 0.7) {
          const stagger = idx * 0.035;
          const p = Math.max(0, Math.min(1, (t - inTime - stagger) / 0.45));
          if (p > 0) {
            scale = p < 1 ? 1 + 1.8 * Math.pow(p - 1, 3) + 1.2 * Math.pow(p - 1, 2) : 1;
            opacity = Math.min(1, p * 2.5);
          }
        } else if (t >= inTime + 0.7 && t < outTime) {
          scale = 1.0;
          opacity = 1.0;
        } else if (t >= outTime) {
          const p = Math.min(1, (t - outTime) / 0.6);
          opacity = Math.max(0, 1.0 - p);
          scale = Math.max(0.7, 1.0 - p * 0.3);
        }

        if (opacity > 0.01 && scale > 0.01) {
          ctx.save();
          ctx.translate(posX, posY);
          ctx.scale(scale, scale);
          ctx.globalAlpha = opacity;

          // Shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
          ctx.beginPath();
          ctx.arc(0, 4, 30, 0, Math.PI * 2);
          ctx.fill();

          // Outer jersey ring
          ctx.fillStyle = activeJerseyColor || '#DB0007';
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, 26, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Player Face Photo
          const pImg = playerImages.get(node.dataset.playerId);
          if (pImg) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, 23, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(pImg, -23, -23, 46, 46);
            ctx.restore();
          } else {
            // Silhouette fallback
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(0, -5, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 18, 16, Math.PI, 0);
            ctx.fill();
          }

          // Tactical Nameplate
          const numSpan = node.querySelector('.tactical-kit-num');
          const kitNum = numSpan ? numSpan.textContent : `#${idx + 1}`;
          const nameSpan = node.querySelector('.tactical-name-plate span:last-child');
          const pName = nameSpan ? nameSpan.textContent : 'PLAYER';

          ctx.fillStyle = 'rgba(8, 11, 18, 0.92)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(-55, 30, 110, 24, 6);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#F59E0B';
          ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(kitNum, -48, 46);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(pName.toUpperCase(), -26, 46);

          // Rating Badge
          const ratingEl = node.querySelector('.tactical-rating');
          const ratingVal = ratingEl ? ratingEl.textContent.trim() : '7.0';
          ctx.fillStyle = '#059669';
          ctx.beginPath();
          ctx.roundRect(14, 10, 36, 17, 5);
          ctx.fill();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(ratingVal, 18, 22);

          ctx.restore();
        }
      });

      // VIDEO TRANSITION OVERLAY (FADE IN & FADE OUT)
      if (config.videoFade) {
        let fadeAlpha = 0;
        if (t < 0.6) {
          fadeAlpha = Math.max(0, 1.0 - (t / 0.6));
        } else if (t >= outTime) {
          fadeAlpha = Math.min(1.0, (t - outTime) / 0.8);
        }
        if (fadeAlpha > 0.001) {
          ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
          ctx.fillRect(0, 0, 1920, 1080);
        }
      }

      // Update progress bar
      const pct = Math.floor((f / totalFrames) * 80) + 20;
      exportProgressBar.style.width = `${pct}%`;
      exportStatusText.textContent = `Merekam video broadcast: ${(t).toFixed(1)}s / ${duration.toFixed(1)}s (${pct}%)...`;

      // Allow frame capture
      await new Promise(r => setTimeout(r, 16));
    }

    recorder.stop();
    await new Promise(resolve => {
      recorder.onstop = resolve;
    });

    exportProgressBar.style.width = '100%';
    exportStatusText.textContent = 'Muxing file video broadcast .MOV...';

    const videoBlob = new Blob(recordedChunks, { type: 'video/quicktime' });
    const downloadUrl = URL.createObjectURL(videoBlob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    const matchName = currentMatch.header?.teams ? `${currentMatch.header.teams[0].name}_vs_${currentMatch.header.teams[1].name}` : 'Match';
    a.download = `FotMob_Tactic_${matchName}_${currentMode}_1080p.mov`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      exportModal.classList.add('hidden');
      alert(`✅ Berhasil mengekspor video!\nFormat: QuickTime Broadcast Video (.MOV)\nUkuran: ${(videoBlob.size / (1024 * 1024)).toFixed(2)} MB\nFile tersimpan sebagai:\nFotMob_Tactic_${matchName}_${currentMode}_1080p.mov`);
    }, 500);
  }

  btnExportMov.addEventListener('click', triggerExportMov);
  btnBarExport.addEventListener('click', triggerExportMov);

  // Preset Buttons
  btnPresetDerby.addEventListener('click', () => {
    fotmobUrl.value = 'https://www.fotmob.com/matches/manchester-city-vs-manchester-united/2wabz2#5795452';
    initMatch(PRESET_MATCHES['manchester_derby'], 'home');
  });

  btnPresetSpain.addEventListener('click', () => {
    fotmobUrl.value = 'https://www.fotmob.com/matches/spain-vs-croatia/2cs2z6#5181855:tab=lineup';
    initMatch(PRESET_MATCHES['spain_croatia'], 'away');
  });

  btnPresetArsenal.addEventListener('click', () => {
    fotmobUrl.value = 'https://www.fotmob.com/matches/arsenal-vs-brighton-hove-albion/3bfk5g';
    initMatch(PRESET_MATCHES['arsenal_brighton'], 'away');
  });

  // --- 100% DYNAMIC FOTMOB URL FETCHER (Zero-CORS Python Server API) ---
  btnFetchAuto.addEventListener('click', async () => {
    const rawUrl = fotmobUrl.value.trim();
    if (!rawUrl) {
      alert('Silakan masukkan link pertandingan FotMob.');
      return;
    }

    btnFetchAuto.disabled = true;
    btnFetchAuto.textContent = 'Mengambil...';

    try {
      // 1. Direct fetch via Python server's dynamic match endpoint
      const apiUrl = `/api/match?url=${encodeURIComponent(rawUrl)}`;
      const res = await fetch(apiUrl);
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          const matchData = {
            header: json.header || {},
            general: json.general || {},
            content: {
              lineup: json.content?.lineup || {},
              stats: json.content?.stats || {},
              table: json.content?.table || {}
            }
          };

          initMatch(matchData, 'home');

          const t1 = matchData.header?.teams?.[0]?.name || 'Tim A';
          const t2 = matchData.header?.teams?.[1]?.name || 'Tim B';
          alert(`✅ Berhasil mengambil data dinamis FotMob!\n${t1} vs ${t2}\nLineup, foto pemain, dan statistik resmi disinkronkan.`);
          btnFetchAuto.disabled = false;
          btnFetchAuto.textContent = 'Ambil Data';
          return;
        } else {
          throw new Error(json.error || 'Gagal memproses data pertandingan');
        }
      } else {
        throw new Error(`HTTP Error ${res.status}`);
      }
    } catch (err) {
      console.warn('API Match endpoint fetch failed, trying local proxy fallback...', err);
      // Fallback: fetch HTML through /api/proxy and parse __NEXT_DATA__
      try {
        const proxyUrl = `/api/proxy?url=${encodeURIComponent(rawUrl)}`;
        const res = await fetch(proxyUrl);
        if (res.ok) {
          const html = await res.text();
          const match = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/);
          if (match) {
            const nextData = JSON.parse(match[1]);
            const pp = nextData.props?.pageProps || {};
            const parsedMatch = {
              header: pp.header || {},
              general: pp.general || {},
              content: {
                lineup: pp.content?.lineup || {},
                stats: pp.content?.stats || {},
                table: pp.content?.table || {}
              }
            };
            initMatch(parsedMatch, 'home');
            alert('✅ Berhasil menyinkronkan data pertandingan FotMob melalui proxy!');
            btnFetchAuto.disabled = false;
            btnFetchAuto.textContent = 'Ambil Data';
            return;
          }
        }
      } catch (proxyErr) {
        console.error('Proxy fallback failed:', proxyErr);
      }

      alert(`⚠️ Tidak dapat mengambil data dari link: ${err.message}\nPastikan server lokal aktif (start_studio.bat) dan link merupakan URL pertandingan FotMob yang valid.`);
    }

    btnFetchAuto.disabled = false;
    btnFetchAuto.textContent = 'Ambil Data';
  });

  // --- Initial Load ---
  initMatch(PRESET_MATCHES['manchester_derby'] || PRESET_MATCHES['spain_croatia'], 'home');
  updatePlayerProgress();
});
