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
}

main();
