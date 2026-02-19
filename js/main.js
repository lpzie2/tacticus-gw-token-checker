// globals
let gameData = null;
let playerData = {};
let battleData = {};
let activityLogs = null;

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

// set up drop zones
document.addEventListener('DOMContentLoaded', function() {
    const dropZones = document.querySelectorAll('.guild-column');
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            this.style.background = '#3a4a5e';
        });

        zone.addEventListener('dragleave', function(e) {
            this.style.background = '#2a2a3e';
        });

        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.background = '#2a2a3e';
            
            const userId = e.dataTransfer.getData('text/plain');
            const guildIndex = parseInt(this.dataset.guild);
            
            if (playerData[userId]) {
                playerData[userId].guild = guildIndex;
                renderPlayers();
                renderStats();
            }
        });
    });
});