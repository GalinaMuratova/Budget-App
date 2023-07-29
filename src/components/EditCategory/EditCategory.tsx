import React, {ChangeEvent, useEffect, useState} from 'react';
import {AppDispatch, RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategory, updateCategory} from "../../containers/Categories/categoriesSlice";
import Spinner from "../Spinner/Spinner";

interface Props {
    onClose: () => void;
    id: string;
}

const EditCategory:React.FC<Props> = ({onClose, id}) => {
    const dispatch: AppDispatch = useDispatch();
    const [info, setInfo] = useState<ICategory>({category:'', type: ''});
    const category = useSelector((state:RootState) => state.categoriesReducer.category);
    const editLoading = useSelector((state:RootState) => state.categoriesReducer.editLoading);

    useEffect(() => {
        console.log(id)
        dispatch(fetchCategory(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (category !== null ) {
            setInfo(category)
        }
    }, [category]);

    const submit = async (e:React.FormEvent) => {
        e.preventDefault();
        if (id && info) {
            await dispatch(updateCategory({ id, info }));
            onClose();
        }
    };

    const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    let btn = (
        <div className='d-flex justify-content-around'>
            <button type='submit' className='btn btn-primary'>Add</button>
            <button className='btn btn-secondary' onClick={onClose}>Cancel</button>
        </div>
    );

    if (editLoading) {
        btn = <Spinner />
    }


    return (
        <div className='modal-block'>
            <form className='form-block' onSubmit={submit}>
                <h3 className='text-center'>Edit category</h3>
                <select
                    id='type'
                    name='type'
                    onChange={change}
                    value={info.type}
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
                    value={info.category}
                    required
                    className='form-control mb-3'
                />
                {btn}
            </form>
        </div>
    );
};

export default EditCategory;