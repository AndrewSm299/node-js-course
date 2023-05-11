/**
 *
 * @param {} id
 * @param {String} name
 * @param {String} description
 * @param {Number} price per 1 piece of it
 * @param {Number} quantity of avaliable products
 * @param {Array} reviews
 * @param {Array} images
 * @param {} date of creating the product
 * @param {String} brand
 *
 */

function AbstractProduct(id, name, description, price, quantity, reviews, images, date, brand) {
    this.id = id  
    this.name = name
    this.description = description
    this.price = price
    this.quantity = quantity
    this.reviews = reviews
    this.images = images
    this.date = date
    this.brand = brand
}

AbstractProduct.prototype.getFullInformation = function() {
    throw new Error("Cannot call an abstract method")
}
AbstractProduct.prototype.getPriceForQuantity = function() {
    throw new Error("Cannot call an abstract method")
}
AbstractProduct.prototype.getterSetter = function() {
    throw new Error("Cannot call an abstract method")
}

/**
 *
 * @param {} id
 * @param {String} name
 * @param {String} description
 * @param {Number} price per 1 piece of Clothes
 * @param {Number} quantity of avaliable Clothes
 * @param {Array} reviews on Clothes
 * @param {Array} images
 * @param {} date of creating the Clothes
 * @param {String} brand
 * @param {String} material what is it made of
 * @param {String} color
 *
 */

function Clothes(id, name, description, price, quantity, reviews, images, date, brand, material, color){
    AbstractProduct.call(this, id, name, description, price, quantity, reviews, images, date, brand)
    this.material = material
    this.color = color
}

Clothes.prototype = Object.create(AbstractProduct.prototype)
Clothes.prototype.constructor = Clothes

Clothes.prototype.getFullInformation = function() { 
    console.log(`    id = ${this.id}
    name = ${this.name}
    description = ${this.description}
    price = ${this.price}
    quantity = ${this.quantity}
    reviews = ${this.reviews}
    images = ${this.images}
    date = ${this.date}
    brand = ${this.brand}
    color = ${this.color}
    material = ${this.material}`)
}

/**
 *
 * @param {Number} int quantity to define the price for it
 *
 */

Clothes.prototype.getPriceForQuantity = function(int) {
    console.log(`$${this.price * int}`)
}

Clothes.prototype.getterSetter = function(key, value){
    switch (key) {
        case "id":
            if(value === undefined){
                return this.id
            }
            else{
                this.id = value
            }
            break;
        case "name":
            if(value === undefined){
                return this.name
            }
            else{
                this.name = value
            }
            break;
        case "description":
            if(value === undefined){
                return this.description
            }
            else{
                this.description = value
            }
            break;
        case "price":
            if(value === undefined){
                return this.price
            }
            else{
                this.price = value
            }
            break;
        case "quantity":
            if(value === undefined){
                return this.quantity
            }
            else{
                this.quantity = value
            }
            break;
        case "reviews":
            if(value === undefined){
                return this.reviews
            }
            else{
                this.reviews = value
            }
            break;
        case "images":
            if(value === undefined){
                return this.images
            }
            else{
                this.images = value
            }
            break;
        case "date":
            if(value === undefined){
                return this.date
            }
            else{
                this.date = value
            }
            break;
        case "brand":
            if(value === undefined){
                return this.brand
            }
            else{
                this.brand = value
            }
            break;
        case "material":
            if(value === undefined){
                return this.material
            }
            else{
                this.material = value
            }
            break;
        case "color":
            if(value === undefined){
                return this.color
            }
            else{
                this.color = value
            }
            break;
        default:
            throw new Error('Cannot be completed without a key')      
    }
}

/**
 *
 * @param {} id
 * @param {String} name
 * @param {String} description
 * @param {Number} price per 1 piece of it
 * @param {Number} quantity of avaliable Electronics
 * @param {Array} reviews on it
 * @param {Array} images
 * @param {} date of creating the Clothes
 * @param {String} brand
 * @param {String} warranty code
 * @param {String} power
 *
 */

function Electronics(id, name, description, price, quantity, reviews, images, date, brand, warranty, power){
    AbstractProduct.call(this, id, name, description, price, quantity, reviews, images, date, brand)
    this.warranty = warranty
    this.power = power
}

Electronics.prototype = Object.create(AbstractProduct.prototype)
Electronics.prototype.constructor = Electronics

Electronics.prototype.getFullInformation = function() { 
    console.log(`    id = ${this.id}
    name = ${this.name}
    description = ${this.description}
    price = ${this.price}
    quantity = ${this.quantity}
    reviews = ${this.reviews}
    images = ${this.images}
    date = ${this.date}
    brand = ${this.brand}
    warranty = ${this.warranty}
    power = ${this.power}`)
}

/**
 *
 * @param {Number} int quantity to define the price for it
 *
 */

Electronics.prototype.getPriceForQuantity = function(int) {
    console.log(`$${this.price * int}`)
}

Electronics.prototype.getterSetter = function(key, value){
    switch (key) {
        case 'id':
            if(value === undefined){
                return this.id
            }
            else{
                this.id = value
            }
            break;
        case 'name':
            if(value === undefined){
                return this.name
            }
            else{
                this.name = value
            }
            break;
        case "description":
            if(value === undefined){
                return this.description
            }
            else{
                this.description = value
            }
            break;
        case "price":
            if(value === undefined){
                return this.price
            }
            else{
                this.price = value
            }
            break;
        case "quantity":
            if(value === undefined){
                return this.quantity
            }
            else{
                this.quantity = value
            }
            break;
        case "reviews":
            if(value === undefined){
                return this.reviews
            }
            else{
                this.reviews = value
            }
            break;
        case "images":
            if(value === undefined){
                return this.images
            }
            else{
                this.images = value
            }
            break;
        case "date":
            if(value === undefined){
                return this.date
            }
            else{
                this.date = value
            }
            break;
        case "brand":
            if(value === undefined){
                return this.brand
            }
            else{
                this.brand = value
            }
            break;
        case "warranty":
            if(value === undefined){
                return this.warranty
            }
            else{
                this.warranty = value
            }
            break;
        case "power":
            if(value === undefined){
                return this.power
            }
            else{
                this.power = value
            }
            break;
        default:
            throw new Error('Cannot be completed without a key')      
    }
}

// Tests

// Tests for AbstractProduct
const bugatti = new AbstractProduct(5, 'car', 'the best car to have in your life', 1000000004, 2, [], [], '2024-09-04', 'BUgatti' )
bugatti.getFullInformation()
bugatti.getPriceForQuantity(5)
bugatti.getterSetter("name", "Chiron")
console.log(bugatti.getterSetter("name"))

// Tests for Clothes
const tshirt = new Clothes(1, 'T-Shirt', 'A comfortable cotton T-shirt', 20.99, 10, [], [], '2022-01-01', 'Adidas', 'Cotton', 'White');

tshirt.getFullInformation()
tshirt.getPriceForQuantity(3)
tshirt.getterSetter('id', 2)
console.log(tshirt.getterSetter('id'))


// Tests for Electronics
const PC = new Electronics(3, "PC", '2TB RAM 64GB', 1001.98, 5, [], [], '2023-05-03', 'ASUS', '34524', '800W')

PC.getFullInformation()
PC.getPriceForQuantity(4)
PC.getterSetter("name", "Laptop")
console.log(PC.getterSetter("name"))
