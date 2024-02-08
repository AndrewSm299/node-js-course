// Напишите функцию mapObject, которая
// в чем-то очень похожа на функцию map для массивов.

// Эта функция должна принимать объект джаваскрипта
// и функцию transformer, которую нужно применить к каждому из полей того объекта, 
// ...а из результата применения функции transformer к каждому полю входящего объекта
// собрать новый объект и вернуть его.

// Так например можно будет замэппить объект типа 
// { "roma" : 5, "vasya": 2 } оценок студентов
// на функцию вроде (x) => x > 2
// { "roma": true, "vasya": false } зачетов студентов

// Понятное дело для описания сигнатуры mapObject надо будет юзать
// 1) дженерики с несколькими параметрами-типами
// 2) такую штуку как Record (globalThis.Record, если быть точным ;) )

let obj : object = { "roma" : 5, "vasya": 2 }

function transformer(x){
    return x > 2 ? true : false
}

function mapObject(data: object, transformer: Function): object{
    const keys: number[] = +Object.keys(obj);
    for (let i = 0; i < keys.length; i++){
        let note = keys[i]
        transformer(note)
    }
    return data
}