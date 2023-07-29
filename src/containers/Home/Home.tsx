import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import AddTransaction from "../../components/AddTransaction/AddTransaction";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {deleteTransition, fetchTransitions} from "./homeSlice";
import TransitionBlock from "../../components/TransitionBlock/TransitionBlock";
import EditTransaction from "../../components/EditTransaction/EditTransaction";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalEditOpen, setModalEditOpen] = useState(false);
    const dispatch:AppDispatch = useDispatch();
    const transitions = useSelector((state:RootState) => state.homeReducer.transitions);
    const [index, setIndex] = useState('');
    const loading = useSelector((state:RootState) => state.homeReducer.getTransitions);

    useEffect(() => {
        dispatch(fetchTransitions());
    }, [dispatch]);
    
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenEditModal = (id: string) => {
        setModalEditOpen(true)
        setIndex(id);
    };

    const handleCloseEditModal = () => {
        setModalEditOpen(false);
    };
    const sortedTransitions = transitions.slice().sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    const totalAmount = sortedTransitions.reduce((acc, el) => {
        if (el.type === 'income') {
            return acc + el.amount;
        } else if (el.type === 'expense') {
            return acc - el.amount;
        }
        return acc;
    }, 0);

    let block = (
        <div className='container'>
            <h4 className='my-3'>Total: {totalAmount} KGS</h4>
            {sortedTransitions.map((el) => (
                <TransitionBlock
                    key={el.id}
                    id={el.id}
                    time={el.time}
                    category={el.category}
                    type={el.type}
                    amount={el.amount}
                    onOpen={() => handleOpenEditModal(el.id)}
                    onDelete={() => onDelete(el.id)}
                />
            ))}
        </div>
    );

    if (loading) {
        block = <Spinner />
    }

    const onDelete = async(id : string) => {
        if (window.confirm(`Do you want to delete task?`)) {
            await dispatch(deleteTransition(id));
            await dispatch(fetchTransitions());
        }
    };

    return (
        <div>
          <NavBar onOpen={handleOpenModal} text={'transaction'}/>
            {block}
            {isModalOpen && (
                <AddTransaction onClose={handleCloseModal}/>
            )}
            {isModalEditOpen && (
                <EditTransaction onClose={handleCloseEditModal} id={index} />
            )}

        </div>
    );
};

export default Home;