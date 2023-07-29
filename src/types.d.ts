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

interface ICategory {
    type: string;
    category: string;
}

interface ICategory {
    category: string,
    type: string,
}

interface ICategoryForm {
    [id:string]: ICategory[]
}

interface ICategoryMut {
    id: string;
    type: string,
    category: string,
}

interface IUpdateCategory {
    id: string;
    info: ICategory;
}

