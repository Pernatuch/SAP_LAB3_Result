class Renderer {
    static renderGrid() {
        const gridEl = document.getElementById('grid');
        gridEl.innerHTML = '';

        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                const cell = game.grid[y][x];
                const div = document.createElement('div');
                div.className = `cell ${cell.moisture}`;
                div.dataset.x = x;
                div.dataset.y = y;

                if (cell.plant) {
                    const plantEl = document.createElement('div');
                    plantEl.className = `plant ${cell.plant.dead ? 'dead' : ''}`;
                    plantEl.textContent = cell.plant.emoji;
                    div.appendChild(plantEl);
                }

                gridEl.appendChild(div);
            }
        }
    }

    static updateToolButtons() {
        document.querySelectorAll('.tool').forEach(b => b.classList.remove('active'));
        document.getElementById(game.tool).classList.add('active');
    }

    static updateSeedButtons() {
        document.querySelectorAll('.seed').forEach(b => b.classList.remove('active'));
        document.querySelector(`.seed[data-plant="${game.plant}"]`).classList.add('active');
    }
}
class EventHandlers {
    static handleGridClick(e) {
        const cellEl = e.target.closest('.cell');
        if (!cellEl) return;

        const x = parseInt(cellEl.dataset.x);
        const y = parseInt(cellEl.dataset.y);
        const cell = game.grid[y][x];

        if (game.tool === 'shovel') {
            cell.moisture === 'water' ? cell.setDry() : cell.removePlant();
        } else if (game.tool === 'water') {
            if (!cell.plant) cell.setWater();
        } else if (game.tool === 'plant') {
            if (game.plantManager.isValidPlantType(game.plant)) {
                cell.addPlant(game.plant);
            }
        }

        GridManager.updateMoisture();
        Renderer.renderGrid();
    }

    static handleGrowClick() {
        GridManager.growAll();
        Renderer.renderGrid();
    }

    static handleToolClick(e) {
        game.tool = e.target.id;
        Renderer.updateToolButtons();
    }

    static handleSeedClick(e) {
        const plantType = e.target.dataset.plant;
        if (game.plantManager.isValidPlantType(plantType)) {
            game.plant = plantType;
            Renderer.updateSeedButtons();
        } else {
            console.warn(`Invalid plant type: ${plantType}`);
            game.plant = game.plantManager.defaultPlant;
            Renderer.updateSeedButtons();
        }
    }

    static setupEventListeners() {
        document.getElementById('grid').addEventListener('click', this.handleGridClick);
        document.getElementById('grow').addEventListener('click', this.handleGrowClick);

        document.querySelectorAll('.tool').forEach(btn => {
            btn.addEventListener('click', this.handleToolClick);
        });

        document.querySelectorAll('.seed').forEach(btn => {
            btn.addEventListener('click', this.handleSeedClick);
        });
    }
}