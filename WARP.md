# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal portfolio website hosted on GitHub Pages (juandeodin.github.io) featuring interactive web games and project showcases. The site is built with vanilla HTML, CSS, and JavaScript, using Bootstrap for styling.

## Development Commands

### Local Development
```bash
# Serve locally using Python's built-in server
python -m http.server 8000
# Or with Python 3
python3 -m http.server 8000
# Then visit http://localhost:8000

# Alternative with Node.js
npx http-server -p 8000
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Stage changes
git add .

# Commit changes
git commit -m "Add: description of changes"

# Push to GitHub
git push origin feature/your-feature-name

# Merge to main after review
git checkout main
git merge feature/your-feature-name
git push origin main
```

### Testing Games
```bash
# Test unified template games
open "http://localhost:8000/game.html?game=yoNunca"
open "http://localhost:8000/game.html?game=redFlags"
open "http://localhost:8000/game.html?game=verdadReto"

# Test independent games
open "http://localhost:8000/memoryMatrix.html"

# Test main page responsiveness
open "http://localhost:8000/index.html"
```

## Architecture

### File Structure
```
├── index.html              # Main portfolio page
├── game.html              # Unified template for all drinking games
├── [legacy-game].html     # Legacy individual game pages (deprecated)
├── questions/              # Game data
│   ├── *.csv              # Question/content files for drinking games
│   ├── facts.json         # Educational facts for Memory Matrix
│   └── test.json          # Quiz data (Harry Potter houses)
├── javascript/
│   ├── JuegoBeber.js      # Shared logic for drinking games
│   ├── gameConfig.js      # Game configuration and template system
│   ├── memoryMatrix.js    # Memory game logic
│   ├── Preguntas.js       # Question handling utilities
│   └── Buzzfeed.js        # Quiz game logic
├── css/
│   ├── juegoBeber.css     # Shared styles for all games (responsive)
│   ├── memoryMatrix.css   # Memory game styles
│   └── Buzzfeed.css       # Quiz game styles
└── .vscode/               # VS Code configuration
```

### Game Architecture Pattern

**Unified Template System**: All drinking games now use a single template (`game.html`) with URL parameters:
- `game.html?game=yoNunca` - Yo Nunca game
- `game.html?game=redFlags` - Red Flags game
- `game.html?game=verdadReto` - Verdad o Reto game

**Template Components**:
1. **Screen Flow**: Rules → Category Selection → Game Play
2. **Data Format**: CSV files in `questions/` directory with `tipo,pregunta` format
3. **Configuration**: `gameConfig.js` contains all game-specific parameters
4. **Shared Logic**: `JuegoBeber.js` handles common functionality
5. **Responsive Styling**: `juegoBeber.css` provides consistent theming and mobile optimization

### Game Components

**Unified Template System (`gameConfig.js`)**:
- `gameConfigs`: Object containing all game configurations
- `initializeGame(gameType)`: Sets up game based on URL parameter
- `createCategories()`: Dynamically generates category checkboxes
- `applyTheme()`: Applies game-specific styling
- `startGame()`: Wrapper for `cargarPreguntas()` with current config

**Drinking Games (`JuegoBeber.js`)**:
- `cargarPreguntas(juego)`: Loads questions from CSV, filters by category
- `cambiarPantalla()`: Manages screen transitions
- `siguientePregunta()`: Advances to next question
- `shuffleArray()`: Randomizes question order

**Memory Matrix (`memoryMatrix.js`)**:
- Card matching game with educational facts
- Facts displayed via modal on successful matches
- Confetti animation on game completion
- Sound effects for card flips

**Quiz System (`Buzzfeed.js`)**:
- Scoring system for Harry Potter house sorting
- JSON-based question/answer data structure

### Styling System

**Color Schemes**:
- Yo Nunca: Purple (`#8e44ad`)
- Red Flags: Red (`#e74c3c`) 
- Verdad o Reto: Blue (`#3498db`)
- Memory Matrix: Dark theme

**Typography**:
- Headers: 'Luckiest Guy' (festive games)
- Body: 'Montserrat' (questions/content)
- Bootstrap 5.3.0 for layout system

## Adding New Games

### Drinking Game Pattern (Unified Template)
1. Create CSV file in `questions/[game-name].csv`
2. Add configuration to `gameConfigs` object in `javascript/gameConfig.js`
3. Add game link to `index.html` using format: `game.html?game=[game-name]`
4. Add color scheme CSS classes to `css/juegoBeber.css`

**Example Game Configuration**:
```javascript
newGame: {
    title: "Game Title",
    displayName: "Display Name", 
    themeClass: "theme-class",
    csvFile: "csvFileName",
    rules: `Game rules HTML content`,
    categories: [
        { id: "cat1", value: "cat1", label: "Category 1", class: "clasico", colClass: "col-12 col-md-4" }
    ]
}
```

### Memory/Puzzle Game Pattern
1. Create dedicated HTML file
2. Create separate JS file for game logic
3. Create separate CSS file for styling
4. Add to main navigation

### Quiz Game Pattern
1. Create JSON file for questions/scoring
2. Follow Buzzfeed.js pattern for scoring logic
3. Implement results calculation system

## Content Guidelines

### Questions (CSV Format)
- Header: `tipo,pregunta`
- Categories should be concise (sexual, amor, humor, etc.)
- Questions in Spanish, casual tone
- No explicit content that would be inappropriate for social settings

### Educational Content (JSON)
- Facts should be informative and interesting
- Appropriate for general audiences
- Well-formatted for modal display

## Technical Notes

### Bootstrap Integration
- Uses Bootstrap 5.3.0 CDN
- Custom classes override Bootstrap defaults
- Fully responsive design with mobile-first approach
- Grid system used for button layouts on main page
- Responsive game cards with proper centering
- Mobile-optimized typography and spacing

### Font Integration
- Google Fonts CDN for custom typography
- Fallback fonts specified in CSS

### Asset Management
- External image assets from `vscodeedu.com` domain
- Audio files expected in `sounds/` directory
- No build process required - direct file serving

### Browser Compatibility
- Modern browsers (ES6+ features used)
- Mobile-responsive design
- Touch-friendly interface for games

## Deployment

This site is deployed via GitHub Pages. Any changes to the `main` branch will automatically deploy to the live site at the GitHub Pages URL.
