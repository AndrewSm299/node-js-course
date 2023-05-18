function csvtext(csvText){
    let text = csvText
    .split('\n')
    .filter(str => {
            const replacedStr = str.replace('#', "");
            return replacedStr.length > 0
        })
    .map(row => {
        const [X, Y, City, Population ] = row.split(",");
        return {X, Y, City, Population };
    })
    .sort((a, b) => b.Population - a.Population)
    .slice(0, 10)
    .reduce((acc, city, index) => {
        let rating = index + 1
        let cityName = city.City.replace(/#/g, "").trim()
        if (!acc[cityName]) {
            acc[cityName] = {population: city.Population.replace(/#/g, ""), rating: rating};
        }
        return acc
    }, {})
    return function(){
        const string = Object.keys(text).map(city => `${city} (${text[city].rating} место в ТОП-10 самых крупных городов Украины, население ${text[city].population} человек)`).join('\n')
        return string
    }

}


// Tests

let example = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,

49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,`

console.log(csvtext(example)())
