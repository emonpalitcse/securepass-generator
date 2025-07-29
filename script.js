const passwordEl = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");
const lengthSlider = document.getElementById("lengthSlider");
const lengthVal = document.getElementById("lengthVal");
const includeLower = document.getElementById("includeLower");
const includeUpper = document.getElementById("includeUpper");
const includeNumber = document.getElementById("includeNumber");
const includeSymbol = document.getElementById("includeSymbol");
const strengthEl = document.getElementById("strength");
const darkModeToggle = document.getElementById("darkModeToggle");

lengthSlider.addEventListener("input", () => {
  lengthVal.textContent = lengthSlider.value;
});

// Character generator functions
const getRandomLower = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);
const getRandomUpper = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
const getRandomNumber = () => String.fromCharCode(Math.floor(Math.random() * 10) + 48);
const getRandomSymbol = () => {
  const symbols = "!@#$%^&*()_+[]{}|:;,.<>?";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = () => {
  const length = +lengthSlider.value;
  const hasLower = includeLower.checked;
  const hasUpper = includeUpper.checked;
  const hasNumber = includeNumber.checked;
  const hasSymbol = includeSymbol.checked;

  const typesArr = [
    { type: "lower", func: getRandomLower },
    { type: "upper", func: getRandomUpper },
    { type: "number", func: getRandomNumber },
    { type: "symbol", func: getRandomSymbol },
  ].filter(item => {
    if (item.type === "lower") return hasLower;
    if (item.type === "upper") return hasUpper;
    if (item.type === "number") return hasNumber;
    if (item.type === "symbol") return hasSymbol;
  });

  if (typesArr.length === 0) {
    passwordEl.value = "";
    alert("Please select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randType = typesArr[Math.floor(Math.random() * typesArr.length)];
    password += randType.func();
  }

  passwordEl.value = password;
  evaluateStrength(password);
};

const evaluateStrength = (password) => {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let strength = "Weak";
  if (score >= 4) strength = "Strong";
  else if (score >= 3) strength = "Good";
  else if (score >= 2) strength = "Normal";

  strengthEl.innerHTML = `Strength: <strong>${strength}</strong>`;
};

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  if (!passwordEl.value) return;
  passwordEl.select();
  document.execCommand("copy");
  copyBtn.textContent = "✅";
  setTimeout(() => {
    copyBtn.textContent = "📋";
  }, 1000);
});

// Dark Mode Toggle
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkModeToggle.checked);
});

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
  passwordEl.value = "";
  lengthSlider.value = 16;
  lengthVal.textContent = 16;
  includeLower.checked = true;
  includeUpper.checked = true;
  includeNumber.checked = true;
  includeSymbol.checked = true;
  strengthEl.innerHTML = "Strength: <strong>Normal</strong>";
  darkModeToggle.checked = false;
  document.body.classList.remove("dark");
  copyBtn.textContent = "📋";
});
