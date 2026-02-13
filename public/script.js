/* ========================================
   SUNSET MOUNTAIN TALES - JAVASCRIPT
   ======================================== */

// ========================================
// GAME STATE MANAGEMENT
// ========================================

const gameState = {
    currentScene: 0,
    totalScenes: 4,
    isTyping: false,
    envelopeOpened: false,
};


// ========================================
// SCENE DATA - Story Flow
// ========================================

const scenes = [
    {
        // Scene 1: Opening
        id: 0,
        dialogue: "What a beautiful sunset! Isn't it?",
        speaker: "Solemn the cat",
        buttons: [
            { text: "Where am I?", nextScene: 1 },
            { text: "Hmm!", nextScene: 1 }
        ],
        catExpression: "normal",
        showEnvelope: false,
    },
    {
        // Scene 2: Cat responds
        id: 1,
        dialogue: "Uhm... You'll see.",
        speaker: "Solemn the cat",
        buttons: [
            { text: "Continue...", nextScene: 2 }
        ],
        catExpression: "curious",
        showEnvelope: false,
    },
    {
        // Scene 3: Envelope appears
        id: 2,
        dialogue: "Oh look! A letter appeared! Try clicking on it.",
        speaker: "Solemn the cat",
        buttons: [],
        catExpression: "excited",
        showEnvelope: true,
    },
    {
        // Scene 4: Envelope message
        id: 3,
        dialogue: "What does the message say?",
        speaker: "Solemn the cat",
        buttons: [
            { text: "The End", nextScene: 0 }
        ],
        catExpression: "normal",
        showEnvelope: false,
    }
];

const envelopeMessage = "~ Opening Letter ~\n\nGetting ready to ask you something special...\n\n💕";

// ========================================
// DOM ELEMENT REFERENCES
// ========================================

const dialogueText = document.getElementById('dialogueText');
const dialogueSpeaker = document.getElementById('dialogueSpeaker');
const buttonsContainer = document.getElementById('buttonsContainer');
const envelope = document.getElementById('envelope');
const messageOverlay = document.getElementById('messageOverlay');
const messageText = document.getElementById('messageText');
const catImage = document.getElementById('catImage');
const catContainer = document.querySelector('.cat-container');

// ========================================
// TYPEWRITER EFFECT FUNCTION
// ========================================

/**
 * Creates a typewriter effect for dialogue text
 * @param {string} text - The text to display
 * @param {HTMLElement} element - The element to display text in
 * @param {number} speed - Milliseconds between each character
 * @returns {Promise} - Resolves when typing is complete
 */
function typeWriterEffect(text, element, speed = 50) {
    return new Promise((resolve) => {
        gameState.isTyping = true;
        element.textContent = '';
        let index = 0;

        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
            } else {
                clearInterval(typeInterval);
                gameState.isTyping = false;
                resolve();
            }
        }, speed);
    });
}

// ========================================
// DIALOGUE DISPLAY FUNCTION
// ========================================

/**
 * Display dialogue for the current scene
 * @param {Object} scene - The scene object containing dialogue info
 */
async function showDialogue(scene) {
    // Set speaker name
    dialogueSpeaker.textContent = scene.speaker;
    
    // Add typewriter effect to dialogue
    await typeWriterEffect(scene.dialogue, dialogueText, 40);
}

// ========================================
// CAT EXPRESSION CHANGES
// ========================================

/**
 * Change the cat's expression based on scene
 * @param {string} expression - The expression type: "normal", "excited", "curious"
 */
function changeCatExpression(expression) {
    // Remove all expression classes
    catContainer.classList.remove('cat-normal', 'cat-excited', 'cat-curious');
    
    // Add new expression class for animation effect
    if (expression !== 'normal') {
        catContainer.classList.add(`cat-${expression}`);
    }

    // Add visual feedback with scale animation
    catImage.style.transform = 'scale(0.95)';
    setTimeout(() => {
        catImage.style.transform = 'scale(1)';
    }, 200);
}

// ========================================
// BUTTON CREATION & HANDLING
// ========================================

/**
 * Create and display interactive buttons
 * @param {Array} buttonData - Array of button objects
 */
function showButtons(buttonData) {
    // Clear existing buttons
    buttonsContainer.innerHTML = '';

    if (buttonData.length === 0) {
        return; // No buttons for this scene
    }

    // Create and add each button
    buttonData.forEach((btnData) => {
        const button = document.createElement('button');
        button.className = 'interactive-button pixel-font';
        button.textContent = btnData.text;
        
        // Add click handler
        button.addEventListener('click', () => {
            nextScene(btnData.nextScene);
        });

        buttonsContainer.appendChild(button);
    });
}

// ========================================
// ENVELOPE MANAGEMENT
// ========================================

/**
 * Show the envelope element
 */
function showEnvelope() {
    envelope.classList.add('show');
    
    // Add click listener for envelope opening
    envelope.addEventListener('click', openEnvelope, { once: true });
}

/**
 * Hide the envelope element
 */
function hideEnvelope() {
    envelope.classList.remove('show');
    gameState.envelopeOpened = false;
}

/**
 * Open the envelope and redirect to Valentine proposal
 */
function openEnvelope() {
    envelope.classList.add('open');
    gameState.envelopeOpened = true;

    // Redirect to Valentine proposal after envelope animation
    setTimeout(() => {
        window.location.href = "valentine.html";
    }, 1200);
}

/**
 * Display message overlay
 * @param {string} message - The message text
 */
function showMessage(message) {
    messageText.textContent = message;
    messageOverlay.classList.add('show');

    // Close message on click
    messageOverlay.addEventListener('click', closeMessage, { once: true });
}

/**
 * Close message overlay and transition to Valentine app
 */
function closeMessage() {
    messageOverlay.classList.remove('show');
    
    // Transition to Valentine app after short delay
    setTimeout(() => {
        // Redirect to the Valentine proposal app
        window.location.href = "valentine.html";
    }, 500);
}

// ========================================
// SCENE MANAGEMENT
// ========================================

/**
 * Load and display a specific scene
 * @param {number} sceneId - The scene ID to load
 */
async function loadScene(sceneId) {
    if (sceneId < 0 || sceneId >= scenes.length) {
        console.error('Invalid scene ID');
        return;
    }

    const scene = scenes[sceneId];
    gameState.currentScene = sceneId;

    // Change cat expression
    changeCatExpression(scene.catExpression);

    // Clear previous buttons
    buttonsContainer.innerHTML = '';

    // Show envelope or hide it
    if (scene.showEnvelope && !gameState.envelopeOpened) {
        showEnvelope();
    } else {
        hideEnvelope();
    }

    // Display dialogue with typewriter effect
    await showDialogue(scene);

    // Show buttons (if any)
    if (scene.buttons.length > 0) {
        showButtons(scene.buttons);
    }
}

/**
 * Move to the next scene
 * @param {number} sceneId - The scene ID to move to
 */
function nextScene(sceneId) {
    // Don't allow scene changes while typing
    if (gameState.isTyping) {
        return;
    }

    loadScene(sceneId);
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize the application
 */
function init() {
    console.log('🌅 Sunset Mountain Tales - Starting...');
    
    // Load the first scene
    loadScene(0);

    // Add keyboard navigation (optional)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !gameState.isTyping) {
            // Skip to next available action
            const buttons = buttonsContainer.querySelectorAll('.interactive-button');
            if (buttons.length === 1) {
                buttons[0].click();
            }
        }
    });

    console.log('✨ Game initialized');
}

// ========================================
// START THE GAME
// ========================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Reset game state (for replay)
 */
function resetGame() {
    gameState.currentScene = 0;
    gameState.envelopeOpened = false;
    gameState.isTyping = false;
    
    loadScene(0);
}

/**
 * Log current game state (for debugging)
 */
function logState() {
    console.log('Game State:', gameState);
    console.log('Current Scene:', scenes[gameState.currentScene]);
}
