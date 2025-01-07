// key of typeof
const mmConvertsionTable = {
    mm: 1,
    cm: 10,
    m: 1e3,
    ke:1e6,
}

type unit = keyof typeof mmConvertsionTable;

function convertLength(value: number, from: unit, to: unit): number {
    return value * mmConvertsionTable[from] / mmConvertsionTable[to];
}

console.log(convertLength(1, "cm", "mm")); // 10

// keyof generic type
const get = <T, K extends keyof T>(obj: T, key: K): T[K] => {
    return obj[key];
}

type Human = {
    name: string;
    age: number;
}

const human: Human = {
    name: "John",
    age: 30,
}

console.log(get(human, "name")); // John

// as const
const names = ["John", "Jane", "Doe"] as const;

type Names = typeof names[number]; // "John" | "Jane" | "Doe"

// type predicates
type Mankind = {
    type: "human";
    name: string;
    age: number;
}

function isMankind(obj: any): obj is Mankind {
    if (obj == null) return false;

    return (
        obj.type === "human" &&
        typeof obj.name === "string" &&
        typeof obj.age === "number"
    );
}

// another way to use type predicates
type AxiousError = {
    response: {
        data: {
            message: string;
        }
    }
}

function isAxiosError(obj: any): obj is AxiousError {
    return obj != null && obj.response != null && obj.response.data != null && typeof obj.response.data.message === "string";
}

// type predicates with using asserts
function assertIsMankind(obj: any): asserts obj is Mankind {
    if (obj == null) {
        throw new Error("Object is null or undefined");
    }

    if (
        obj.type !== "human" ||
        typeof obj.name !== "string" ||
        typeof obj.age !== "number"
    ) {
        throw new Error("Object is not a human");
    }
}

function printMankind(obj: any) {
    assertIsMankind(obj);

    console.log(`${obj.name} is ${obj.age} years old`);
}

// variadic tuple types
type TupleToObject<T extends readonly any[]> = {
    [K in T[number]]: K;
}