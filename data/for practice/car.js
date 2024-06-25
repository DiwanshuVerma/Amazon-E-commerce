class Car {
    brand;
    model;
    speed;
    isTrunkOpen = false;

    constructor(carDetails) {
        this.brand = carDetails.brand
        this.model = carDetails.model
        this.speed = carDetails.speed
    }
    displayInfo() {
        const checkTrunk = this.isTrunkOpen === true ? 'open' : 'closed';
        console.log(`${this.brand} ${this.model} ${this.speed} km/h Trunk: ${checkTrunk}`)
    }
    go() {
        if (!this.isTrunkOpen) {
          this.speed += 5;
        }
    }
    break() {
        if (this.speed > 0) {
            this.speed -= 5;
        }
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }
    closeTrunk() {
        this.isTrunkOpen = false;
    }

}

const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla',
    speed: 0
});

const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3',
    speed: 0
});

// car1.go()
// car1.go()
// car1.go()
// car1.go()


// car1.openTrunk()
car2.go()
car2.openTrunk()
car1.go()
car1.go()

// car1.closeTrunk()
// car2.break()
// car2.break()
car1.displayInfo()
car2.displayInfo()

// const cars = [{
//     brand: 'Toyota',
//     model: 'Corolla'
// }, {
//     brand: 'Tesla',
//     model: 'Model 3'
// }
// ].map((carDetails) => {
//     return new Car(carDetails);
// });

