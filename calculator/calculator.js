// Garden Horizons Calculator - Official Formula Implementation
// Formula: sellPrice = basePrice × ripenessMultiplier × (mutation1 × mutation2 × ...) × (weight/baseWeight)²

// State Management
let state = {
    selectedPlant: null,
    selectedVariant: 'none',
    selectedStage: 'ripened',
    selectedMutations: [],
    customWeight: null,
    currentPlantFilter: 'all'
};

// Initialize Calculator
document.addEventListener('DOMContentLoaded', () => {
    initializePlantList();
    initializeVariantButtons();
    initializeStageButtons();
    initializeMutationList();
    initializeWeightInput();
    initializeClearButton();
});

// Plant List
function initializePlantList() {
    renderPlantList();
}

function renderPlantList() {
    const container = document.getElementById('plantList');
    container.innerHTML = '';
    
    // Show all plants without filtering
    PLANTS.forEach(plant => {
        const item = document.createElement('div');
        item.className = 'plant-item';
        item.dataset.plantId = plant.id;
        
        const isSelected = state.selectedPlant && state.selectedPlant.id === plant.id;
        if (isSelected) item.classList.add('selected');
        
        item.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" class="plant-item-image" onerror="this.src='/calculator/images/plants/Placeholder.webp'">
            <div class="plant-item-info">
                <span class="plant-item-name">${plant.name}</span>
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
    updateWeightSlider();
    calculate();
}

// Plant Selection (old function - now replaced by selectPlant)
function initializePlantSelect() {
    // This function is no longer needed
}

function updatePlantInfo() {
    const info = document.getElementById('plantInfo');
    const plant = state.selectedPlant;
    
    if (!plant || !info) return;
    
    // Update plant image
    const plantImage = document.getElementById('plantImage');
    const plantBase = document.getElementById('plantBase');
    const plantWeight = document.getElementById('plantWeight');
    
    if (!plantImage || !plantBase || !plantWeight) {
        console.error('Plant info elements not found');
        return;
    }
    
    plantImage.src = plant.image;
    plantImage.alt = plant.name;
    plantImage.onerror = function() {
        this.src = '/calculator/images/plants/Placeholder.webp';
    };
    
    plantBase.textContent = `${plant.basePrice.toLocaleString()} Shillings`;
    plantWeight.textContent = `${plant.baseWeight} kg`;
    info.style.display = 'block';
}

function hidePlantInfo() {
    document.getElementById('plantInfo').style.display = 'none';
}

// Variant Selection
function initializeVariantButtons() {
    const buttons = document.querySelectorAll('[data-variant]');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedVariant = btn.dataset.variant;
            calculate();
        });
    });
}

// Stage Selection
function initializeStageButtons() {
    const buttons = document.querySelectorAll('[data-stage]');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedStage = btn.dataset.stage;
            calculate();
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
    
    // Check for incompatible mutations and prepare message
    const disabledMutations = [];
    
    // Show all mutations without filtering
    MUTATIONS.forEach(mutation => {
        const item = document.createElement('div');
        item.className = 'mutation-item';
        item.dataset.mutationId = mutation.id;
        
        const isSelected = state.selectedMutations.includes(mutation.id);
        const isDisabled = isMutationDisabled(mutation);
        
        if (isSelected) item.classList.add('selected');
        if (isDisabled) {
            item.classList.add('disabled');
            // Find which selected mutation is blocking this one
            for (const selectedId of state.selectedMutations) {
                const selectedMutation = MUTATIONS.find(m => m.id === selectedId);
                if (selectedMutation.incompatible.includes(mutation.id)) {
                    disabledMutations.push({
                        disabled: mutation.name,
                        blocker: selectedMutation.name
                    });
                    break;
                }
            }
        }
        
        item.innerHTML = `
            <span class="mutation-emoji">${mutation.emoji}</span>
            <span class="mutation-name">${mutation.name}</span>
            <span class="mutation-mult">×${mutation.multiplier.toFixed(1)}</span>
        `;
        
        if (!isDisabled) {
            item.addEventListener('click', () => toggleMutation(mutation.id));
        }
        
        container.appendChild(item);
    });
    
    // Show incompatibility message if any mutations are disabled
    showIncompatibilityMessage(disabledMutations);
    
    updateMutationCount();
}

function showIncompatibilityMessage(disabledMutations) {
    const messageEl = document.getElementById('mutationMessage');
    if (!messageEl) return;
    
    if (disabledMutations.length > 0) {
        const messages = disabledMutations.map(item => 
            `${item.disabled} cannot be selected with ${item.blocker}`
        );
        messageEl.textContent = `⚠️ ${messages.join(' • ')}`;
        messageEl.style.display = 'block';
    } else {
        messageEl.style.display = 'none';
    }
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
    const totalMultiplier = calculateMutationMultiplier();
    const displayMultiplier = totalMultiplier > 0 ? totalMultiplier : 1.0;
    document.querySelector('.mutation-count').textContent = `(${count} selected · ×${displayMultiplier.toFixed(1)})`;
}

// Weight Slider
function initializeWeightInput() {
    const slider = document.getElementById('weightSlider');
    const valueDisplay = document.getElementById('weightValue');
    const baseLabel = document.querySelector('.weight-base-label');
    
    slider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        valueDisplay.textContent = value.toFixed(2);
        
        // Update base label
        if (state.selectedPlant && Math.abs(value - state.selectedPlant.baseWeight) < 0.01) {
            baseLabel.textContent = '(base)';
        } else {
            baseLabel.textContent = '';
        }
        
        state.customWeight = value;
        calculate();
    });
}

function updateWeightSlider() {
    const slider = document.getElementById('weightSlider');
    const valueDisplay = document.getElementById('weightValue');
    const baseLabel = document.querySelector('.weight-base-label');
    
    if (state.selectedPlant) {
        const baseWeight = state.selectedPlant.baseWeight;
        slider.value = baseWeight;
        slider.max = Math.max(10, baseWeight * 3);
        valueDisplay.textContent = baseWeight.toFixed(2);
        baseLabel.textContent = '(base)';
        state.customWeight = baseWeight;
    }
}

// Clear Button
function initializeClearButton() {
    document.getElementById('clearBtn').addEventListener('click', () => {
        // Reset state
        state.selectedPlant = null;
        state.selectedVariant = 'none';
        state.selectedStage = 'ripened';
        state.selectedMutations = [];
        state.customWeight = null;
        
        // Reset UI
        const slider = document.getElementById('weightSlider');
        const valueDisplay = document.getElementById('weightValue');
        const baseLabel = document.querySelector('.weight-base-label');
        slider.value = 1;
        valueDisplay.textContent = '1.00';
        baseLabel.textContent = '(base)';
        
        document.querySelectorAll('[data-variant]').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.variant === 'none') btn.classList.add('active');
        });
        document.querySelectorAll('[data-stage]').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.stage === 'ripened') btn.classList.add('active');
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
    
    // Check if required data is loaded
    if (typeof VARIANTS === 'undefined' || typeof RIPENESS === 'undefined') {
        console.error('VARIANTS or RIPENESS not loaded');
        return;
    }
    
    const plant = state.selectedPlant;
    const variantMultiplier = VARIANTS[state.selectedVariant]?.multiplier || 1;
    const ripenessMultiplier = RIPENESS[state.selectedStage]?.multiplier || 1;
    const mutationMultiplier = calculateMutationMultiplier();
    const weight = state.customWeight || plant.baseWeight;
    const weightFactor = Math.pow(weight / plant.baseWeight, 2);
    
    // Official Formula: Base × Variant × Ripeness × Mutations × Weight
    // Note: If no mutations selected, mutationMultiplier is 0, so we treat it as 1
    const finalMutationMultiplier = mutationMultiplier > 0 ? mutationMultiplier : 1;
    const sellPrice = Math.round(plant.basePrice * variantMultiplier * ripenessMultiplier * finalMutationMultiplier * weightFactor);
    
    // Display results
    displayResults({
        sellPrice,
        variantMultiplier,
        ripenessMultiplier,
        mutationMultiplier: finalMutationMultiplier,
        weightFactor
    });
}

function calculateMutationMultiplier() {
    if (state.selectedMutations.length === 0) return 1;
    
    // Additive stacking for mutations (official formula)
    // Mutations add together, then multiply with Ripeness and Variant
    let multiplier = 0;
    state.selectedMutations.forEach(mutationId => {
        const mutation = MUTATIONS.find(m => m.id === mutationId);
        if (mutation && mutation.multiplier > 0) {
            multiplier += mutation.multiplier;
        }
    });
    
    return multiplier;
}

// Display Results
function displayResults(result) {
    const resultContent = document.getElementById('resultContent');
    const resultDetails = document.getElementById('resultDetails');
    
    if (!resultContent || !resultDetails) {
        console.error('Result containers not found');
        return;
    }
    
    resultContent.style.display = 'none';
    resultDetails.style.display = 'block';
    
    // Display plant image and name
    const plant = state.selectedPlant;
    const resultPlantImage = document.getElementById('resultPlantImage');
    const resultPlantName = document.getElementById('resultPlantName');
    
    if (resultPlantImage && plant) {
        resultPlantImage.src = plant.image;
        resultPlantImage.alt = plant.name;
        resultPlantImage.onerror = function() {
            this.src = '/calculator/images/plants/Placeholder.webp';
        };
    }
    
    if (resultPlantName && plant) {
        resultPlantName.textContent = `${plant.emoji} ${plant.name}`;
    }
    
    // Display sell price
    const sellPriceEl = document.getElementById('resultSellPrice');
    if (sellPriceEl) {
        sellPriceEl.textContent = `${result.sellPrice.toLocaleString()} Shillings`;
    }
    
    // Formula breakdown
    displayFormulaBreakdown(result);
}

function displayFormulaBreakdown(result) {
    const container = document.getElementById('formulaSteps');
    if (!container) {
        console.error('formulaSteps container not found');
        return;
    }
    
    const plant = state.selectedPlant;
    if (!plant) {
        console.error('No plant selected');
        return;
    }
    
    const weight = state.customWeight || plant.baseWeight;
    
    const steps = [
        { label: 'Base Price', value: `${plant.basePrice.toLocaleString()} Shillings` },
        { label: `Variant (${VARIANTS[state.selectedVariant].name})`, value: `×${result.variantMultiplier.toFixed(1)}` },
        { label: `Ripeness (${RIPENESS[state.selectedStage].name})`, value: `×${result.ripenessMultiplier.toFixed(1)}` },
        { label: 'Mutations', value: `×${result.mutationMultiplier.toFixed(2)}` },
        { label: 'Weight Factor', value: `×${result.weightFactor.toFixed(2)}` },
        { label: 'Final Sell Price', value: `${result.sellPrice.toLocaleString()} Shillings` }
    ];
    
    container.innerHTML = steps.map(step => `
        <div class="formula-step">
            <span class="formula-step-label">${step.label}</span>
            <span class="formula-step-value">${step.value}</span>
        </div>
    `).join('');
}

function hideResults() {
    document.getElementById('resultContent').style.display = 'block';
    document.getElementById('resultDetails').style.display = 'none';
}
