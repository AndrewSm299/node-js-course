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

console.log(mapObject(obj, transformer))