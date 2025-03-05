const placeholderResponseData = `{
    "status": 200,
    "success": true,
    "data": [
        {
            "id": 19,
            "name": "Sparring Guard",
            "skillId": 4,
            "regionId": 31,
            "passive": false,
            "attackElement": "IMPACT",
            "immuneElement": "NONE",
            "vulnerableElement": "NONE",
            "rooms": [],
            "skill": {
                "id": 4,
                "name": "Guard",
                "regionId": 31
            },
            "variants": [],
            "region": {
                "id": 31,
                "name": "Hopeport"
            }
        },
        {
            "id": 20,
            "name": "Deathcrow",
            "skillId": 4,
            "regionId": 31,
            "passive": false,
            "attackElement": "NECROMAE",
            "immuneElement": "NECROMAE",
            "vulnerableElement": "CRYONAE",
            "rooms": [],
            "skill": {
                "id": 4,
                "name": "Guard",
                "regionId": 31
            },
            "variants": [],
            "region": {
                "id": 31,
                "name": "Hopeport"
            }
        }
    }`;

function main() {
  // Refs to elements
  const devForm = document.getElementById('dev-form');
  const prodForm = document.getElementById('prod-form');
  const demoInput = document.getElementById('demo-input');
  const returnedDataP = document.getElementById('returned-data');

  const logElements = () => {
    console.log('Got elements:');
    console.log('Dev form:', devForm);
    console.log('Prod form:', prodForm);
    console.log('Demo input:', demoInput);
    console.log('Returned data p:', returnedDataP);
  };
  logElements();

  const handleDevSubmit = () => {
    console.log('dev submit');
  };

  const handleProdSubmit = () => {
    console.log('prod submit');
  };

  // Override submit handlers for forms
  if (devForm) {
    devForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleDevSubmit();
    });
  }

  if (prodForm) {
    prodForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleProdSubmit();
    });
  }

  // Set the default value and response data
  if (demoInput) {
    demoInput.setAttribute('value', '/monsters');
  }

  if (returnedDataP) {
    returnedDataP.innerText = placeholderResponseData;
  }
}

main();
