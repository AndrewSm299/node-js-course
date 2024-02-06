// spoiler: https://pastebin.com/2nEJvk04


interface isBigObject {
    [key: string]: {
            [key: string]: number | string | isBigObject
        };
    };

let a: isBigObject = { hello: {cvalue: 1}, world: { cvalue: { yay: { cvalue: "2" } } } }

function summ(a: isBigObject): number {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (typeof elem === undefined) return 2022;
        if (typeof elem?.cvalue === 'string') return +elem.cvalue || 2022;
        if (typeof elem?.cvalue == 'object') return summ(elem.cvalue);
        else return elem?.cvalue;
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}

console.log(summ(a))

// - про guards: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards
// - про truthiness narrowing: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#truthiness-narrowing
// - про control flow analysis: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#control-flow-analysis