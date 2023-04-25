let Validator = {}

Validator.validateEmail = (email) => {
    let regexp = /^([^\.\+\-][\.\+a-z0-9-]{1,19})@([\.\!\$%&’\*\+\/=\?\^_a-z0-9\-]{1,15}).([a-z]{1,5})$/i
    return email.match(regexp) ? true : false
}

Validator.validatePhone = (phone) => {
    if(phone.length > 25){
        return null
    }
    let a = ''
    for(let i = 0; i < phone.length; i++){
        if(phone[i] != ' '| phone[i] != '-'){
            a = a + phone[i]
        }
    }
    let regexp = /^(\+?\d{2}?)(\(?\d{3}\)?)(\d{7})$/
    return a.match(regexp) ? true : false
}

Validator.validatePassword = (password)  => {
    let regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_]{8,}$/
    return password.match(regexp) ? true : false
}



// Tests

// validate email

console.log(Validator.validateEmail('fi@secondpart.end')) 
console.log(Validator.validateEmail('first-part@.se=cond%p.art.end'))
console.log(Validator.validateEmail('first.part@se=cond%part.r'))
console.log(Validator.validateEmail('f@secondart.end,')) 
console.log(Validator.validateEmail('first-part@.se=cond@part.end'))
console.log(Validator.validateEmail('-firstpart@.se=cond%.enddeded'))
console.log(Validator.validateEmail('firs_tpart@.se.en'))
console.log(Validator.validateEmail('firstpart@.se.enddeded'))

// validate phonenumber

console.log(Validator.validatePhone('+38 (099) 567 8901'))
console.log(Validator.validatePhone('+38 099 5 6 7 8 9  01'))
console.log(Validator.validatePhone('(09-9) 567-890-1'))
console.log(Validator.validatePhone('--  (099) 567 890-1'))
console.log(Validator.validatePhone('+38 (099) 567 8901 0'))
console.log(Validator.validatePhone('+38 099 a0000000'))
console.log(Validator.validatePhone('+38 (0989) 567 8901'))
console.log(Validator.validatePhone('+48 (0989) 567 8901'))

//validate password

console.log(Validator.validatePassword('C00l_Pass'))
console.log(Validator.validatePassword('SupperPas1'))
console.log(Validator.validatePassword('Cool_pass'))
console.log(Validator.validatePassword('C00l'))
