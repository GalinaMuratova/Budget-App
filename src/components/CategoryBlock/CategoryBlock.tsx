import React from 'react';
import Spinner from "../Spinner/Spinner";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

interface Props {
    type: string;
    category: string;
    onDelete: () => void;
    onOpen: () => void;
    id:string
}

const CategoryBlock:React.FC<Props> = ({type, category, onDelete, onOpen, id}) => {
    const deleteLoading = useSelector((state: RootState) => state.categoriesReducer.deleteLoading);
    let btn = (
        <div>
            <button onClick={onOpen} className='btn btn-primary me-3'>Edit</button>
            <button onClick={onDelete} className='btn btn-danger'>Delete</button>
        </div>
    );

    if (deleteLoading && deleteLoading === id) {
        btn= <Spinner />
    }

    let blockType = <></>

    if (type === 'income') {
        blockType = <p className='color-green'>{type}</p>
    } else if (type === 'expense') {
        blockType = <p className='color-red'>{type}</p>
    }

    return (
        <div className='d-flex flex-row justify-content-between border my-3 py-3 px-3'>
            {blockType}
            <p>{category}</p>
            {btn}
        </div>
    );
};

export default CategoryBlock;