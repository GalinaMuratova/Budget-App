import React, {ChangeEvent, useEffect, useState} from 'react';
import {fetchTransition, updateTransition} from "../../containers/Home/homeSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {Expense, Income} from "../../constants";
import Spinner from "../Spinner/Spinner";

interface Props {
    onClose: () => void;
    id: string;
}

const EditTransaction:React.FC<Props> = ({onClose, id}) => {
    const dispatch:AppDispatch = useDispatch();
    const [info, setInfo] = useState<ITrans>({time: '', type: '', category: '', amount: 0 });
    const transition = useSelector((state:RootState) => state.homeReducer.transition);
    const editLoading = useSelector((state:RootState) => state.homeReducer.editLoading);

    useEffect(() => {
        dispatch(fetchTransition(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (transition !== null ) {
            setInfo(transition)
        }
    }, [transition])

    const submit = async(e:React.FormEvent) => {
        e.preventDefault();
        if (id && info) {
            await dispatch(updateTransition({ id, info }));
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

    let options = <></>;

    if (info.type === 'income') {
        options = <>
            {Income.map((el) => (
                <option key={el.id} value={el.title}>{el.title}</option>
            ))}
        </>
    } else if (info.type === 'expense') {
        options = <>
            {Expense.map((el) => (
                <option key={el.id} value={el.title}>{el.title}</option>
            ))}
        </>
    }

    let btn = (
        <>
            <button className='col-5 me-3 btn btn-primary' type='submit'>Edit</button>
            <button className='col-5 btn btn-secondary' onClick={onClose}>Cancel</button>
        </>
    );

    if (editLoading) {
        btn = <Spinner />
    }

    return (
        <div>
            <div className='modal-block'>
                <form className='form-block' onSubmit={submit}>
                    <h3 className='text-center'>Edit transitions</h3>
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
                    <select
                        id='category'
                        name='category'
                        onChange={change}
                        value={info.category}
                        required
                        className='form-select my-4'>
                        <option value=''>Select category</option>
                        {options}
                    </select>
                    <input
                        type='number'
                        id='amount'
                        name='amount'
                        onChange={change}
                        value={info.amount}
                        required
                        className='form-control mb-5'/>
                    {btn}
                </form>
            </div>
        </div>
    );
};

export default EditTransaction;