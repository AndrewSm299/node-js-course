class AbstractProduct {
    constructor(ID, Name, description, price, quantity, reviews, images, date, brand){
      
    if(this.constructor === AbstractProduct){
        throw new Error('Cannot instantiate abstract class')
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
    }

}

AbstractProduct.prototype.getID = () =>  this.ID
AbstractProduct.prototype.setID = (id) => this.ID = id


AbstractProduct.prototype.getName = () => this.Name
AbstractProduct.prototype.setName = (name) => this.Name = name


AbstractProduct.prototype.getDescription = () => this.description
AbstractProduct.prototype.setDescription = (description) => this.description = description


AbstractProduct.prototype.getPrice = () => this.price
AbstractProduct.prototype.setPrice = (price) => this.price = price


AbstractProduct.prototype.getBrand = () => this.brand
AbstractProduct.prototype.setBrand = (brand) => this.brand = brand


AbstractProduct.prototype.getSizes = () => this.sizes
AbstractProduct.prototype.setSizes = (sizes) => this.sizes = sizes


AbstractProduct.prototype.getActiveSizes = () => this.activesizes
AbstractProduct.prototype.setActiveSizes = (activesizes) => this.activesizes = activesizes


AbstractProduct.prototype.getQuantity = () => this.quantity
AbstractProduct.prototype.setQuantity = (quantity) => this.quantity = quantity


AbstractProduct.prototype.getReviews = () => this.reviews
AbstractProduct.prototype.setReviews = (review) => this.reviews = review


AbstractProduct.prototype.getDate = () => this.date
AbstractProduct.prototype.setDate = (date) => this.date = date


AbstractProduct.prototype.getImages = () => this.images
AbstractProduct.prototype.setImages = (images) => this.images = images


AbstractProduct.prototype.getReviewByID = (id) => this.getReviews.find(review => review.id === id),


AbstractProduct.prototype.getImage = (image_key) => {
    if(image_key === 'undefined'){
        return this.images[0]
    }
    else{
        return this.images.find(e => e === image_key)
    }
},


AbstractProduct.prototype.addSize = (size_new) => this.sizes = sizes.push(size_new)

AbstractProduct.prototype.deleteSize = (size_key) => this.sizes.splice(IndexOf(this.sizes.find(e => e === size_key)), 1)



AbstractProduct.prototype.addReview = (newreview) => this.reviews.push(newreview)


AbstractProduct.prototype.deleteReview = (rev_id) => this.reviews.splice(IndexOf(this.reviews.find(e => e === rev_id)), 1)


AbstractProduct.prototype.getAverageRating = () => {
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

AbstractProduct.prototype.getFullInformation = () => console.log(`id = ${this.id}\nname = ${this.name}\ndescription = ${this.description}\nprice = ${this.price}\nquantity = ${this.quantity}\nreviews = ${this.reviews}\nimages = ${this.images}\ndate = ${this.date}\nbrand = ${this.brand}\ncolor = ${this.color}\nmaterial = ${this.material}`)
AbstractProduct.prototype.getPriceForQuantity = (int) => console.log(`$${this.price * int}`)

AbstractProduct.prototype.getterSetter = function(key, value) {
    if (value === undefined) {
        return this[key]
    }
    else {
        this[key] = value
    }
}

class Review {

    constructor(id, author, date, comment, service, price, value, quality) {
        this.id = id;
        this.author = author;
        this.date = date
        this.comment = comment;
        this.rating = new Map([
            ['service', service],
            ['price', price],
            ['value', value],
            ['quality', quality]
        ]);
    }
}

class Clothes extends AbstractProduct{
    constructor(color, material) {
        super(ID, Name, description, price, quantity, reviews, images, date, brand)
        this.material = material
        this.color = color
    }
}

Clothes.prototype.getmaterial = () => console.log(this.material)
Clothes.prototype.setmaterial = (newmaterial) => this.material = newmaterial

Clothes.prototype.getcolour = () => console.log(this.color)
Clothes.prototype.setcolor = () => this.color = newcolor

class Electronics extends AbstractProduct{
    constructor(warranty, power) {
        super(ID, Name, description, price, quantity, reviews, images, date, brand)
        this.warranty = warranty
        this.power = power
    }
}

Electronics.prototype.getwarranty = () => console.log(this.warranty)
Electronics.prototype.setwarranty = (newwarranty) => this.warranty = newwarranty

Electronics.prototype.getpower = () => console.log(this.power)
Electronics.prototype.setpower = (newpower) => this.power = newpower
