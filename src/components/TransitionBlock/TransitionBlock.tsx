import React from 'react';
import dayjs from 'dayjs';
import './transitionBlock.css';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import Spinner from "../Spinner/Spinner";

interface Props {
    time: string;
    id:string;
    category:string;
    type: string;
    amount: number;
    onOpen:() => void;
    onDelete: () => void;
}

const TransitionBlock:React.FC<Props> = (props) => {
    const deleteLoading = useSelector((state:RootState) => state.homeReducer.deleteLoading);


    let btn = (
        <div>
            <button onClick={props.onOpen} className='btn btn-primary me-2'>Edit</button>
            <button onClick={props.onDelete} className='btn btn-danger'>Delete</button>
        </div>
    );

    if (deleteLoading && deleteLoading === props.id) {
        btn= <Spinner />
    }
    let amount = <></>;

    if(props.type === 'income') {
        amount = <div className='color-green'>+{props.amount}</div>
    } else if(props.type === 'expense') {
        amount = <div className='color-red'>-{props.amount}</div>
    }

    return (
        <div className='card d-flex flex-row justify-content-between my-4 mx-2 py-3 px-4'>
            <span>{dayjs(props.time).format('DD.MM.YYYY HH:mm:ss')}</span>
            <p>{props.category}</p>
            {amount}
            {btn}
        </div>
    );
};

export default TransitionBlock;