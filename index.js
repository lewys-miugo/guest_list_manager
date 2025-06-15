const form = document.getElementById('guest-form');
const nameInput = document.getElementById('guest-name');
const guestList = document.getElementById('guest-list');
const categorySelect = document.getElementById('guest-category');

let guestCount = 0;
const maxGuests = 10;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const category = categorySelect.value;

  if (!name) return;
  if (guestCount >= maxGuests) {
    alert('Guest list is full! Max 10 guests allowed.');
    return;
  }

  addGuest(name, category);
  nameInput.value = '';
});

function addGuest(name, category) {
  const li = document.createElement('li');
  li.className = 'guest-item';

  const timestamp = new Date().toLocaleTimeString();
  const tag = `<span class="tag ${category}">${category}</span>`;

  li.innerHTML = `
    <span>
      ${tag} 
      <strong class="guest-name">${name}</strong>
      <em style="font-size: 0.8em; color: gray;">(${timestamp})</em>
    </span>
    <span>
      <button class="rsvp">Not Attending</button>
      <button class="edit">Edit</button>
      <button class="delete">Remove</button>
    </span>
  `;

  guestList.appendChild(li);
  guestCount++;

  // RSVP Toggle
  li.querySelector('.rsvp').addEventListener('click', function () {
    this.textContent = this.textContent === 'Attending' ? 'Not Attending' : 'Attending';
  });

  // Delete
  li.querySelector('.delete').addEventListener('click', function () {
    guestList.removeChild(li);
    guestCount--;
  });

  // Edit
  li.querySelector('.edit').addEventListener('click', function () {
    const newName = prompt('Update guest name:', name);
    if (newName && newName.trim()) {
      li.querySelector('.guest-name').textContent = newName.trim();
    }
  });
}
