// Garden Horizons Official Data
// Source: https://garden-horizons.fandom.com/wiki/

// All 26 Plants (Official Wiki Data)
const PLANTS = [
    { id: 'carrot', name: 'Carrot', emoji: '🥕', cost: 20, basePrice: 30, baseWeight: 0.07, growTime: 60, rarity: 'Common', source: 'Seed Shop', image: '/calculator/images/plants/carrot.webp' },
    { id: 'corn', name: 'Corn', emoji: '🌽', cost: 100, basePrice: 15, baseWeight: 0.18, growTime: 120, rarity: 'Common', source: 'Seed Shop', image: '/calculator/images/plants/corn.webp' },
    { id: 'dandelion', name: 'Dandelion', emoji: '🌼', cost: 0, basePrice: 45, baseWeight: 0.03, growTime: 90, rarity: 'Common', source: 'Gardener Pack', image: '/calculator/images/plants/dandelion.webp' },
    { id: 'sunpetal', name: 'Sunpetal', emoji: '🌻', cost: 0, basePrice: 60, baseWeight: 0.04, growTime: 100, rarity: 'Common', source: 'Dawn Pack', image: '/calculator/images/plants/sunpetal.webp' },
    { id: 'onion', name: 'Onion', emoji: '🧅', cost: 200, basePrice: 220, baseWeight: 0.13, growTime: 180, rarity: 'Uncommon', source: 'Seed Shop', image: '/calculator/images/plants/onion.webp' },
    { id: 'strawberry', name: 'Strawberry', emoji: '🍓', cost: 800, basePrice: 32, baseWeight: 0.02, growTime: 150, rarity: 'Uncommon', source: 'Seed Shop', image: '/calculator/images/plants/strawberry.webp' },
    { id: 'mushroom', name: 'Mushroom', emoji: '🍄', cost: 1500, basePrice: 40, baseWeight: 0.03, growTime: 200, rarity: 'Uncommon', source: 'Seed Shop', image: '/calculator/images/plants/mushroom.webp' },
    { id: 'bellpepper', name: 'Bell Pepper', emoji: '🫑', cost: 0, basePrice: 50, baseWeight: 0.14, growTime: 160, rarity: 'Uncommon', source: 'Gardener Pack', image: '/calculator/images/plants/bellpepper.webp' },
    { id: 'goldenberry', name: 'Goldenberry', emoji: '🫐', cost: 0, basePrice: 55, baseWeight: 0.02, growTime: 140, rarity: 'Uncommon', source: 'Dawn Pack', image: '/calculator/images/plants/goldenberry.webp' },
    { id: 'beetroot', name: 'Beetroot', emoji: '🥬', cost: 2500, basePrice: 3750, baseWeight: 0.09, growTime: 300, rarity: 'Rare', source: 'Seed Shop', image: '/calculator/images/plants/beetroot.webp' },
    { id: 'tomato', name: 'Tomato', emoji: '🍅', cost: 4000, basePrice: 60, baseWeight: 0.15, growTime: 250, rarity: 'Rare', source: 'Seed Shop', image: '/calculator/images/plants/tomato.webp' },
    { id: 'apple', name: 'Apple', emoji: '🍎', cost: 7000, basePrice: 270, baseWeight: 0.17, growTime: 400, rarity: 'Rare', source: 'Seed Shop', image: '/calculator/images/plants/apple.webp' },
    { id: 'rose', name: 'Rose', emoji: '🌹', cost: 10000, basePrice: 320, baseWeight: 0.04, growTime: 350, rarity: 'Rare', source: 'Seed Shop', image: '/calculator/images/plants/rose.webp' },
    { id: 'amberpine', name: 'Amberpine', emoji: '🌲', cost: 0, basePrice: 400, baseWeight: 0.08, growTime: 380, rarity: 'Rare', source: 'Dawn Pack', image: '/calculator/images/plants/amberpine.webp' },
    { id: 'birch', name: 'Birch', emoji: '🌳', cost: 0, basePrice: 500, baseWeight: 0.06, growTime: 420, rarity: 'Rare', source: 'Gardener Pack', image: '/calculator/images/plants/birch.webp' },
    { id: 'wheat', name: 'Wheat', emoji: '🌾', cost: 12000, basePrice: 7200, baseWeight: 0.03, growTime: 600, rarity: 'Epic', source: 'Seed Shop', image: '/calculator/images/plants/wheat.webp' },
    { id: 'banana', name: 'Banana', emoji: '🍌', cost: 30000, basePrice: 750, baseWeight: 0.15, growTime: 500, rarity: 'Epic', source: 'Seed Shop', image: '/calculator/images/plants/banana.webp' },
    { id: 'plum', name: 'Plum', emoji: '🍑', cost: 60000, basePrice: 1000, baseWeight: 0.07, growTime: 700, rarity: 'Epic', source: 'Seed Shop', image: '/calculator/images/plants/plum.webp' },
    { id: 'potato', name: 'Potato', emoji: '🥔', cost: 100000, basePrice: 1500, baseWeight: 0.17, growTime: 800, rarity: 'Epic', source: 'Seed Shop', image: '/calculator/images/plants/potato.webp' },
    { id: 'orange', name: 'Orange', emoji: '🍊', cost: 0, basePrice: 1000, baseWeight: 0.21, growTime: 650, rarity: 'Epic', source: 'Gardener Pack', image: '/calculator/images/plants/orange.webp' },
    { id: 'emberwood', name: 'Emberwood', emoji: '🔥', cost: 0, basePrice: 2200, baseWeight: 0.15, growTime: 750, rarity: 'Epic', source: 'Dawn Pack', image: '/calculator/images/plants/emberwood.webp' },
    { id: 'cabbage', name: 'Cabbage', emoji: '🥬', cost: 150000, basePrice: 60000, baseWeight: 1.1, growTime: 1200, rarity: 'Legendary', source: 'Seed Shop', image: '/calculator/images/plants/cabbage.webp' },
    { id: 'cherry', name: 'Cherry', emoji: '🍒', cost: 1000000, basePrice: 8000, baseWeight: 0.01, growTime: 1500, rarity: 'Legendary', source: 'Seed Shop', image: '/calculator/images/plants/cherry.webp' },
    { id: 'olive', name: 'Olive', emoji: '🫒', cost: 0, basePrice: 10000, baseWeight: 0.06, growTime: 900, rarity: 'Legendary', source: 'Gardener Pack', image: '/calculator/images/plants/olive.webp' },
    { id: 'dawnfruit', name: 'Dawn Fruit', emoji: '🌅', cost: 0, basePrice: 600, baseWeight: 0.06, growTime: 450, rarity: 'Special', source: 'Codes', image: '/calculator/images/plants/dawnfruit.webp' },
    { id: 'dawnblossom', name: 'Dawn Blossom', emoji: '🌸', cost: 0, basePrice: 12000, baseWeight: 0.12, growTime: 1000, rarity: 'Special', source: 'Dawn Pack', image: '/calculator/images/plants/dawnblossom.webp' }
];

// All 16 Mutations (Official Wiki Data)
const MUTATIONS = [
    // Weather Mutations
    { id: 'foggy', name: 'Foggy', emoji: '🌫️', multiplier: 1.25, category: 'weather', trigger: 'Fog event', incompatible: [] },
    { id: 'soaked', name: 'Soaked', emoji: '💧', multiplier: 1.2, category: 'weather', trigger: 'Rain event', incompatible: ['flooded'] },
    { id: 'flooded', name: 'Flooded', emoji: '🌊', multiplier: 1.75, category: 'weather', trigger: 'Rain event', incompatible: ['soaked'] },
    { id: 'chilled', name: 'Chilled', emoji: '❄️', multiplier: 1.5, category: 'weather', trigger: 'Snowstorm', incompatible: ['snowy'] },
    { id: 'snowy', name: 'Snowy', emoji: '⛄', multiplier: 2.0, category: 'weather', trigger: 'Snowstorm', incompatible: ['chilled'] },
    { id: 'sandy', name: 'Sandy', emoji: '🏜️', multiplier: 2.5, category: 'weather', trigger: 'Sandstorm', incompatible: [] },
    { id: 'shocked', name: 'Shocked', emoji: '⚡', multiplier: 4.5, category: 'weather', trigger: 'Storm event', incompatible: [] },
    { id: 'starstruck', name: 'Starstruck', emoji: '⭐', multiplier: 6.5, category: 'weather', trigger: 'Starfall event', incompatible: [] },
    
    // Combo Mutations
    { id: 'mossy', name: 'Mossy', emoji: '🌿', multiplier: 3.5, category: 'combo', trigger: 'Foggy + Chilled', requires: ['foggy', 'chilled'], incompatible: [] },
    { id: 'muddy', name: 'Muddy', emoji: '🟫', multiplier: 5.0, category: 'combo', trigger: 'Sandy + (Flooded or Soaked)', requires: ['sandy'], requiresOneOf: ['flooded', 'soaked'], incompatible: [] },
    { id: 'frostbit', name: 'Frostbit', emoji: '🧊', multiplier: 3.5, category: 'combo', trigger: 'Soaked + Snowy', requires: ['soaked', 'snowy'], incompatible: [] },
    
    // Limited Mutations (Admin/Event)
    { id: 'meteoric', name: 'Meteoric', emoji: '☄️', multiplier: 10.0, category: 'limited', trigger: 'Meteor Shower', incompatible: [] },
    { id: 'galactic', name: 'Galactic', emoji: '🌌', multiplier: 5.0, category: 'limited', trigger: 'Black Hole event', incompatible: [] },
    { id: 'nova', name: 'Nova', emoji: '💫', multiplier: 6.5, category: 'limited', trigger: 'Black Hole event', incompatible: [] },
    { id: 'tidal', name: 'Tidal', emoji: '🌊', multiplier: 2.0, category: 'limited', trigger: 'Tsunami event', incompatible: [] },
    { id: 'electric', name: 'Electric', emoji: '⚡', multiplier: 0, category: 'limited', trigger: 'Unknown (Admin)', incompatible: [] }
];

// Ripeness Stages (Official Wiki Confirmed)
const RIPENESS = {
    unripe: { name: 'Unripe', emoji: '🌱', multiplier: 1.0 },
    ripened: { name: 'Ripened', emoji: '🌿', multiplier: 2.0 },
    lush: { name: 'Lush', emoji: '🌳', multiplier: 3.0 }
};
