const telegramLink = 'https://t.me/cheshire_ironi';

const eyes = document.querySelectorAll('.eye');
const skullFace = document.getElementById('skullFace');
const secretMessage = document.getElementById('secretMessage');
const statusMessage = document.getElementById('statusMessage');
const primaryButton = document.getElementById('primaryButton');
const secondaryButton = document.getElementById('secondaryButton');

let evasiveAttempts = 0;
let canMove = true;
let statusTimeout;

const evasiveWarnings = [
  'Resistance is adorable, but futile.',
  'The Creator is waiting.',
  'Your refusal has been logged as treason.',
  'Are you trying to hurt a cute skull\'s feelings?',
  'Think again, mortal.'
];

function showStatus(message, duration = 1500) {
  statusMessage.innerHTML = message;
  statusMessage.classList.remove('active');
  void statusMessage.offsetWidth;
  statusMessage.classList.add('active');

  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => {
    statusMessage.classList.remove('active');
  }, duration);
}

/*function trackEyesInteraction(event) {
  let isNearFlowerZone = false;
  let isNearFireZone = false;

  eyes.forEach((eye) => {
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;
    const mouseDistance = Math.hypot(event.clientX - eyeCenterX, event.clientY - eyeCenterY);

    // ЭТАП 1: Курсор вошел в широкую зону взаимодействия (280px) — распускаются цветы
    if (mouseDistance < 280) {
      isNearFlowerZone = true;
    }
    
    // ЭТАП 2: Курсор максимально близко к глазницам (140px) — загорается огонь
    if (mouseDistance < 140) {
      isNearFireZone = true;
    }
  });

  // Синхронно переключаем классы этапов для обоих глазниц
  if (isNearFlowerZone) {
    eyes.forEach((e) => e.classList.add('expand-pupil'));
  } else {
    eyes.forEach((e) => e.classList.remove('expand-pupil'));
  }

  if (isNearFireZone) {
    eyes.forEach((e) => e.classList.add('is-alert'));
    secretMessage.classList.add('visible');
  } else {
    eyes.forEach((e) => e.classList.remove('is-alert'));
    secretMessage.classList.remove('visible');
  }
}*/
function trackEyesInteraction(event) {
  eyes.forEach((eye) => {
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;
    const mouseDistance = Math.hypot(event.clientX - eyeCenterX, event.clientY - eyeCenterY);

    // Теперь включаем только огонь
    if (mouseDistance < 140) {
      eye.classList.add('is-alert');
      secretMessage.classList.add('visible');
    } else {
      eye.classList.remove('is-alert');
      secretMessage.classList.remove('visible');
    }
  });
}


function moveEvasiveButton() {
  evasiveAttempts += 1;
  const warning = evasiveWarnings[(evasiveAttempts - 1) % evasiveWarnings.length];
  showStatus(warning);

  const buttonRect = secondaryButton.getBoundingClientRect();
  const card = document.querySelector('.mission-card');
  const cardRect = card.getBoundingClientRect();
  const padding = 24;

  const minLeft = cardRect.left + padding;
  const maxLeft = cardRect.right - buttonRect.width - padding;

  let minTop, maxTop;

  if (window.innerWidth <= 750) {
    minTop = padding; 
    maxTop = window.innerHeight - buttonRect.height - padding;
  } else {
    minTop = cardRect.top + padding;
    maxTop = cardRect.bottom - buttonRect.height - padding;
  }

  const nextLeft = Math.random() * (maxLeft - minLeft) + minLeft;
  const nextTop = Math.random() * (maxTop - minTop) + minTop;
  
  secondaryButton.classList.add('floating');
  secondaryButton.style.left = `${nextLeft}px`;
  secondaryButton.style.top = `${nextTop}px`;
}

function detectButtonApproach(event) {
  const rect = secondaryButton.getBoundingClientRect();
  const closestX = Math.max(rect.left, Math.min(event.clientX, rect.right));
  const closestY = Math.max(rect.top, Math.min(event.clientY, rect.bottom));
  const distance = Math.hypot(event.clientX - closestX, event.clientY - closestY);

  if (distance < 20 && canMove) {
    canMove = false;
    moveEvasiveButton();
    setTimeout(() => {
      canMove = true;
    }, 500);
  }
}

primaryButton.addEventListener('click', () => {
  showStatus('Mission authorization approved.<br>Connecting to the Gift Officer...');
  setTimeout(() => {
    window.open(telegramLink, '_blank', 'noopener,noreferrer');
  }, 1500);
});

secondaryButton.addEventListener('click', () => {
  showStatus('Error: Audacity levels exceeded.<br><br>The Creator is officially unamused, and the Supreme Skull Council is deeply offended.<br><br>Prepare for imminent dramatic sighs and minor retaliatory pouting.', 5000);
});

function showSecretMessage() {
  secretMessage.classList.add('visible');
  setTimeout(() => {
    secretMessage.classList.remove('visible');
  }, 2500);
}

if (skullFace) {
  skullFace.addEventListener('mouseenter', showSecretMessage);
  skullFace.addEventListener('click', showSecretMessage);
}

document.addEventListener('mousemove', trackEyesInteraction);
document.addEventListener('mousemove', detectButtonApproach);

window.addEventListener('resize', () => {
  secondaryButton.classList.remove('floating');
  secondaryButton.style.left = '';
  secondaryButton.style.top = '';
});
