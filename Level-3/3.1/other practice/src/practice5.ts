// 1

type T = {}

type Func1 = (param: Partial<T>) => Required<T>

type Func2 = (param: Extract<T, { id?: string }>, fullT: (param: Partial<T>) => Required<T>) => void;

// 2


class Rectangle {
    
    w!: number;
    h!: number;
}
class Circle {
    radius!: number;
}

function наштамповать<SOMECLASS>(figure: new() => SOMECLASS, count: number)  {
    let a = []
    for (let i = 0; i < count; i++){
       a.push(new figure());
    }
    return a;
}

let a: Rectangle[] = наштамповать(Rectangle, 10);
let b: Circle[] = наштамповать(Circle, 20)