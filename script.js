const entriesContainer = document.getElementById('entries');
const newEntryBtn = document.getElementById('newEntryBtn');
const entryModal = document.getElementById('entryModal');
const closeBtn = document.querySelector('.close');
const saveEntryBtn = document.getElementById('saveEntryBtn');
const entryContent = document.getElementById('entryContent');

let entries = [];

newEntryBtn.addEventListener('click', () => {
  entryModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  entryModal.style.display = 'none';
  entryContent.value = '';
});

saveEntryBtn.addEventListener('click', () => {
  const content = entryContent.value.trim();
  if (content !== '') {
    const entry = {
      id: Date.now(),
      content: content
    };
    entries.push(entry);
    renderEntries();
    entryModal.style.display = 'none';
    entryContent.value = '';
  }
});

function renderEntries() {
  entriesContainer.innerHTML = '';
  entries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.classList.add('entry');
    entryElement.innerHTML = `
      <div>
        <p>${entry.content}</p>
        <button onclick="editEntry(${entry.id})">Edit</button>
        <button onclick="deleteEntry(${entry.id})">Delete</button>
      </div>
    `;
    entriesContainer.appendChild(entryElement);
  });
}

function editEntry(id) {
  const entry = entries.find(entry => entry.id === id);
  if (entry) {
    entryContent.value = entry.content;
    entries = entries.filter(entry => entry.id !== id);
    renderEntries();
    entryModal.style.display = 'block';
  }
}

function deleteEntry(id) {
  entries = entries.filter(entry => entry.id !== id);
  renderEntries();
}
