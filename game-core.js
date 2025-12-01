class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.moisture = 'dry';
        this.plant = null;
    }

    setWater() {
        this.moisture = 'water';
        this.plant = null;
    }

    setDry() {
        this.moisture = 'dry';
        this.plant = null;
    }

    addPlant(type) {
        if ((this.moisture !== 'water' || type === 'bog') && !this.plant) {
            this.plant = this.createPlant(type);
            return true;
        }
        return false;
    }

    createPlant(type) {
        switch(type) {
            case 'potato':
                return new PotatoPlant();
            case 'bog':
                return new BogPlant();
            case 'cactus':
                return new CactusPlant();
            default:
                throw new Error(`Unknown plant type: ${type}`);
        }
    }

    removePlant() {
        this.plant = null;
    }

    grow() {
        if (this.plant) {
            this.plant.grow(this.moisture);
        }
    }
}
const game = {
    grid: [],
    tool: 'shovel',
    plant: 'potato',
    plantManager: new PlantManager()
};
class GridManager {
    static createGrid() {
        const grid = [];
        for (let y = 0; y < ROWS; y++) {
            const row = [];
            for (let x = 0; x < COLS; x++) {
                row.push(new Cell(x, y));
            }
            grid.push(row);
        }
        return grid;
    }

    static getNeighbors(x, y) {
        const neighbors = [];
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                const nx = x + dx, ny = y + dy;
                if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS && (dx !== 0 || dy !== 0)) {
                    neighbors.push(game.grid[ny][nx]);
                }
            }
        }
        return neighbors;
    }

    static updateMoisture() {
        for (let row of game.grid) {
            for (let cell of row) {
                if (cell.moisture === 'wet') cell.moisture = 'dry';
            }
        }
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                const cell = game.grid[y][x];
                if (cell.moisture === 'water') {
                    for (let neighbor of this.getNeighbors(x, y)) {
                        if (neighbor.moisture !== 'water') {
                            neighbor.moisture = 'wet';
                        }
                    }
                }
            }
        }
    }

    static growAll() {
        for (let row of game.grid) {
            for (let cell of row) {
                cell.grow();
            }
        }
    }
}