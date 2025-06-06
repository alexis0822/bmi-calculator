const form = document.getElementById('bmi-form');
const unitSwitch = document.getElementById('unit-switch');
const weightLabel = document.getElementById('weight-label');
const heightLabel = document.getElementById('height-label');
const heightInputs = document.querySelector('.height-inputs');
const bmiOutput = document.getElementById('bmi-output');
const result = document.getElementById('result');
const recommendations = document.getElementById('recommendations');

// Unit conversion constants
const LB_TO_KG = 0.453592;
const IN_TO_CM = 2.54;

function getBmiColor(bmi) {
    if (bmi < 18.5) return '#2196F3'; // Underweight - Blue
    if (bmi < 25) return '#4CAF50';   // Normal - Green
    if (bmi < 30) return '#FF9800';   // Overweight - Orange
    return '#F44336';                 // Obese - Red
}

function getRecommendations(category) {
    const recommendations = {
        'Underweight': 'Consider consulting a healthcare provider about healthy weight gain strategies. Focus on nutrient-rich foods and strength training.',
        'Normal weight': 'Maintain your healthy lifestyle with balanced nutrition and regular physical activity.',
        'Overweight': 'Focus on portion control and increasing physical activity. Consider consulting a healthcare provider for personalized advice.',
        'Obese': 'Please consult a healthcare provider for professional guidance on weight management strategies.'
    };
    return recommendations[category];
}

function getBmiCategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function showResults() {
    form.classList.add('expanded');
    bmiOutput.classList.add('show-result');
    result.classList.add('show-result');
    recommendations.classList.add('show-result');

    setTimeout(() => {
        bmiOutput.classList.add('show-result');
        result.classList.add('show-result');
        recommendations.classList.add('show-result');
    }, 100);
}

function hideResults() {
    form.classList.remove('expanded');
    bmiOutput.classList.remove('show-result');
    result.classList.remove('show-result');
    recommendations.classList.remove('show-result');
}

unitSwitch.addEventListener('change', function() {
    if (this.checked) {
        // Switch to Metric
        weightLabel.textContent = 'Weight (kg)';
        heightLabel.textContent = 'Height (cm)';
        heightInputs.innerHTML = `
            <input type="number" id="height-cm" name="height-cm" min="0" placeholder="Centimeters" required>
        `;
    } else {
        // Switch to Imperial
        weightLabel.textContent = 'Weight (lb)';
        heightLabel.textContent = 'Height';
        heightInputs.innerHTML = `
            <div class="feet-group">
                <input type="number" id="height-feet" name="height-feet" min="0" placeholder="Feet" required>
                <span class="unit">'</span>
            </div>
            <div class="inches-group">
                <input type="number" id="height-inches" name="height-inches" min="0" max="11" placeholder="Inches" required>
                <span class="unit">"</span>
            </div>
        `;
    }
    // Reset form when switching units
    form.reset();
    hideResults();
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let bmi;
    const weight = parseFloat(document.getElementById('weight').value);

    if (unitSwitch.checked) {
        // Metric calculation
        const heightCm = parseFloat(document.getElementById('height-cm').value);
        bmi = (weight / Math.pow(heightCm/100, 2));
    } else {
        // Imperial calculation
        const heightFeet = parseFloat(document.getElementById('height-feet').value);
        const heightInches = parseFloat(document.getElementById('height-inches').value);
        const totalHeightInches = (heightFeet * 12) + heightInches;
        bmi = (weight / (totalHeightInches * totalHeightInches)) * 703;
    }

    // Get BMI category
    const category = getBmiCategory(bmi);
    const color = getBmiColor(bmi);

    // Display results
    bmiOutput.textContent = `Your BMI: ${bmi.toFixed(1)}`;
    bmiOutput.style.color = color;
    result.textContent = `Category: ${category}`;
    result.style.color = color;
    recommendations.textContent = getRecommendations(category);

    // Show results with animation
    showResults();
});

form.addEventListener('reset', function() {
    // Clear all outputs
    recommendations.textContent = '';
    bmiOutput.textContent = '';
    result.textContent = '';
    
    // Hide results with animation
    hideResults();
});