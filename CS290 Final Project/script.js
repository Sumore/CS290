


//pulls selected element from the page for manipulation based on user input
const effect_container = document.querySelector('.effect_container');
const atk_type = document.getElementById('att_type');
const def_type_1 = document.getElementById('def_type_1');
const def_type_2 = document.getElementById('def_type_2');

//creates an array of subarrays, Each primary type has 3 forms, "super, not effective, and 
//no effect" each form has listed the intrinsic relational types to that descriptor
const effect = {
  normal: {
    super: [],
    not: ['rock', 'steel'],
    no: ['ghost']
  },
  fire: {
    super: ['grass', 'ice', 'bug', 'steel'],
    not: ['fire', 'water', 'rock', 'dragon'],
    no: [],
  },
  water: {
    super: ['fire', 'ground', 'rock'],
    not: ['water', 'grass', 'dragon'],
    no: []
  },
  electric: {
    super: ['water', 'flying'],
    not: ['electric', 'grass', 'dragon'],
    no: ['ground']
  },
  grass: {
    super: ['water', 'ground', 'rock'],
    not: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
    no: []
  },
  ice: {
    super: ['grass', 'ground', 'flying', 'dragon'],
    not: ['fire', 'water', 'ice', 'steel'],
    no: []
  },
  fighting: {
    super: ['normal', 'ice', 'rock', 'dark', 'steel'],
    not: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
    no: ['ghost']
  },
  poison: {
    super: ['grass', 'fairy'],
    not: ['poison', 'ground', 'rock'],
    no: ['steel']
  },
  ground: {
    super: ['fire', 'electric', 'poison', 'rock', 'steel'],
    not: ['grass', 'bug'],
    no: ['flying']
  },
  flying: {
    super: ['grass', 'fighting', 'bug'],
    not: ['electric', 'rock', 'steel'],
    no: []
  },
  psychic: {
    super: ['fighting', 'poison'],
    not: ['psychic', 'steel'],
    no: ['dark']
  },
  bug: {
    super: ['grass', 'psychic', 'dark'],
    not: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'],
    no: []
  },
  rock: {
    super: ['fire', 'ice', 'flying', 'bug'],
    not: ['fighting', 'ground', 'steel'],
    no: []
  },
  ghost: {
    super: ['psychic', 'ghost'],
    not: ['dark'],
    no: ['normal']
  },
  dragon: {
    super: ['dragon'],
    not: ['steel'],
    no: ['fairy']
  },
  dark: {
    super: ['psychic', 'ghost'],
    not: ['fighting', 'dark', 'fairy'],
    no: ['ghost']
  },
  steel: {
    super: ['ice', 'rock', 'fairy'],
    not: ['fire', 'water', 'electric', 'steel'],
    no: []
  },
  fairy: {
    super: ['fighting', 'dragon', 'dark'],
    not: ['fire', 'poison', 'steel'],
    no: []
  }
}

//sets initial value of total effectiveness to 1
let totalEffectiveness = 'x1';

// pulls the type input from the dropdown menu on the page, then redesignates it to sel_type for use in calculation
function calc_effect() {
  const sel_atk_type = atk_type.value;
  const sel_def_type_1 = def_type_1.value;
  const sel_def_type_2 = def_type_2.value;

  // Ensure no duplicate defending types
  const defense1Types = def_type_1.getElementsByTagName('option');
  for (var i = 0; i < defense1Types.length; i++) {
    (defense1Types[i].value == sel_def_type_2)
      ? defense1Types[i].disabled = true
      : defense1Types[i].disabled = false;
  }
  const defense2Types = def_type_2.getElementsByTagName('option');
  for (var i = 0; i < defense2Types.length; i++) {
    (defense2Types[i].value == sel_def_type_1)
      ? defense2Types[i].disabled = true
      : defense2Types[i].disabled = false;
  }


  // Find effectiveness against first defense type
  //compares each selected type by its "super, not, or no" designator
  //Finds if that decriptor contains the currently selected defense type
  //creates effectiveness value
  let effectiveness1 = 1;
  if (effect[sel_atk_type].super.includes(sel_def_type_1)) {
    effectiveness1 = 2;
  } else if (effect[sel_atk_type].not.includes(sel_def_type_1)) {
    effectiveness1 = 0.5;
  } else if (effect[sel_atk_type].no.includes(sel_def_type_1)) {
    effectiveness1 = 0;
  } else {
    effectiveness1 = 1;
  }
  
  // Find effectiveness against second defense type
  let effectiveness2 = 1;
  if (effect[sel_atk_type].super.includes(sel_def_type_2)) {
    effectiveness2 = 2;
  } else if (effect[sel_atk_type].not.includes(sel_def_type_2)) {
    effectiveness2 = 0.5;
  } else if (effect[sel_atk_type].no.includes(sel_def_type_2)) {
    effectiveness2 = 0;
  } else {
    effectiveness2 = 1;
  }

  // Get total effectiveness
  totalEffectiveness = `x${effectiveness1 * effectiveness2}`;

  //runs the update function below
  updateDOM();
}

// Update DOM
function updateDOM() {
  const effectivenessEl = document.createElement('p');        //creates paragraph
  effect_container.innerHTML = '<h3>Damage Multiplier</h3>';  //fills
  effect_container.appendChild(effectivenessEl);              //appends to the effect container
  effectivenessEl.classList.add('multiplier');                //uses elements from css
  effectivenessEl.innerHTML = totalEffectiveness;             //redesignates
}

// Listens for user input, calls the main math function
atk_type.addEventListener('change', calc_effect);
def_type_1.addEventListener('change', calc_effect)
def_type_2.addEventListener('change', calc_effect);

updateDOM();