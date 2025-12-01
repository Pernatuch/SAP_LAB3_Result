class PlantBase {
    constructor() {
        this.grown = false;
        this.dead = false;
    }

    grow(moisture) {
        this.grown = moisture === this.likes;
        this.dead = !this.grown;
    }
}
class PotatoPlant extends PlantBase {
    constructor() {
        super();
        this.type = 'potato';
        this.emoji = '🥔';
        this.likes = 'wet';
    }
}

class BogPlant extends PlantBase {
    constructor() {
        super();
        this.type = 'bog';
        this.emoji = '☘️';
        this.likes = 'water';
    }
}

class CactusPlant extends PlantBase {
    constructor() {
        super();
        this.type = 'cactus';
        this.emoji = '🌵';
        this.likes = 'dry';
    }
}
class PlantManager {
    constructor() {
        this.plantTypes = ['potato', 'bog', 'cactus'];
        this.defaultPlant = 'potato';
    }

    getPlantInfo(type) {
        const tempPlant = this.createPlant(type);
        return {
            emoji: tempPlant.emoji,
            likes: tempPlant.likes,
            type: tempPlant.type
        };
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
                return new PotatoPlant();
        }
    }

    isValidPlantType(type) {
        return this.plantTypes.includes(type);
    }

    getAvailablePlants() {
        return this.plantTypes.map(type => this.getPlantInfo(type));
    }
}