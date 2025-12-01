function init() {
    // Инициализация игрового состояния
    game.grid = GridManager.createGrid();
    EventHandlers.setupEventListeners();
    Renderer.renderGrid();
    Renderer.updateToolButtons();
    Renderer.updateSeedButtons();
    console.log('Available plants:', game.plantManager.getAvailablePlants());
}
document.addEventListener('DOMContentLoaded', init);