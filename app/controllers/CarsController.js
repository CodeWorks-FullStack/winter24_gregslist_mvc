import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCars() {
  const cars = AppState.cars

  let htmlString = ''

  cars.forEach(car => htmlString += car.CarCardHTMLTemplate)

  setHTML('carListings', htmlString)
}



export class CarsController {
  constructor () {
    // ANCHOR page load
    console.log('Cars controller loaded');
    carsService.loadCarsFromLocalStorage()
    _drawCars()


    // ANCHOR listeners
    AppState.on('cars', _drawCars)
  }

  createCar() {
    // NOTE try will attempt to run any code in the code block, and will catch an error and stop running it it encounters one
    try {
      event.preventDefault() //NOTE stop the page from refreshing
      console.log('creating car');

      const form = event.target //NOTE target all of the HTML from the form

      console.log('targeted event', form);

      // @ts-ignore
      console.log('car make', form.make.value); //NOTE how we pull individual values out of the form

      const carFormData = getFormData(form) //NOTE getFormData will pull all input fields with a name attribute on them and build an object for us

      // NOTE converts "on" value to boolean
      carFormData.hasSalvagedTitle = carFormData.hasSalvagedTitle == 'on'

      // REVIEW always make sure that this object looks correct before casting it into a class model!
      console.log('here is your car data object!', carFormData);

      carsService.createCar(carFormData)

      // @ts-ignore
      form.reset() //NOTE clears all inputted values from form

      // NOTE catch gets triggered whenever an error is thrown in our try codeblock, and runs the code in this code block instead
    } catch (error) {
      console.error(error);
      // NOTE Sweet alert
      Pop.error(error.message)
    }
  }

  // NOTE need to make this method async if using Pop.confirm utility
  async removeCar(carId) {

    // NOTE await the Pop.confirm promise to resolve before moving beyond this line
    const wantsToRemove = await Pop.confirm('Are you sure you want to delete this car?')

    // NOTE if you use the window.confirm, you do not need async/await. It's just uglier 🤷
    // const wantsToRemove = window.confirm('Are you sure you want to delete this car?')

    if (!wantsToRemove) {
      // NOTE full stop
      return
    }

    console.log('removing car with this id', carId);

    carsService.removeCar(carId)
  }
}