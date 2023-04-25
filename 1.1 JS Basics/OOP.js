function AbstractProduct() {
    if(this.constructor === AbstractProduct){
        throw new Error('Cannot instantiate an abstract class')
    }
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

function Clothes(ID, Name, description, price, quantity, reviews, images, date, brand, material, color){
    AbstractProduct.call(this)
    this.id = ID  
    this.name = Name
    this.description = description
    this.price = price
    this.quantity = quantity
    this.reviews = reviews
    this.images = images
    this.date = date
    this.brand = brand
    this.material = material
    this.color = color
}

Clothes.prototype = Object.create(AbstractProduct.prototype)

Clothes.prototype.getmaterial = () => console.log(this.material)
Clothes.prototype.setmaterial = (newmaterial) => this.material = newmaterial

Clothes.prototype.getcolour = () => console.log(this.color)
Clothes.prototype.setcolor = () => this.color = newcolor

Clothes.prototype.getFullInformation = () => console.log(`id = ${this.id}\nname = ${this.name}\ndescription = ${this.description}\nprice = ${this.price}\nquantity = ${this.quantity}\nreviews = ${this.reviews}\nimages = ${this.images}\ndate = ${this.date}\nbrand = ${this.brand}\ncolor = ${this.color}\nmaterial = ${this.material}`)
Clothes.prototype.getPriceForQuantity = (int) => console.log(`$${this.price * int}`)

Clothes.prototype.getterSetter = function(key, value) {
    if (value === undefined) {
        return this[key]
    }
    else {
        this[key] = value
    }
}

function Electronics(ID, Name, description, price, quantity, reviews, images, date, brand, warranty, power){
    AbstractProduct.call(this)
    this.id = ID  
    this.name = Name
    this.description = description
    this.price = price
    this.quantity = quantity
    this.reviews = reviews
    this.images = images
    this.date = date
    this.brand = brand
    this.warranty = warranty
    this.power = power
}

Electronics.prototype = Object.create(AbstractProduct.prototype)

Electronics.prototype.getwarranty = () => console.log(this.warranty)
Electronics.prototype.setwarranty = (newwarranty) => this.warranty = newwarranty

Electronics.prototype.getpower = () => console.log(this.power)
Electronics.prototype.setpower = (newpower) => this.power = newpower

Electronics.prototype.getFullInformation = () => console.log(`id = ${this.id}\nname = ${this.name}\ndescription = ${this.description}\nprice = ${this.price}\nquantity = ${this.quantity}\nreviews = ${this.reviews}\nimages = ${this.images}\ndate = ${this.date}\nbrand = ${this.brand}\ncolor = ${this.color}\nmaterial = ${this.material}`)
Electronics.prototype.getPriceForQuantity = (int) => console.log(`$${this.price * int}`)

Electronics.prototype.getterSetter = function(key, value) {
    if (value === undefined) {
        return this[key]
    }
    else {
        this[key] = value
    }
}
