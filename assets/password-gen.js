//Using Javascript to interact with the HTML document specific classes and ids and assigning them to constant values.


//Initializing variables for the password generator.
const numberInput = document.getElementById('password-length-slider');
const rangeSlider = document.getElementById('adjustableVisualSlider');

//Initializing the password characters.
const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
const numberCharacters = '0123456789';
const symbolCharacters = `!@#$%^&*()_-+=[]{}|;:,.<>?'\'"/`;

//Initializing the auto-generate variables for the auto-generate checkbox and sub-checkbox buttons.
const passwordGenerateBtn = document.getElementById('password-generateBtn');
const autoGenerateCheckbox = document.getElementById('autoGenerationCheckbox');
const checkmarkButtons = document.getElementById('checkmarkButtons');
const checkmarkInterval = document.getElementById('checkmarkButton1');
const autoIntervalSlider = document.getElementById('password-autoInterval-slider');
const checkmarkSlider = document.getElementById('checkmarkButton2');

//Initializing the interval variable for the auto interval generation
let intervalId;


//Connecting both numberInput and rangeSlider together
rangeSlider.addEventListener('input', function() {
    numberInput.value = this.value;
})

numberInput.addEventListener('input', function() {
    rangeSlider.value = this.value;
})

//Setting up the generatePassword function as well as its constant variables and logic to check whether one or more password options are activated.
function generatePassword() {
    const useUppercase = document.getElementById('uppercaseCheckbox').checked;
    const useLowercase = document.getElementById('lowercaseCheckbox').checked;
    const useNumbers = document.getElementById('numbersCheckbox').checked;
    const useSymbols = document.getElementById('symbolsCheckbox').checked;

    //Constant with an array to hold combinations of the selected character sets.
    const selectedCharacterSets = [];

    //Check which character sets are active to add them to the selectedCharacterSets array.
    if (useUppercase) {
        selectedCharacterSets.push(uppercaseCharacters);
    }

    if (useLowercase) {
        selectedCharacterSets.push(lowercaseCharacters);
    }

    if (useNumbers) {
        selectedCharacterSets.push(numberCharacters);
    }

    if (useSymbols) {
        selectedCharacterSets.push(symbolCharacters);
    }

    if (selectedCharacterSets.length === 0) {
        alert('Please select at least one of the provided password options.');
        return;
    }

    let password = '';
    const passwordLength = rangeSlider.value;

    for (let y = 0; y < passwordLength; y++) {
        const randomCharacterSetIndex = Math.floor(Math.random() * selectedCharacterSets.length);
        const selectedCharacterSet = selectedCharacterSets[randomCharacterSetIndex];
        const randomCharacterIndex = Math.floor(Math.random() * selectedCharacterSet.length);
        password += selectedCharacterSet[randomCharacterIndex]
    }

    //This displays the generated password.
    document.getElementById('passwordOutput').value = password;
}




passwordGenerateBtn.addEventListener('click', function() {
    if (autoGenerateCheckbox.checked && checkmarkInterval.checked) {
        const useUppercase = document.getElementById('uppercaseCheckbox').checked;
        const useLowercase = document.getElementById('lowercaseCheckbox').checked;
        const useNumbers = document.getElementById('numbersCheckbox').checked;
        const useSymbols = document.getElementById('symbolsCheckbox').checked;

        if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
            alert ('Please select at least one of the provided password options.');
            return;
        }
        if (!intervalId) {
            startIntervalAutoGeneration();
            changeToStopButton();
        } else {
            stopIntervalAutoGeneration();
            changeBackToGenerateButton();
        }
    } else {
        generatePassword();
    }
});

function toggleAutoGenerate() {
    if (autoGenerateCheckbox.checked) {
        checkmarkButtons.style.display = 'block';
    } else {
        checkmarkButtons.style.display = 'none';
    }
}

function checkmarkIntervalChangeHandler() {
    if (!checkmarkInterval.checked) {
        autoIntervalSlider.setAttribute('disabled', 'disabled');
        console.log("interval is gone.")
    } else {
        autoIntervalSlider.removeAttribute('disabled');
        console.log("Interval is back.");
    }
}

checkmarkInterval.addEventListener('change', checkmarkIntervalChangeHandler);


function startIntervalAutoGeneration() {
    const intervalValue = parseInt(document.getElementById('password-autoInterval-slider').value);
    intervalId = setInterval(generatePassword, intervalValue * 1000);
}

function stopIntervalAutoGeneration() {
    clearInterval(intervalId);
    intervalId = 0;
}

document.getElementById('password-autoInterval-slider').addEventListener('input', function() {
    startIntervalAutoGeneration();
    stopIntervalAutoGeneration();
});

function changeToStopButton() {
    passwordGenerateBtn.textContent = 'Stop';
    passwordGenerateBtn.style.backgroundColor = 'red'
}

function changeBackToGenerateButton() {
    passwordGenerateBtn.textContent = 'Generate';
    passwordGenerateBtn.style.backgroundColor = 'green';
}

function rangeSliderInputHandler() {
    if (autoGenerateCheckbox.checked && checkmarkSlider.checked) {
        generatePassword();
    }
}

function checkmarkSliderChangeHandler() {
    if (!checkmarkSlider.checked) {
        rangeSlider.removeEventListener('input', rangeSliderInputHandler);
        console.log("Slider is deactivated.");
    } else if (checkmarkSlider.checked) {
        console.log("Slider is activated.");
        rangeSlider.addEventListener('input', rangeSliderInputHandler);
    }
}

checkmarkSlider.addEventListener('change', checkmarkSliderChangeHandler);
