import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import AddCategory from "../../components/AddCategory/AddCategory";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {deleteCategory, fetchCategories} from "./categoriesSlice";
import CategoryBlock from "../../components/CategoryBlock/CategoryBlock";
import EditCategory from "../../components/EditCategory/EditCategory";
import Spinner from "../../components/Spinner/Spinner";

const Categories = () => {
    const [isModalEditOpen, setModalEditOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categoriesReducer.categories);
    const loading = useSelector((state:RootState) => state.categoriesReducer.getLoading);
    const [index, setIndex] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch, categories]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleEditOpenModal = (id: string) => {
        setModalEditOpen(true);
        setIndex(id);
    };

    const handleEditCloseModal = () => {
        setModalEditOpen(false);
    };

    let categoryBlock = (
        <div className='container'>
            {categories.map((el) => (
                <CategoryBlock
                    key={el.id}
                    id={el.id}
                    type={el.type}
                    category={el.category}
                    onDelete={() => onDelete(el.id)}
                    onOpen={() => handleEditOpenModal(el.id)}
                />
            ))}
        </div>
    );

    if (loading) {
        categoryBlock = <Spinner />;
    }

    const onDelete = async (id: string) => {
        if (window.confirm(`Do you want to delete task?`)) {
            await dispatch(deleteCategory(id));
            dispatch(fetchCategories());
        }
    };

    return (
        <div>
            <NavBar text={'categories'} onOpen={handleOpenModal}/>
            {categoryBlock}
            {isModalOpen && (
                <AddCategory onClose={handleCloseModal}/>
            )}
            {isModalEditOpen && (
                <EditCategory onClose={handleEditCloseModal} id={index}/>
            )}
        </div>
    );
};

export default Categories;