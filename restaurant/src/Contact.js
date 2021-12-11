import './Contact.css';

const Contact = () => {
  const container = document.createElement('div');
  container.classList.add('contact-container', 'tab');
  container.setAttribute('id', 'Contact');

  const header = document.createElement('h2');
  header.textContent = "Houdini's Contact";
  container.appendChild(header);

  const phone_header = document.createElement('h3');
  phone_header.textContent = "Phone";
  container.appendChild(phone_header);

  const phone_number = document.createElement('span');
  phone_number.textContent = 'Call: (555) 555-5555';
  phone_number.classList.add('phone');
  const text_number = document.createElement('span');
  text_number.textContent = 'Text: (444) 444-4444';
  text_number.classList.add('phone');
  container.appendChild(phone_number);
  container.appendChild(text_number);

  const pickup_header = document.createElement('h3');
  pickup_header.textContent = "Pickup";
  container.appendChild(pickup_header);

  const pickup_location = document.createElement('span');
  pickup_location.textContent = "N7777 Houdini's Court, NYC, NY";
  container.appendChild(pickup_location);

  const thank_you_header = document.createElement('h3');
  thank_you_header.textContent = "Thank you for choosing Houdini's";
  container.appendChild(thank_you_header);

  return container;
}

export { Contact };