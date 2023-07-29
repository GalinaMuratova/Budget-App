import React, {ChangeEvent, useState} from 'react';
import './addTransaction.css';
import {Expense, Income} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {addTransition} from "../../containers/Home/homeSlice";
import Spinner from "../Spinner/Spinner";

interface Props {
    onClose: () => void;
}

const AddTransaction:React.FC<Props> = ({onClose}) => {
    const [info, setInfo] = useState<ITrans>({time: '', type: '', category: '', amount: 0 });
    const dispatch:AppDispatch = useDispatch();
    const loading = useSelector((state:RootState) => state.homeReducer.addTransitionLoading);
    const now = new Date();
    const createdAt = now.toISOString();

    const submit = async(e:React.FormEvent) => {
        e.preventDefault();

        await dispatch(addTransition(info));
        setInfo((prevState) => ({
            ...prevState,
            time:'',
            type: '',
            category: '',
            amount: 0
        }));
        onClose();
    };

    const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setInfo((prevState) => ({
            ...prevState,
            time: createdAt
        }));
    };

    let options = <></>

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
            <button type='submit' className='btn btn-primary col-6'>Send</button>
            <button onClick={onClose} className='btn btn-secondary col-6'>Close</button>
        </>
    );

    if (loading) {
        btn = <Spinner />
    }

    return (
        <div className='modal-block'>
            <form className='form-block' onSubmit={submit}>
                <h3 className='text-center'>Add transaction</h3>
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
                    required
                    className='form-control mb-5'/>
                {btn}
            </form>
        </div>
    );
};

export default AddTransaction;