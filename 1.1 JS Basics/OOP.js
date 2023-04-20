class AbstractProduct {
  constructor(){
    if(this.constructor === AbstractProduct){
      throw new Error('Cannot instantiate abstract class')
    }
  }
  // methods
  getFullInformation() {
    throw new Error('Subclass must implement abstract method.')
  }
  getPriceForQuantity(){
    throw new Error('Subclass must implement abstract method.')
  }
}

class Clothes extends AbstractProduct{
  constructor(id, name, description, price, quantity, reviews, images, date, brand, color, material) {
    this.id = id  
    this.name = name
    this.description = description
    this.price = price
    this.quantity quantity
    this.reviews = reviews
    this.images = images
    this.date = date
    this.brand = brand
    this.material = material
    this.color = color
  }
  getFullInformation() {
    console.log(`id = ${this.id}\nname = ${this.name}\ndescription = ${this.description}\nprice = ${this.price}\nquantity = ${this.quantity}\nreviews = ${this.reviews}\nimages = ${this.images}\ndate = ${this.date}\nbrand = ${this.brand}\ncolor = ${this.color}\nmaterial = ${this.material}`)
  }
  getPriceForQuantity(int){
    console.log(`$${this.price * int}`)
  }
}

class Electronics extends AbstractProduct{
  constructor(id, name, description, price, quantity, reviews, images, date, brand, warranty, power) {
    this.id = id  
    this.name = name
    this.description = description
    this.price = price
    this.quantity quantity
    this.reviews = reviews
    this.images = images
    this.date = date
    this.brand = brand
    this.warranty = warranty
    this.power = power
  }
  getFullInformation() {
    console.log(`id = ${this.id}\nname = ${this.name}\ndescription = ${this.description}\nprice = ${this.price}\nquantity = ${this.quantity}\nreviews = ${this.reviews}\nimages = ${this.images}\ndate = ${this.date}\nbrand = ${this.brand}\nwarranty = ${this.warranty}\npower = ${this.power}`)
  }
  getPriceForQuantity(int){
    console.log(`$${this.price * int}`)
  }
  getwarranty(){
    console.log(`your warranty ${this.warranty}`)
  }
  setwarranty(newwarranty){
    this.warranty = newwarranty
  }
  getpower(){
    console.log(this.power)
  }
  setpower()_

}
