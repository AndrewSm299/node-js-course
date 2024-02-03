/**
 *
 * @param {String} id id of  the product
 * @param {String} name name of the product
 * @param {String} description description of the product
 * @param {Number} price price of the product
 * @param {String} brand brand of the product
 * @param {Array.<string>} sizes sizes of the product
 * @param {String} activesizes active sizes of the product
 * @param {Integer} quantity quantity of the product
 * @param {Array.<object>} reviews reviews on the product
 * @param {Array.<string>} images images of the products
 *
*/


function Product(id, name, description, price, brand, sizes, activesize, quantity, date, images, reviews){
    this.ID = id,
    this.name = name,
    this.description = description,
    this.price = price,
    this.brand = brand,
    this.sizes = sizes,
    this.activesize = activesize,
    this.quantity = quantity,
    this.date = date,
    this.images = images,
    this.reviews = reviews,


    this.getID = () =>  this.ID
    this.setID = (id) => this.ID = id


    this.getName = () => this.name
    this.setName = (name) => this.name = name


    this.getDescription = () => this.description
    this.setDescription = (description) => this.description = description


    this.getPrice = () => this.price
    this.setPrice = (price) => this.price = price


    this.getBrand = () => this.brand
    this.setBrand = (brand) => this.brand = brand


    this.getSizes = () => this.sizes
    this.setSizes = (sizes) => this.sizes = sizes


    this.getActiveSize = () => this.activesize
    this.setActiveSize = (activesize) => this.activesize = activesize


    this.getQuantity = () => this.quantity
    this.setQuantity = (quantity) => this.quantity = quantity


    this.getReviews = () => this.reviews
    this.setReviews = (review) => this.reviews = review


    this.getDate = () => this.date
    this.setDate = (date) => this.date = date


    this.getImages = () => this.images
    this.setImages = (images) => this.images = images


    this.getReviewByID = (id) => this.getReviews.find(review => review.id === id),


    this.getImage = (image_key) => {
        if(image_key === 'undefined'){
            return this.images[0]
        }
        else{
            return this.images.find(e => e === image_key)
        }
    },


    this.addSize = (newsize) => {
        if(Array.isArray(this.sizes)) {
            this.sizes.push(newsize)
        }
        else{
            this.sizes = [newsize]
        }
    }
    
    this.deleteSize = (size_key) => {
        if (Array.isArray(this.sizes)) {
          const index = this.sizes.findIndex((size) => size === size_key)
          if (index !== -1) {
            this.sizes.splice(index, 1);
          }
        else{
            throw new Error('Enter index to delete size')
        }
        }
    }

    this.addReview = (newreview) => this.reviews.push(newreview)

    this.deleteReview = (rev_id) => this.reviews.splice(this.reviews.findIndex((review) => review.id === rev_id), 1)

    this.getAverageRating = () => {
        if (this.reviews.length === 0) {
          return null
        }
      
        const totalRatings = this.reviews.reduce(
          (acc, review) => {
            acc.service += review.rating[0];
            acc.price += review.rating[1];
            acc.value += review.rating[2];
            acc.quality += review.rating[3];
            return acc;
          },
          { service: 0, price: 0, value: 0, quality: 0 }
        )
      
        const averageRatings = {
          service: totalRatings.service / this.reviews.length,
          price: totalRatings.price / this.reviews.length,
          value: totalRatings.value / this.reviews.length,
          quality: totalRatings.quality / this.reviews.length,
        }
      
        return averageRatings
    }

}


/**
 *
 * @param {String} r_ID review's id
 * @param {String} author author
 * @param {String} comment on the product
 * @param {Array.<number>} rating of the product
 *
*/


function Reviews(r_ID, author, date, comment, rating){
    this.ID = r_ID,
    this.author = author,
    this.date = date,
    this.comment = comment,
    this.rating = rating


    this.setID = (ID) => this.ID = ID
    this.getID = () => this.ID


    this.setAuthor = (author) => this.author = author
    this.getAuthor = () => this.author


    this.setDate = (date) => this.date = date
    this.getDate = () => this.date = date


    this.setComment = (comment) => this.comment = comment
    this.getComment = () => this.comment


    this.setRating = (rating) => this.rating = {service: rating[0], price: rating[1], value: rating[2], quality: rating[3]}
    this.getRating = () => this.rating
}


/**
 *
 * @param {string} search text to search for in the decription
 *
 */


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


/**
 *
 * @param {string} sortRule defines the rule to sort products by
 *
 */


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

// TESTS

const product = new Product("123","Product Name","Product Description",10.99,"Brand",["S", "M", "L"],"M",50,"2023-05-16",["image1.jpg", "image2.jpg"],[])

// getters
console.log(product.getID()) // Output: 123
console.log(product.getName()) // Output: Product Name
console.log(product.getDescription()) // Output: Product Description
console.log(product.getPrice()) // Output: 10.99
console.log(product.getBrand()) // Output: Brand
console.log(product.getSizes()) // Output: ["S", "M", "L"]
console.log(product.getActiveSize()) // Output: M
console.log(product.getQuantity()) // Output: 50
console.log(product.getDate()) // Output: 2023-05-16
console.log(product.getImages()) // Output: ["image1.jpg", "image2.jpg"]
console.log(product.getReviews()) // Output: []

//setters

product.setID("456");
console.log(product.getID()); // 456

product.setName("New Product Name");
console.log(product.getName()); // New Product Name

product.setDescription("New Product Description");
console.log(product.getDescription()); // New Product Description

product.setPrice(19.99);
console.log(product.getPrice()); // 19.99

product.setBrand("New Brand");
console.log(product.getBrand()); // New Brand

product.setSizes(["M", "L"]);
console.log(product.getSizes()); // ["M", "L"]

product.setActiveSize("L");
console.log(product.getActiveSize()); // L

product.setQuantity(100);
console.log(product.getQuantity()); // 100

product.setDate("2023-05-17");
console.log(product.getDate()); // 2023-05-17

product.setImages(["image3.jpg", "image4.jpg"]);
console.log(product.getImages()); // ["image3.jpg", "image4.jpg"]

product.setReviews([{ id: "r1", author: "John", comment: "Great product!", rating: [5, 4, 4, 5] }]);
console.log(product.getReviews()); // [{ id: "r1", author: "John", comment: "Great product!", rating: [5, 4, 4, 5] }]

// add/delete size
product.addSize("XL")
console.log(product.getSizes()) // ["M", "L", "XL"]

product.deleteSize("M")
console.log(product.getSizes()) // ["L", "XL"]

// working with reviews

const review1 = new Reviews("r2", "John", "2023-05-16", "Great product!", [5, 4, 4, 5])
const review2 = new Reviews("r3", "Jane", "2023-05-17", "Not satisfied.", [2, 3, 2, 2])

product.addReview(review1)
product.addReview(review2)
console.log(product.getReviews()) // [review1, review2]

product.deleteReview("r1")
console.log(product.getReviews()) // [review2]

console.log(product.getAverageRating()) // {service: 3.5, price: 3.5, value: 3, quality: 3.5}
  
// search/sort product

const products = [
    new Product("1", "Product A", "Description A", 10.99, "Brand A", ["S", "M"], "M", 50, "2023-05-16", [], []),
    new Product("2", "Product B", "Description B", 19.99, "Brand B", ["M", "L"], "M", 30, "2023-05-17", [], []),
    new Product("3", "Product C", "Description C", 8.99, "Brand C", ["S", "L"], "S", 20, "2023-05-18", [], [])]

console.log(searchProducts(products, "product")) // Output: [product A, product B, product C]
console.log(searchProducts(products, "description b")) // Output: [product B]

console.log(sortrule(products, "name")) // Output: [product A, product B, product C]
console.log(sortrule(products, "id")) // Output: [product 1, product 2, product 3]
console.log(sortrule(products, "price")) // Output: [product C, product A, product B]
