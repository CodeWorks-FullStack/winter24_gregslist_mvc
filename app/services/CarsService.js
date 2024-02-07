import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { loadState, saveState } from "../utils/Store.js";

function _saveCarsInLocalStorage() {
  // NOTE utility function to save a value into localstorage. 
  // NOTE The first argument passed to the function is the key where we will store the value in localstorage. Also appends the name of your application, so we're storing a value at mvc_gregslist_cars
  // NOTE the second argument passed is the value that we want to store in localstorage. In this case, we want to save our entire array
  saveState('cars', AppState.cars)
}


class CarsService {

  createCar(carFormData) {
    // TODO do crazy stuff

    const newCarModel = new Car(carFormData)

    console.log('pojo', carFormData);
    console.log('NEW CAR', newCarModel);

    AppState.cars.push(newCarModel)

    _saveCarsInLocalStorage()
  }

  loadCarsFromLocalStorage() {
    // NOTE function to bring data out of local storage
    // NOTE the first argument is the key that we are storing our data at. This should match the key provided to saveState
    // NOTE the second argument is the instance type that we want our data converted into from localstorage. We want to turn the pojos from local storage into an array of cars
    const carsFromLocalStorage = loadState('cars', Car)
    AppState.cars = carsFromLocalStorage
  }

  removeCar(carId) {
    // NOTE findIndex works similar to find, but it returns an index number instead of an item from the array 
    const carIndex = AppState.cars.findIndex(car => car.id == carId)
    console.log('found car index', carIndex);

    // NOTE if your conditional never returns true in findIndex, it returns -1. using -1 as our starting index in splice will start splicing at the end of the array
    if (carIndex == -1) {
      throw new Error('Car index was -1, you messed something up bud, check your conditional for findIndex')
    }

    // NOTE splice's first argument is where to start splicing, the second argument is how many items to take out after starting index
    AppState.cars.splice(carIndex, 1)

    _saveCarsInLocalStorage()
  }

}

export const carsService = new CarsService()