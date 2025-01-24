// Initialisation des blocs de jeu
const gameBoard = document.getElementById('game-board');
const blockNames = ['🧱', '🌳', '💎', '🔥', '🍞', '🍖', '🪓', '⚒️'];
let blocks = [...blockNames, ...blockNames]; // Duplication pour le jeu mémoire
let flippedCards = []; // Liste des cartes retournées
let matchedCards = []; // Liste des cartes trouvées
let attempts = 0; // Compteur de tentatives

// Mélanger les éléments du tableau
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Échanger les éléments
  }
}

shuffle(blocks); // Mélange les blocs

// Créer les cases de jeu dans la grille
blocks.forEach((block, index) => {
  const div = document.createElement('div');
  div.dataset.index = index;
  div.dataset.block = block;
  div.addEventListener('click', flipCard);
  div.addEventListener('mouseover', handleMouseOver);
  div.addEventListener('mouseleave', handleMouseLeave);
  gameBoard.appendChild(div);
});

// Gérer l'effet de mouvement lorsque la souris passe au-dessus de la carte
function handleMouseOver() {
  this.style.transform = 'translateY(-10px)';
}

// Réinitialiser la position de la carte quand la souris quitte
function handleMouseLeave() {
  this.style.transform = 'translateY(0)';
}

// Retourner une carte
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped') && !matchedCards.includes(this)) {
    this.classList.add('growing'); // Appliquer l'animation pour agrandir la carte
    setTimeout(() => {
      this.classList.add('flipped');
      this.textContent = this.dataset.block; // Afficher l'emoji du bloc
    }, 300); // Attendre la fin de l'animation d'agrandissement avant de la retourner

    flippedCards.push(this);

    // Vérifier si deux cartes sont retournées
    if (flippedCards.length === 2) {
      attempts++;
      document.getElementById('attempts').textContent = `Tentatives: ${attempts}`;

      // Vérifier si les cartes correspondent
      if (flippedCards[0].dataset.block === flippedCards[1].dataset.block) {
        matchedCards.push(flippedCards[0], flippedCards[1]);
        flippedCards = []; // Réinitialiser les cartes retournées
        checkGameWin();
      } else {
        // Réinitialiser les cartes après un délai
        setTimeout(() => {
          flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.classList.remove('growing'); // Retirer l'animation de croissance
            card.textContent = ''; // Vider le contenu de la carte
          });
          flippedCards = [];
        }, 1000); // Délai pour réinitialiser les cartes
      }
    }
  }
}

// Vérifier si le jeu est gagné
function checkGameWin() {
  if (matchedCards.length === blocks.length) {
    document.getElementById('message').textContent = 'Félicitations, vous avez gagné !';
  }
}
