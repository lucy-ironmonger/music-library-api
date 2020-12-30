//SETUP
const app = require('./src/app');

const APP_PORT = 4000;

app.listen(APP_PORT, () => {
  console.log(`Hi Lucy. Now serving your Express app at http://localhost:${APP_PORT}`); 
});

