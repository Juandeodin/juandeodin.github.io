// Game configurations for the unified template
const gameConfigs = {
    yoNunca: {
        title: "Yo Nunca",
        displayName: "Yo Nunca",
        themeClass: "yonunca",
        csvFile: "yoNunca",
        rules: `Cada jugador, por turnos, dice una frase empezando por <b>"Yo nunca..."</b>.<br>
                Quien sí lo haya hecho, debe beber. <b>Reglas adicionales: </b> <br><i>Brindo por tu historia:</i> Si alguien bebe con una pregunta, otra persona puede
                beber el doble que esa persona diciendo "Brindo por tu historia" y obligar a la otra persona a contar su historia.`,
        categories: [
            { id: "sexual", value: "sexual", label: "Sexual", class: "clasico", colClass: "col-12 col-md-4" },
            { id: "amor", value: "amor", label: "Amor", class: "picante", colClass: "col-12 col-md-4" },
            { id: "humor", value: "humor", label: "Humor", class: "humor", colClass: "col-12 col-md-4" }
        ]
    },
    redFlags: {
        title: "Red Flag",
        displayName: "Red Flag",
        themeClass: "redflags",
        csvFile: "redFlags",
        rules: `Cada jugador, por turnos, dice una frase empezando por <b>"Red Flag..."</b>.<br>
                <i>Se puede jugar de distintas maneras:</i> Pueden beber las personas que <b>tengan</b> dicha red flag o pueden beber las personas
                que <b>hayan salido o salgan</b> con personas con esa red flag.<br>`,
        categories: [
            { id: "hombre", value: "hombre", label: "Hombres", class: "clasico", colClass: "col-12 col-md-4" },
            { id: "mujer", value: "mujer", label: "Mujeres", class: "picante", colClass: "col-12 col-md-4" },
            { id: "ambos", value: "ambos", label: "Ambos", class: "humor", colClass: "col-12 col-md-4" }
        ]
    },
    verdadReto: {
        title: "Verdad o Reto",
        displayName: "Verdad o Reto",
        themeClass: "verdadreto",
        csvFile: "verdadReto",
        rules: `Cada jugador, por turnos, debe elegir entre <b>"Verdad"</b> o <b>"Reto"</b>.<br>
                Si eliges <b>Verdad</b>, debes responder honestamente la pregunta que aparezca.<br>
                Si eliges <b>Reto</b>, debes completar el desafío que se te presente. <br><i>¡No hay excusas!</i>`,
        categories: [
            { id: "verdad", value: "verdad", label: "Verdad", class: "clasico", colClass: "col-12 col-md-6" },
            { id: "reto", value: "reto", label: "Reto", class: "picante", colClass: "col-12 col-md-6" }
        ]
    }
};

let currentGameType = null;

function initializeGame(gameType) {
    currentGameType = gameType;
    const config = gameConfigs[gameType];
    
    if (!config) {
        console.error('Game configuration not found for:', gameType);
        return;
    }
    
    // Set title
    document.getElementById('game-title').textContent = config.title;
    document.title = config.title;
    
    // Set header
    const header = document.getElementById('game-header');
    header.textContent = config.displayName;
    header.className = `mb-3 text-center titulo-festivo ${config.themeClass}`;
    
    // Set rules
    document.getElementById('game-rules').innerHTML = config.rules;
    
    // Create categories
    createCategories(config.categories);
    
    // Apply theme to buttons
    applyTheme(config.themeClass);
}

function createCategories(categories) {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = `${category.colClass} d-flex align-items-center justify-content-center`;
        
        categoryDiv.innerHTML = `
            <input class="form-check-input checkbox-festivo ${category.class}" type="checkbox" id="${category.id}" name="categoria" value="${category.value}">
            <label class="form-check-label label-festivo ${category.class} ms-2" for="${category.id}">${category.label}</label>
        `;
        
        container.appendChild(categoryDiv);
    });
}

function applyTheme(themeClass) {
    const empezarBtn = document.getElementById('empezar');
    const siguienteBtn = document.getElementById('siguiente');
    const continuarBtn = document.getElementById('btnContinuar');
    
    // Remove existing theme classes
    const themeClasses = ['yonunca', 'redflags', 'verdadreto'];
    themeClasses.forEach(cls => {
        empezarBtn.classList.remove(`btn-siguiente`, cls, `btn-empezar`);
        siguienteBtn.classList.remove(`btn-siguiente`, cls);
        continuarBtn.classList.remove(`btn-siguiente`, cls, `btn-empezar`);
    });
    
    // Add new theme classes
    empezarBtn.classList.add(`btn-siguiente`, themeClass);
    siguienteBtn.classList.add(`btn-siguiente`, themeClass);
    continuarBtn.classList.add(`btn-siguiente`, themeClass);
}

function startGame() {
    const config = gameConfigs[currentGameType];
    if (config) {
        cargarPreguntas(config.csvFile);
    }
}
