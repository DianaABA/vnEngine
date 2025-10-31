/**
 * vnEngine Advanced Game State Manager
 * Handles save/load, state management, progression tracking, and more
 * Ported from ChakraHearts with enhancements for all VN projects
 */

export interface GameState {
  currentEpisode: string;
  currentScene: string;
  currentLine: number;
  variables: Record<string, any>;
  flags: Set<string>;
  completedEpisodes: string[];
  unlockedEpisodes: string[];
  characterRelationships: Record<string, number>;
  playTime: number;
  lastPlayTime: number;
  preferences: GamePreferences;
  history?: string[];
  codexUnlocked?: string[];
  galleryUnlocked?: string[];
  badgesUnlocked?: string[];
  // Extended fields for various VN needs
  inventory?: Record<string, number>;
  achievements?: string[];
  stats?: Record<string, number>;
}

export interface GamePreferences {
  autoSaveEnabled: boolean;
  autoSaveInterval: number; // minutes
  skipSeenText: boolean;
  showSkipIndicator: boolean;
  quickMenuEnabled: boolean;
  rollbackEnabled: boolean;
  maxRollbackSteps: number;
  textSpeed: number;
  autoAdvanceEnabled: boolean;
  autoAdvanceDelay: number;
  // Accessibility & presentation
  textScale?: number; // 90-130 (%)
  highContrast?: boolean;
  dyslexicFont?: boolean;
  speakerFocus?: boolean;
}

export interface SaveData {
  id: number;
  type: 'manual' | 'auto' | 'quick';
  gameState: GameState;
  screenshot?: string;
  timestamp: string;
  episodeTitle: string;
  sceneTitle: string;
  isQuickSave?: boolean;
  isAutoSave?: boolean;
  projectName?: string;
}

export interface EpisodeMetadata {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  unlockConditions?: string[];
}

export class GameStateManager {
  private static instances: Map<string, GameStateManager> = new Map();
  private gameState: GameState;
  private rollbackHistory: GameState[] = [];
  // Use a cross-environment-safe timer type that works in Node and browsers
  private autoSaveTimer: ReturnType<typeof setInterval> | null = null;
  private static readonly MAX_MANUAL_SLOTS = 24;
  // Reserve 991-993 for quick saves
  private static readonly QUICK_SLOT_BASE = 991;
  private static readonly QUICK_SLOT_COUNT = 3;
  private projectName: string;
  private episodeRegistry: EpisodeMetadata[] = [];

  private constructor(projectName: string = 'vnengine-project') {
    this.projectName = projectName;
    this.gameState = this.getDefaultState();
    this.loadPreferences();
    this.setupAutoSave();
  }

  // Singleton pattern per project
  static getInstance(projectName: string = 'vnengine-project'): GameStateManager {
    if (!GameStateManager.instances.has(projectName)) {
      GameStateManager.instances.set(projectName, new GameStateManager(projectName));
    }
    return GameStateManager.instances.get(projectName)!;
  }

  // Register episodes for this project
  public registerEpisodes(episodes: EpisodeMetadata[]): void {
    this.episodeRegistry = episodes;
  }

  private getDefaultState(): GameState {
    return {
      currentEpisode: '',
      currentScene: '',
      currentLine: 0,
      variables: {},
      flags: new Set(),
      completedEpisodes: [],
      unlockedEpisodes: [],
      characterRelationships: {},
      playTime: 0,
      lastPlayTime: Date.now(),
      preferences: {
        autoSaveEnabled: true,
        autoSaveInterval: 5, // 5 minutes
        skipSeenText: false,
        showSkipIndicator: true,
        quickMenuEnabled: true,
        rollbackEnabled: true,
        maxRollbackSteps: 50,
        textSpeed: 1.0,
        autoAdvanceEnabled: false,
        autoAdvanceDelay: 3000,
        textScale: 100,
        highContrast: false,
        dyslexicFont: false,
        speakerFocus: true
      },
      history: [],
      codexUnlocked: [],
      galleryUnlocked: [],
      badgesUnlocked: [],
      inventory: {},
      achievements: [],
      stats: {}
    };
  }

  // State Management
  getCurrentState(): GameState {
    return { ...this.gameState };
  }

  updateState(updates: Partial<GameState>): void {
    // Add to rollback history before updating
    this.addToRollbackHistory();
    
    this.gameState = {
      ...this.gameState,
      ...updates,
      lastPlayTime: Date.now()
    };
    
    this.updatePlayTime();
  }

  // Variable Management
  setVariable(path: string, value: any): void {
    const keys = path.split('.');
    let current = this.gameState.variables;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
  }

  getVariable(path: string, defaultValue: any = null): any {
    const keys = path.split('.');
    let current = this.gameState.variables;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    }
    
    return current;
  }

  // Flag Management
  setFlag(id: string, value: boolean = true): void {
    if (value) {
      this.gameState.flags.add(id);
    } else {
      this.gameState.flags.delete(id);
    }
  }

  getFlag(id: string): boolean {
    return this.gameState.flags.has(id);
  }

  // Relationship Management
  adjustRelationship(characterId: string, delta: number): void {
    const current = this.gameState.characterRelationships[characterId] || 0;
    this.gameState.characterRelationships[characterId] = Math.max(0, Math.min(100, current + delta));
  }

  getRelationship(characterId: string): number {
    return this.gameState.characterRelationships[characterId] || 0;
  }

  // Stat Management
  setStat(statId: string, value: number): void {
    if (!this.gameState.stats) this.gameState.stats = {};
    this.gameState.stats[statId] = value;
  }

  adjustStat(statId: string, delta: number): void {
    if (!this.gameState.stats) this.gameState.stats = {};
    const current = this.gameState.stats[statId] || 0;
    this.gameState.stats[statId] = current + delta;
  }

  getStat(statId: string): number {
    return this.gameState.stats?.[statId] || 0;
  }

  // Inventory Management
  addItem(itemId: string, quantity: number = 1): void {
    if (!this.gameState.inventory) this.gameState.inventory = {};
    const current = this.gameState.inventory[itemId] || 0;
    this.gameState.inventory[itemId] = current + quantity;
  }

  removeItem(itemId: string, quantity: number = 1): boolean {
    if (!this.gameState.inventory) this.gameState.inventory = {};
    const current = this.gameState.inventory[itemId] || 0;
    if (current >= quantity) {
      this.gameState.inventory[itemId] = current - quantity;
      if (this.gameState.inventory[itemId] <= 0) {
        delete this.gameState.inventory[itemId];
      }
      return true;
    }
    return false;
  }

  hasItem(itemId: string, quantity: number = 1): boolean {
    return (this.gameState.inventory?.[itemId] || 0) >= quantity;
  }

  // Progression System
  unlockCodex(id: string): void {
    if (!this.gameState.codexUnlocked) this.gameState.codexUnlocked = [];
    if (!this.gameState.codexUnlocked.includes(id)) {
      this.gameState.codexUnlocked.push(id);
    }
  }

  isCodexUnlocked(id: string): boolean {
    return (this.gameState.codexUnlocked || []).includes(id);
  }

  unlockGallery(id: string): void {
    if (!this.gameState.galleryUnlocked) this.gameState.galleryUnlocked = [];
    if (!this.gameState.galleryUnlocked.includes(id)) {
      this.gameState.galleryUnlocked.push(id);
    }
  }

  isGalleryUnlocked(id: string): boolean {
    return (this.gameState.galleryUnlocked || []).includes(id);
  }

  unlockBadge(id: string): void {
    if (!this.gameState.badgesUnlocked) this.gameState.badgesUnlocked = [];
    if (!this.gameState.badgesUnlocked.includes(id)) {
      this.gameState.badgesUnlocked.push(id);
    }
  }

  isBadgeUnlocked(id: string): boolean {
    return (this.gameState.badgesUnlocked || []).includes(id);
  }

  unlockAchievement(id: string): void {
    if (!this.gameState.achievements) this.gameState.achievements = [];
    if (!this.gameState.achievements.includes(id)) {
      this.gameState.achievements.push(id);
    }
  }

  isAchievementUnlocked(id: string): boolean {
    return (this.gameState.achievements || []).includes(id);
  }

  // Episode Management
  canNavigateToEpisode(episodeId: string): boolean {
    return this.gameState.unlockedEpisodes.includes(episodeId);
  }

  unlockEpisode(episodeId: string): void {
    if (!this.gameState.unlockedEpisodes.includes(episodeId)) {
      this.gameState.unlockedEpisodes.push(episodeId);
      this.saveToLocalStorage('gameState', this.gameState);
    }
  }

  completeEpisode(episodeId: string): void {
    if (!this.gameState.completedEpisodes.includes(episodeId)) {
      this.gameState.completedEpisodes.push(episodeId);
      this.unlockNextEpisode(episodeId);
      this.saveToLocalStorage('gameState', this.gameState);
    }
  }

  private unlockNextEpisode(completedEpisodeId: string): void {
    const currentIndex = this.episodeRegistry.findIndex(ep => ep.id === completedEpisodeId);
    if (currentIndex >= 0 && currentIndex < this.episodeRegistry.length - 1) {
      const nextEpisode = this.episodeRegistry[currentIndex + 1];
      this.unlockEpisode(nextEpisode.id);
    }
  }

  // Save System
  saveGame(slotId: number, type: 'manual' | 'auto' | 'quick' = 'manual'): SaveData {
    const serializableState: any = {
      ...this.gameState,
      flags: Array.from(this.gameState.flags) // Convert Set to Array for storage
    };

    const saveData: SaveData = {
      id: slotId,
      type,
      gameState: serializableState,
      timestamp: new Date().toISOString(),
      episodeTitle: this.getEpisodeTitle(this.gameState.currentEpisode),
      sceneTitle: this.formatSceneTitle(this.gameState.currentScene, this.gameState.currentLine),
      isQuickSave: type === 'quick',
      isAutoSave: type === 'auto',
      projectName: this.projectName
    };

    this.saveToLocalStorage(`save_${slotId}`, saveData);
    
    if (type === 'quick') {
      // Also store named quick slots if within range
      const idx = slotId - GameStateManager.QUICK_SLOT_BASE + 1;
      if (idx >= 1 && idx <= GameStateManager.QUICK_SLOT_COUNT) {
        this.saveToLocalStorage(`quickSave${idx}`, saveData);
      }
    }
    
    if (type === 'auto') {
      this.saveToLocalStorage('autoSave', saveData);
    }

    return saveData;
  }

  loadGame(slotId: number): boolean {
    const saveData = this.loadFromLocalStorage(`save_${slotId}`);
    if (saveData && saveData.gameState) {
      const gs = saveData.gameState;
      this.gameState = {
        ...gs,
        flags: new Set(gs.flags || []), // Convert Array back to Set
      };
      this.rollbackHistory = []; // Clear rollback on load
      return true;
    }
    return false;
  }

  // Quick save slots (1-3) map to IDs 991-993
  quickSave(slot: 1 | 2 | 3 = 1): SaveData {
    const slotId = GameStateManager.QUICK_SLOT_BASE + (slot - 1);
    return this.saveGame(slotId, 'quick');
  }

  quickLoad(slot: 1 | 2 | 3 = 1): boolean {
    const slotId = GameStateManager.QUICK_SLOT_BASE + (slot - 1);
    const quickSave = this.loadFromLocalStorage(`save_${slotId}`) || this.loadFromLocalStorage(`quickSave${slot}`);
    if (quickSave && quickSave.gameState) {
      const gs = quickSave.gameState;
      this.gameState = {
        ...gs,
        flags: new Set(gs.flags || [])
      };
      this.rollbackHistory = [];
      return true;
    }
    return false;
  }

  // Auto Save
  private setupAutoSave(): void {
    if (this.gameState.preferences.autoSaveEnabled) {
      const interval = this.gameState.preferences.autoSaveInterval * 60 * 1000;
      this.autoSaveTimer = setInterval(() => {
        this.autoSave();
      }, interval);
    }
  }

  private autoSave(): void {
    if (this.gameState.preferences.autoSaveEnabled) {
      this.saveGame(998, 'auto');
    }
  }

  toggleAutoSave(enabled: boolean): void {
    this.gameState.preferences.autoSaveEnabled = enabled;
    
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
    
    if (enabled) {
      this.setupAutoSave();
    }
    
    this.savePreferences();
  }

  // Rollback System
  private addToRollbackHistory(): void {
    if (this.gameState.preferences.rollbackEnabled) {
      this.rollbackHistory.push({ ...this.gameState });
      
      // Limit history size
      if (this.rollbackHistory.length > this.gameState.preferences.maxRollbackSteps) {
        this.rollbackHistory.shift();
      }
    }
  }

  rollback(): boolean {
    if (this.rollbackHistory.length > 0 && this.gameState.preferences.rollbackEnabled) {
      this.gameState = this.rollbackHistory.pop()!;
      return true;
    }
    return false;
  }

  canRollback(): boolean {
    return this.rollbackHistory.length > 0 && this.gameState.preferences.rollbackEnabled;
  }

  // Time Management
  private updatePlayTime(): void {
    const now = Date.now();
    const sessionTime = now - this.gameState.lastPlayTime;
    this.gameState.playTime += sessionTime;
    this.gameState.lastPlayTime = now;
  }

  getFormattedPlayTime(): string {
    const hours = Math.floor(this.gameState.playTime / (1000 * 60 * 60));
    const minutes = Math.floor((this.gameState.playTime % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  // History Management
  addHistoryLine(text: string): void {
    if (!this.gameState.history) this.gameState.history = [];
    this.gameState.history.push(text);
    if (this.gameState.history.length > 200) this.gameState.history.shift();
  }

  getHistory(): string[] {
    return [...(this.gameState.history || [])];
  }

  clearHistory(): void {
    this.gameState.history = [];
  }

  // Utility Methods
  private getEpisodeTitle(episodeId: string): string {
    const episode = this.episodeRegistry.find(ep => ep.id === episodeId);
    return episode?.title || 'Unknown Episode';
  }

  // Storage Methods (with project namespacing)
  private saveToLocalStorage(key: string, data: any): void {
    try {
      localStorage.setItem(`${this.projectName}_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  private loadFromLocalStorage(key: string): any {
    try {
      const data = localStorage.getItem(`${this.projectName}_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  }

  private loadPreferences(): void {
    const saved = this.loadFromLocalStorage('preferences');
    if (saved) {
      this.gameState.preferences = { ...this.gameState.preferences, ...saved };
    }
  }

  private savePreferences(): void {
    this.saveToLocalStorage('preferences', this.gameState.preferences);
  }

  // Get all saves
  getAllSaves(): SaveData[] {
    const saves: SaveData[] = [];
    
    // Check regular save slots
    for (let i = 1; i <= GameStateManager.MAX_MANUAL_SLOTS; i++) {
      const save = this.loadFromLocalStorage(`save_${i}`);
      if (save) {
        saves.push(save);
      }
    }
    
    // Add quick saves (1-3)
    for (let q = 1; q <= GameStateManager.QUICK_SLOT_COUNT; q++) {
      const slotId = GameStateManager.QUICK_SLOT_BASE + (q - 1);
      const quickSave = this.loadFromLocalStorage(`save_${slotId}`) || this.loadFromLocalStorage(`quickSave${q}`);
      if (quickSave) saves.push(quickSave);
    }
    
    // Add auto save
    const autoSave = this.loadFromLocalStorage('autoSave');
    if (autoSave) {
      saves.push(autoSave);
    }
    
    return saves.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  // Clear all data (for new game)
  clearAllData(): void {
    this.gameState = this.getDefaultState();
    this.rollbackHistory = [];
    
    // Clear saves but keep preferences
    for (let i = 1; i <= GameStateManager.MAX_MANUAL_SLOTS; i++) {
      localStorage.removeItem(`${this.projectName}_save_${i}`);
    }
    for (let q = 1; q <= GameStateManager.QUICK_SLOT_COUNT; q++) {
      const slotId = GameStateManager.QUICK_SLOT_BASE + (q - 1);
      localStorage.removeItem(`${this.projectName}_save_${slotId}`);
      localStorage.removeItem(`${this.projectName}_quickSave${q}`);
    }
    localStorage.removeItem(`${this.projectName}_autoSave`);
    localStorage.removeItem(`${this.projectName}_gameState`);
  }

  getMaxManualSlots(): number {
    return GameStateManager.MAX_MANUAL_SLOTS;
  }

  // Project Management
  getProjectName(): string {
    return this.projectName;
  }

  // Helpers
  private formatSceneTitle(scene: string, line: number): string {
    if (!scene) return '';
    const ln = Number.isFinite(line) && line >= 0 ? ` (line ${line})` : '';
    return `${scene}${ln}`;
  }
}