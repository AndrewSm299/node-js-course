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

let obj: Record<string, any>= { "roma" : 5, "vasya": 2 }

function transformer(x: number) : boolean{
    return x > 2
}

function mapObject(data: Record<string, any>, transformer: Function): Record<string, any>{
    let keys: string[] = Object.keys(obj);
    for (let i = 0; i < keys.length; i++){
        let note = obj[keys[i]]
        note = transformer(note)
        data[keys[i]] = note;
    }
    return data
}

console.log(obj, transformer)