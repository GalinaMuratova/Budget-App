import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {addCategory, fetchCategories} from "../../containers/Categories/categoriesSlice";

interface Props {
    onClose: () => void;
}

const innitial = {category:'', type: ''};

const AddCategory:React.FC<Props> = ({onClose}) => {
    const [categoryInfo, setCategoryInfo] = useState<ICategory>(innitial);
    const dispatch: AppDispatch = useDispatch();

    const submit = async (e:React.FormEvent) => {
        e.preventDefault();
        await dispatch(addCategory(categoryInfo));
        console.log(categoryInfo);
        setCategoryInfo((prevState) => ({
            ...prevState,
            type: '',
            category: '',
        }));
        onClose();
        dispatch(fetchCategories());
    };

    const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setCategoryInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className='modal-block'>
            <form className='form-block' onSubmit={submit}>
                <h3 className='text-center'>Add category</h3>
                <select
                    id='type'
                    name='type'
                    onChange={change}
                    value={categoryInfo.type}
                    required
                    className='form-select my-4'>
                    <option value=''>Select type</option>
                    <option value='income'>Income</option>
                    <option value='expense'>Expense</option>
                </select>
                <input
                    id='category'
                    name='category'
                    onChange={change}
                    value={categoryInfo.category}
                    required
                    className='form-control mb-3'
                />
                <div className='d-flex justify-content-around'>
                    <button type='submit' className='btn btn-primary'>Add</button>
                    <button className='btn btn-secondary' onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;