function AbstractProduct(ID, Name, description, price, quantity, reviews, images, date, brand, sizes) {
    if(this.constructor === AbstractProduct){
        throw new Error('Cannot instantiate an abstract class')
    }
    this.id = ID  
    this.name = Name
    this.description = description
    this.price = price
    this.quantity = quantity
    this.reviews = reviews
    this.images = images
    this.date = date
    this.brand = brand
    this.sizes = sizes
}

AbstractProduct.prototype.getReviewByID = function() {
    throw new Error("Cannot call an abstract method")
}
AbstractProduct.prototype.getImage = function() {
    throw new Error("Cannot call an abstract method")
}


AbstractProduct.prototype.addSize = function() {
    throw new Error("Cannot call an abstract method")
}
AbstractProduct.prototype.deleteSize = function() {
    throw new Error("Cannot call an abstract method")
}

AbstractProduct.prototype.addReview = function() {
    throw new Error("Cannot call an abstract method")
}

AbstractProduct.prototype.deleteReview = function() {
    throw new Error("Cannot call an abstract method")
}

AbstractProduct.prototype.getAverageRating = function() {
    throw new Error("Cannot call an abstract method")
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

function searchProducts (products, search) {
    let searchresult = []
    search = search.trim().toLowerCase()
    products.forEach((element) => {
        let str = "";
        str = element.name + " " + element.description;
        str = str.toLowerCase();
        if (str.indexOf(search.toLowerCase()) !== -1 ) {
            searchresult.push(element);
        }
    })
    return searchresult
}

function sortrule (products, sortRule) {
    switch (sortRule.toLowerCase()) {
        case "name":
            return products.sort(function (a, b) {
                if (a.name > b.name) { return 1 };
                if (a.name < b.name) { return -1 };
                return 0;
            })
            break;
        case "id":
            return products.sort(function (a, b) {
                if (a.Id > b.Id) { return 1 };
                if (a.Id < b.Id) { return -1 };
                return 0;
            })
            break;
        case "price":
            return products.sort(function (a, b) {
                if (a.price > b.price) { return 1 };
                if (a.price < b.price) { return -1 };
                return 0;
            })
            break;
        default:
            console.log("create new sort rule")
            return products;
            break;
   }
}

class Review {
    constructor(ID, author, date, comments, rating) {
        this.ID = ID
        this.author = author
        this.date = date
        this.comments = comments
        this.rating = rating
    }
  
    getID() {
        return this.ID
    }
    setID(ID) {
        this.ID = ID
    }
  
    getAuthor() {
        return this.author
    }
    setAuthor(author) {
        this.author = author
    }
  
    getDate() {
        return this.date
    }
    setDate(date) {
        this.date = date
    }
  
    getComment() {
        return this.comment
    }
    setComment(comment) {
        this.comment = comment
    }
  
    getRating() {
        return this.rating
    }
    setRating(rating) {
        this.rating = rating
    }
}



function Clothes(ID, Name, description, price, quantity, reviews, images, date, brand, sizes, material, color){
    AbstractProduct.call(this, ID, Name, description, price, quantity, reviews, images, date, brand, sizes)
    this.material = material
    this.color = color
}

Clothes.prototype = Object.create(AbstractProduct.prototype)
Clothes.prototype.constructor = Clothes

Clothes.prototype.getReviewByID = (id) => this.reviews.find(review => review.id === id)


Clothes.prototype.getImage = (image_key) => {
    if(image_key === 'undefined'){
        return this.images[0]
    }
    else{
        return this.images.find(e => e.images === image_key)
    }
}

Clothes.prototype.addSize = (size_new) => this.sizes = sizes.push(size_new)

Clothes.prototype.deleteSize = (size_key) => this.sizes.splice(IndexOf(this.sizes.find(e => e === size_key)), 1)

Clothes.prototype.addReview = (newreview) => this.reviews.push(newreview)

Clothes.prototype.deleteReview = (rev_id) => this.reviews.splice(IndexOf(this.reviews.find(e => e === rev_id)), 1)

Clothes.prototype.getAverageRating = () => {
    averagerating = {service: 0, price: 0, value: 0, quality: 0}
    let a = 0
    for(let i = 0; i < this.reviews.rating.length; i++){
        a += this.reviews.rating.service[i]
    }
    averagerating.service = a / this.reviews.rating.length
    a = 0


    for(let i = 0; i < this.reviews.rating.length; i++){
        a += this.reviews.rating.price[i]
    }
    averagerating.price = a / this.reviews.rating.length
    a = 0


    for(let i = 0; i < this.reviews.rating.length; i++){
        a += this.reviews.rating.value[i]
    }
    averagerating.value = a / this.reviews.rating.length
    a = 0


    for(let i = 0; i < this.reviews.rating.length; i++){
        a += this.reviews.rating.quality[i]
    }
    averagerating.quality = a / this.reviews.rating.length


    return averagerating
}

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

function Electronics(ID, Name, description, price, quantity, reviews, images, date, brand, sizes, warranty, power){
    AbstractProduct.call(this, ID, Name, description, price, quantity, reviews, images, date, brand, sizes)
    this.warranty = warranty
    this.power = power
}

Electronics.prototype = Object.create(AbstractProduct.prototype)
Electronics.prototype.constructor = Electronics


Electronics.prototype.getReviewByID = (id) => this.reviews.find(review => review.id === id)


Electronics.prototype.getImage = (image_key) => {
    if(image_key === 'undefined'){
        return this.images[0]
    }
    else{
        return this.images.find(e => e.images === image_key)
    }
}


Electronics.prototype.addSize = (size_new) => this.sizes = sizes.push(size_new)
Electronics.prototype.deleteSize = (size_key) => this.sizes.splice(IndexOf(this.sizes.find(e => e === size_key)), 1)


Electronics.prototype.addReview = (newreview) => this.reviews.push(newreview)
Electronics.prototype.deleteReview = (rev_id) => this.reviews.splice(IndexOf(this.reviews.find(e => e === rev_id)), 1)


Electronics.prototype.getAverageRating = () => {
    averagerating = {service: 0, price: 0, value: 0, quality: 0}
    let a = 0
    for(let i = 0; i < this.reviews.rating.length; i++){
        a += this.reviews.rating.service[i]
    }
    averagerating.service = a / this.reviews.rating.length
    a = 0


    for(let i = 0; i < this.reviews.rating.length; i++){
        a += this.reviews.rating.price[i]
    }
    averagerating.price = a / this.reviews.rating.length
    a = 0


    for(let i = 0; i < this.reviews.rating.length; i++){
        a += this.reviews.rating.value[i]
    }
    averagerating.value = a / this.reviews.rating.length
    a = 0


    for(let i = 0; i < this.reviews.rating.length; i++){
        a += this.reviews.rating.quality[i]
    }
    averagerating.quality = a / this.reviews.rating.length


    return averagerating
}

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

// Tests

//const abstract = new AbstractProduct()

const tshirt = new Clothes(1, 'Gym', 'for the gym', 10.99, 1000, [], [], '', 'ghnhg', [], 'cotton', 'black')

tshirt.getFullInformation()

tshirt.getPriceForQuantity(5)
