import { CarsController } from "./controllers/CarsController.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    // NOTE if url looks like 'localhost:8080', this route object is loaded
    path: '',
    view: /*html*/`
    <h1 class="m-4 display-3">Welcome to Gregslist!</h1>
    <h2 class="m-4 display-4">Please select a category from the top navbar!</h2>
    `
  },
  {
    // NOTE if url looks like 'localhost:8080/#/cars', this route object is loaded
    path: '#/cars',
    controllers: [CarsController],
    // NOTE filepath to our CarsView HTML file
    view: 'app/views/CarsView.html'
  },
  // TODO create route object for houses!
])