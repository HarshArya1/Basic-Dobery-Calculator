document.getElementById('dowryCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const profession = document.getElementById('pro').value;
    const income = parseInt(document.getElementById('income').value);
    const residence = document.getElementById('res').value;
    const ownsHouse = document.querySelector('input[name="Residence"]:checked').value;

    // Enhanced calculation logic with huge impact differences
    let dowryValue = calculateDowry(age, profession, income, residence, ownsHouse);

    document.getElementById('result').innerText = `Result: ${dowryValue}`;
});

function calculateDowry(age, profession, income, residence, ownsHouse) {
    // Assign weights with significantly large differences
    const ageWeight = 1.0;  // Reduced impact of age
    const incomeWeight = 20.0;  // Increased impact of income
    const professionWeight = { 
        'Engineer': 25, 
        'Doctor': 30, 
        'Banking': 15, 
        'Government Job': 20, 
        'Army': 25, 
        'Politician': 40, 
        'Other': 10 
    };
    const residenceWeight = { 
        'urban': 5, 
        'rural': 0.1, 
        'foreign': 20 
    };
    const houseWeight = ownsHouse === 'yes' ? 5 : 1;

    // Perform calculation with significant impact for foreign residence
    let dowryValue = (age * ageWeight) + (income * incomeWeight) + (professionWeight[profession]) + (residenceWeight[residence] * houseWeight);
    if(residence==="rural")
    dowryValue-=income*4;
    else if(residence==="urban")
    dowryValue-=income/10;
    else
    dowryValue=dowryValue+500000;
    if(ownsHouse==="no")
    dowryValue-=income*4;
    return dowryValue.toFixed(2);  // Return a value rounded to 2 decimal places for precision
}
