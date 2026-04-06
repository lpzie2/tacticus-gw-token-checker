// globals
let gameData = null;
let playerData = {};
let battleData = {};
let activityLogs = null;

// to do sorting.
const guildSortState = {
    1: { key: 'tokensRemaining', dir: 'desc' },
    2: { key: 'tokensRemaining', dir: 'desc' },
};

function setSortAndRender(guild, key) {
    const state = guildSortState[guild];
    if (state.key === key) {
        state.dir = state.dir === 'desc' ? 'asc' : 'desc';
    } else {
        state.key = key;
        state.dir = 'desc';
    }
    renderPlayers();
}

// file uploading
document.getElementById('jsonFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        playerData      = {};
        battleData      = {};
        activityLogs    = [];
        gameData        = null;

        document.getElementById('fileName').textContent = file.name;
        const reader    = new FileReader();
        reader.onload   = function(event) {
            try {
                gameData = JSON.parse(event.target.result);
                processGameData();
                document.getElementById('content').style.display = 'block';
            } catch (error) {
                alert('Error parsing JSON file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
});

// help overlay functionality
document.getElementById('helpButton').addEventListener('click', function() {
    document.getElementById('helpOverlay').classList.add('active');
});

document.getElementById('closeHelp').addEventListener('click', function() {
    const overlay = document.getElementById('helpOverlay');
    const content = overlay.querySelector('.help-content');
    const image = overlay.querySelector('.help-image');
    
    overlay.classList.remove('active');
    overlay.classList.remove('zoomed');
    content.classList.remove('zoomed');
    image.classList.remove('zoomed');
});

// click image to zoom in/out
document.querySelector('.help-image').addEventListener('click', function(e) {
    e.stopPropagation();
    const overlay = document.getElementById('helpOverlay');
    const content = document.querySelector('.help-content');
    this.classList.toggle('zoomed');
    content.classList.toggle('zoomed');
    overlay.classList.toggle('zoomed');
});

// close overlay when clicking outside the content (but not when zoomed)
document.getElementById('helpOverlay').addEventListener('click', function(e) {
    const image = this.querySelector('.help-image');
    if (e.target === this && !image.classList.contains('zoomed')) {
        this.classList.remove('active');
    }
});

// close w/ ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('helpOverlay');
        const content = overlay.querySelector('.help-content');
        const image = overlay.querySelector('.help-image');
        
        if (image.classList.contains('zoomed')) {
            // if zoomed, unzoom.
            image.classList.remove('zoomed');
            content.classList.remove('zoomed');
            overlay.classList.remove('zoomed');
        } else {
            // else, close overlay
            overlay.classList.remove('active');
        }
    }
});

// legends listeners
document.getElementById('legendButton').addEventListener('click', function() {
    document.getElementById('legendOverlay').classList.add('active');
    document.getElementById('legendContent').innerHTML = buildLegendHTML();
});

document.getElementById('closeLegend').addEventListener('click', function() {
    document.getElementById('legendOverlay').classList.remove('active');
});

document.getElementById('legendOverlay').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
});

// ranking overlay listeners
document.getElementById('closeRanking').addEventListener('click', function() {
    document.getElementById('rankingOverlay').classList.remove('active');
});

document.getElementById('rankingOverlay').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
});