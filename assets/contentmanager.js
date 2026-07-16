const DB_NAME = 'beestenboel-content-v1';
const STORE_NAME = 'sounds';

let selectedFile = null;
let editingId = null;

const $ = (id) => document.getElementById(id);

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAllSounds() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME).objectStore(STORE_NAME).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function saveSound(sound) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).put(sound);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function deleteSound(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function createId(name) {
  return `${name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}_${Date.now().toString(36)}`;
}

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function dataURLToBlob(url) {
  const [header, body] = url.split(',');
  const mime = (header.match(/:(.*?);/) || [])[1] || 'audio/mpeg';
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

async function drawWaveform(file) {
  try {
    const audioContext = new AudioContext();
    const buffer = await audioContext.decodeAudioData(await file.arrayBuffer());
    const samples = buffer.getChannelData(0);
    const canvas = $('wave');
    const context = canvas.getContext('2d');
    const step = Math.ceil(samples.length / canvas.width);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#f6c453';
    context.lineWidth = 3;
    context.beginPath();

    for (let x = 0; x < canvas.width; x += 1) {
      let min = 1;
      let max = -1;
      for (let j = 0; j < step; j += 1) {
        const value = samples[x * step + j] || 0;
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
      context.moveTo(x, ((1 + min) * canvas.height) / 2);
      context.lineTo(x, ((1 + max) * canvas.height) / 2);
    }

    context.stroke();
    await audioContext.close();
  } catch (error) {
    console.warn('Golfvorm kon niet worden getekend.', error);
  }
}

async function selectFile(file) {
  selectedFile = file;
  $('fileinfo').textContent = `${file.name || 'Audiobestand'} · ${(file.size / 1024).toFixed(0)} kB`;
  $('preview').src = URL.createObjectURL(file);
  $('status').textContent = 'Vul de metadata in en luister eventueel terug.';
  $('name').value ||= (file.name || '').replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
  $('preview').onloadedmetadata = () => {
    $('trimEnd').value = $('preview').duration.toFixed(1);
    drawWaveform(file);
  };
}

function startEditing(sound) {
  editingId = sound.id;
  selectedFile = sound.audioBlob;
  $('name').value = sound.naam;
  $('emoji').value = sound.emoji;
  $('category').value = sound.cat;
  $('difficulty').value = sound.difficulty;
  $('fun').value = sound.fun;
  $('trimStart').value = sound.trimStart || 0;
  $('trimEnd').value = sound.trimEnd || 0;
  $('legendary').checked = Boolean(sound.legendary);
  $('modifiers').checked = sound.modifierAllowed !== false;
  $('preview').src = URL.createObjectURL(sound.audioBlob);
  $('fileinfo').textContent = 'Bestaand geluid bewerken';
  $('save').textContent = 'Wijzigingen opslaan';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  selectedFile = null;
  editingId = null;
  $('file').value = '';
  $('name').value = '';
  $('emoji').value = '🎬';
  $('difficulty').value = 3;
  $('fun').value = 8;
  $('trimStart').value = 0;
  $('trimEnd').value = 0;
  $('legendary').checked = false;
  $('modifiers').checked = true;
  $('preview').removeAttribute('src');
  $('fileinfo').textContent = 'Nog geen bestand gekozen';
  $('save').textContent = '＋ Opslaan';
  $('status').textContent = 'Kies eerst een audiobestand.';
  $('wave').getContext('2d').clearRect(0, 0, $('wave').width, $('wave').height);
}

function createSoundRow(sound) {
  const row = document.createElement('div');
  row.className = 'item';
  row.innerHTML = `<div class="emoji">${sound.emoji || '🎧'}</div><div><strong>${sound.naam}</strong><div class="meta">${sound.cat} · moeilijkheid ${sound.difficulty || 3} · lachfactor ${sound.fun || 8}</div><div class="tags">${sound.legendary ? '<span class="tag">Legendary</span>' : ''}${sound.modifierAllowed ? '<span class="tag">Chaos</span>' : ''}</div></div><div class="item-actions"><button data-play aria-label="Afspelen">▶</button> <button data-edit aria-label="Bewerken">✏️</button> <button data-delete aria-label="Verwijderen">🗑</button></div>`;

  row.querySelector('[data-play]').onclick = () => {
    const audio = new Audio(URL.createObjectURL(sound.audioBlob));
    audio.currentTime = sound.trimStart || 0;
    audio.play();
    if (sound.trimEnd) setTimeout(() => audio.pause(), Math.max(0, (sound.trimEnd - (sound.trimStart || 0)) * 1000));
  };
  row.querySelector('[data-edit]').onclick = () => startEditing(sound);
  row.querySelector('[data-delete]').onclick = async () => {
    if (confirm(`Verwijder ${sound.naam}?`)) {
      await deleteSound(sound.id);
      await renderSounds();
    }
  };
  return row;
}

async function renderSounds() {
  const sounds = await getAllSounds();
  $('count').textContent = `(${sounds.length})`;
  $('list').replaceChildren();

  if (!sounds.length) {
    $('list').innerHTML = '<div class="empty">Nog geen eigen geluiden. De meegeleverde geluiden staan al permanent in het spel.</div>';
    return;
  }

  sounds.sort((a, b) => a.naam.localeCompare(b.naam)).forEach((sound) => $('list').appendChild(createSoundRow(sound)));
}

async function handleSave() {
  const name = $('name').value.trim();
  if (!selectedFile || !name) {
    $('status').textContent = 'Audiobestand en naam zijn verplicht.';
    return;
  }

  await saveSound({
    id: editingId || createId(name),
    naam: name,
    emoji: $('emoji').value || '🎧',
    cat: $('category').value,
    difficulty: Number($('difficulty').value) || 3,
    fun: Number($('fun').value) || 8,
    trimStart: Number($('trimStart').value) || 0,
    trimEnd: Number($('trimEnd').value) || 0,
    legendary: $('legendary').checked,
    modifierAllowed: $('modifiers').checked,
    audioBlob: selectedFile,
    custom: true,
    updatedAt: new Date().toISOString(),
  });

  resetForm();
  await renderSounds();
}

async function exportLibrary() {
  const sounds = await getAllSounds();
  const exportedSounds = [];
  for (const sound of sounds) {
    const copy = { ...sound, audioData: await blobToDataURL(sound.audioBlob) };
    delete copy.audioBlob;
    exportedSounds.push(copy);
  }
  const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), sounds: exportedSounds }, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'beestenboel-eigen-geluiden.json';
  link.click();
  URL.revokeObjectURL(link.href);
}

async function importLibrary(file) {
  try {
    const data = JSON.parse(await file.text());
    for (const sound of data.sounds || []) {
      sound.audioBlob = dataURLToBlob(sound.audioData);
      delete sound.audioData;
      await saveSound(sound);
    }
    await renderSounds();
    alert('Bibliotheek geïmporteerd.');
  } catch (error) {
    $('status').textContent = 'Importeren mislukt: controleer of dit een geldige Beestenboel-export is.';
    console.error(error);
  }
}

async function clearLibrary() {
  if (!confirm('Alle zelf toegevoegde geluiden wissen?')) return;
  const db = await openDB();
  await new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
  await renderSounds();
}

function bindEvents() {
  $('save').onclick = handleSave;
  $('reset').onclick = resetForm;
  $('drop').onclick = () => $('file').click();
  $('file').onchange = (event) => event.target.files[0] && selectFile(event.target.files[0]);

  ['dragenter', 'dragover'].forEach((name) => $('drop').addEventListener(name, (event) => {
    event.preventDefault();
    $('drop').classList.add('drag');
  }));
  ['dragleave', 'drop'].forEach((name) => $('drop').addEventListener(name, (event) => {
    event.preventDefault();
    $('drop').classList.remove('drag');
  }));
  $('drop').addEventListener('drop', (event) => event.dataTransfer.files[0] && selectFile(event.dataTransfer.files[0]));

  $('export').onclick = exportLibrary;
  $('importBtn').onclick = () => $('importFile').click();
  $('importFile').onchange = (event) => event.target.files[0] && importLibrary(event.target.files[0]);
  $('clear').onclick = clearLibrary;
}

bindEvents();
renderSounds();
