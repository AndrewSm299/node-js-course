class AbstractProduct {
constructor(id, name, description, price, quantity, reviews, images, date, brand) {
this.id = id
this.name name
this.description = description
this.price = price
this.quantity quantity
this.reviews = reviews
this.images images
this.date = date
this.brand
brand
// methods
getFullInformation() {
throw new Error('Subclass must implement abstract method.');
}
