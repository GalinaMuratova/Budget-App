interface ITrans {
    time: string
    type:string;
    category:string;
    amount: number
}

interface ITransMut {
    id: string;
    time: string
    type:string;
    category:string;
    amount: number
}

interface IUpdateTrans {
    id: string;
    info: ITrans;
}