// Garden Horizons Calculator - Official Formula Implementation
// Formula: sellPrice = basePrice × ripenessMultiplier × (mutation1 × mutation2 × ...) × (weight/baseWeight)²

// State Management
let state = {
    selectedPlant: null,
    selectedStage: 'ripened',
    selectedMutations: [],
    customWeight: null,
    currentFilter: 'all',
    currentPlantFilter: 'all'
};

// Initialize Calculator
document.addEventListener('DOMContentLoaded', () => {
    initializePlantFilter();
    initializePlantList();
    initializeStageButtons();
    initializeMutationList();
    initializeWeightInput();
    initializeClearButton();
    initializeFilterButtons();
});

// Plant Filter
function initializePlantFilter() {
    const filterButtons = document.querySelectorAll('.plant-filter .filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentPlantFilter = btn.dataset.filter;
            renderPlantList();
        });
    });
}

// Plant List
function initializePlantList() {
    renderPlantList();
}

function renderPlantList() {
    const container = document.getElementById('plantList');
    container.innerHTML = '';
    
    const filteredPlants = PLANTS.filter(p => {
        if (state.currentPlantFilter === 'all') return true;
        return p.rarity === state.currentPlantFilter;
    });
    
    filteredPlants.forEach(plant => {
        const item = document.createElement('div');
        item.className = 'plant-item';
        item.dataset.plantId = plant.id;
        
        const isSelected = state.selectedPlant && state.selectedPlant.id === plant.id;
        if (isSelected) item.classList.add('selected');
        
        item.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" class="plant-item-image" onerror="this.src='/calculator/images/plants/Placeholder.webp'">
            <div class="plant-item-info">
                <span class="plant-item-name">${plant.emoji} ${plant.name}</span>
                <span class="plant-item-rarity">${plant.rarity}</span>
            </div>
        `;
        
        item.addEventListener('click', () => selectPlant(plant.id));
        container.appendChild(item);
    });
}

function selectPlant(plantId) {
    state.selectedPlant = PLANTS.find(p => p.id === plantId);
    renderPlantList();
    updatePlantInfo();
    calculate();
}

// Plant Selection (old function - now replaced by selectPlant)
function initializePlantSelect() {
    // This function is no longer needed
}

function updatePlantInfo() {
    const info = document.getElementById('plantInfo');
    const plant = state.selectedPlant;
    
    if (plant) {
        // Update plant image
        const plantImage = document.getElementById('plantImage');
        plantImage.src = plant.image;
        plantImage.alt = plant.name;
        plantImage.onerror = function() {
            this.src = '/calculator/images/plants/Placeholder.webp';
        };
        
        document.getElementById('plantCost').textContent = `${plant.cost.toLocaleString()} coins`;
        document.getElementById('plantBase').textContent = `${plant.basePrice.toLocaleString()} coins`;
        document.getElementById('plantWeight').textContent = `${plant.baseWeight} kg`;
        info.style.display = 'block';
    }
}

function hidePlantInfo() {
    document.getElementById('plantInfo').style.display = 'none';
}

// Stage Selection
function initializeStageButtons() {
    const buttons = document.querySelectorAll('.stage-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedStage = btn.dataset.stage;
            calculate();
        });
    });
}

// Mutation Filter
function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentFilter = btn.dataset.filter;
            renderMutationList();
        });
    });
}

// Mutation List
function initializeMutationList() {
    renderMutationList();
}

function renderMutationList() {
    const container = document.getElementById('mutationList');
    container.innerHTML = '';
    
    const filteredMutations = MUTATIONS.filter(m => {
        if (state.currentFilter === 'all') return true;
        return m.category === state.currentFilter;
    });
    
    filteredMutations.forEach(mutation => {
        const item = document.createElement('div');
        item.className = 'mutation-item';
        item.dataset.mutationId = mutation.id;
        
        const isSelected = state.selectedMutations.includes(mutation.id);
        const isDisabled = isMutationDisabled(mutation);
        
        if (isSelected) item.classList.add('selected');
        if (isDisabled) item.classList.add('disabled');
        
        item.innerHTML = `
            <span class="mutation-emoji">${mutation.emoji}</span>
            <div class="mutation-info">
                <span class="mutation-name">${mutation.name}</span>
                <span class="mutation-mult">×${mutation.multiplier.toFixed(1)}</span>
            </div>
        `;
        
        if (!isDisabled) {
            item.addEventListener('click', () => toggleMutation(mutation.id));
        }
        
        container.appendChild(item);
    });
    
    updateMutationCount();
}

function isMutationDisabled(mutation) {
    // Check if any selected mutation is incompatible
    for (const selectedId of state.selectedMutations) {
        const selectedMutation = MUTATIONS.find(m => m.id === selectedId);
        if (selectedMutation.incompatible.includes(mutation.id)) {
            return true;
        }
    }
    return false;
}

function toggleMutation(mutationId) {
    const index = state.selectedMutations.indexOf(mutationId);
    
    if (index > -1) {
        // Remove mutation
        state.selectedMutations.splice(index, 1);
    } else {
        // Add mutation
        state.selectedMutations.push(mutationId);
    }
    
    renderMutationList();
    calculate();
}

function updateMutationCount() {
    const count = state.selectedMutations.length;
    document.querySelector('.mutation-count').textContent = `(${count} selected)`;
}

// Weight Input
function initializeWeightInput() {
    const input = document.getElementById('weightInput');
    
    input.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        state.customWeight = value > 0 ? value : null;
        calculate();
    });
}

// Clear Button
function initializeClearButton() {
    document.getElementById('clearBtn').addEventListener('click', () => {
        // Reset state
        state.selectedPlant = null;
        state.selectedStage = 'ripened';
        state.selectedMutations = [];
        state.customWeight = null;
        state.currentFilter = 'all';
        state.currentPlantFilter = 'all';
        
        // Reset UI
        document.getElementById('weightInput').value = '';
        document.querySelectorAll('.stage-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.stage === 'ripened') btn.classList.add('active');
        });
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === 'all') btn.classList.add('active');
        });
        document.querySelectorAll('.plant-filter .filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === 'all') btn.classList.add('active');
        });
        
        hidePlantInfo();
        hideResults();
        renderPlantList();
        renderMutationList();
    });
}

// Main Calculation Function
function calculate() {
    if (!state.selectedPlant) {
        hideResults();
        return;
    }
    
    const plant = state.selectedPlant;
    const ripenessMultiplier = RIPENESS[state.selectedStage].multiplier;
    const mutationMultiplier = calculateMutationMultiplier();
    const weight = state.customWeight || plant.baseWeight;
    const weightFactor = Math.pow(weight / plant.baseWeight, 2);
    
    // Official Formula
    const sellPrice = Math.round(plant.basePrice * ripenessMultiplier * mutationMultiplier * weightFactor);
    const profit = sellPrice - plant.cost;
    const roi = plant.cost > 0 ? (profit / plant.cost) * 100 : 0;
    const profitPerHour = profit * (3600 / plant.growTime);
    
    // Grade calculation
    let grade = 'C';
    if (roi >= 100) grade = 'A';
    else if (roi >= 50) grade = 'B';
    
    // Display results
    displayResults({
        sellPrice,
        profit,
        roi,
        profitPerHour,
        grade,
        ripenessMultiplier,
        mutationMultiplier,
        weightFactor
    });
}

function calculateMutationMultiplier() {
    if (state.selectedMutations.length === 0) return 1;
    
    // Multiplicative stacking (official formula)
    let multiplier = 1;
    state.selectedMutations.forEach(mutationId => {
        const mutation = MUTATIONS.find(m => m.id === mutationId);
        if (mutation && mutation.multiplier > 0) {
            multiplier *= mutation.multiplier;
        }
    });
    
    return multiplier;
}

// Display Results
function displayResults(result) {
    document.getElementById('resultContent').style.display = 'none';
    document.getElementById('resultDetails').style.display = 'block';
    
    // Main result
    const gradeEl = document.getElementById('resultGrade');
    gradeEl.textContent = result.grade;
    gradeEl.className = 'result-grade';
    if (result.grade === 'B') gradeEl.classList.add('grade-b');
    if (result.grade === 'C') gradeEl.classList.add('grade-c');
    
    document.getElementById('resultSellPrice').textContent = `${result.sellPrice.toLocaleString()} coins`;
    
    // Metrics
    document.getElementById('resultProfit').textContent = `${result.profit.toLocaleString()} coins`;
    document.getElementById('resultROI').textContent = `${result.roi.toFixed(1)}%`;
    document.getElementById('resultProfitHour').textContent = `${Math.round(result.profitPerHour).toLocaleString()} coins/h`;
    
    // Formula breakdown
    displayFormulaBreakdown(result);
    
    // Recommendations
    displayRecommendations(result);
}

function displayFormulaBreakdown(result) {
    const container = document.getElementById('formulaSteps');
    const plant = state.selectedPlant;
    const weight = state.customWeight || plant.baseWeight;
    
    const steps = [
        { label: 'Base Price', value: `${plant.basePrice.toLocaleString()} coins` },
        { label: `Ripeness (${RIPENESS[state.selectedStage].name})`, value: `×${result.ripenessMultiplier.toFixed(1)}` },
        { label: 'Mutations', value: `×${result.mutationMultiplier.toFixed(2)}` },
        { label: 'Weight Factor', value: `×${result.weightFactor.toFixed(2)}` },
        { label: 'Final Sell Price', value: `${result.sellPrice.toLocaleString()} coins` }
    ];
    
    container.innerHTML = steps.map(step => `
        <div class="formula-step">
            <span class="formula-step-label">${step.label}</span>
            <span class="formula-step-value">${step.value}</span>
        </div>
    `).join('');
}

function displayRecommendations(result) {
    const container = document.getElementById('recommendations');
    const recommendations = [];
    
    // Stage recommendation
    if (state.selectedStage !== 'lush') {
        const lushMultiplier = RIPENESS.lush.multiplier;
        const currentMultiplier = result.ripenessMultiplier;
        const improvement = ((lushMultiplier / currentMultiplier - 1) * 100).toFixed(0);
        recommendations.push({
            icon: '🌳',
            text: `Wait for Lush stage to increase profit by ${improvement}%`
        });
    }
    
    // Mutation recommendation
    if (state.selectedMutations.length === 0) {
        recommendations.push({
            icon: '⚡',
            text: 'Add mutations to multiply your profit! Weather events create mutations.'
        });
    }
    
    // ROI recommendation
    if (result.roi < 50) {
        recommendations.push({
            icon: '💡',
            text: 'Low ROI. Consider switching to higher-value crops or waiting for better mutations.'
        });
    } else if (result.roi >= 100) {
        recommendations.push({
            icon: '🎉',
            text: 'Excellent ROI! This is a highly profitable setup.'
        });
    }
    
    // Weight recommendation
    if (!state.customWeight) {
        recommendations.push({
            icon: '⚖️',
            text: 'Try adjusting weight to see how it affects profit. Heavier crops sell for more!'
        });
    }
    
    if (recommendations.length > 0) {
        container.innerHTML = `
            <h4>💡 Recommendations</h4>
            ${recommendations.map(rec => `
                <div class="recommendation-item">
                    <span class="recommendation-icon">${rec.icon}</span>
                    <span class="recommendation-text">${rec.text}</span>
                </div>
            `).join('')}
        `;
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

function hideResults() {
    document.getElementById('resultContent').style.display = 'block';
    document.getElementById('resultDetails').style.display = 'none';
}
