import {useState} from "react";


export const useModalHook = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const toggleEditModal = () => {
        setModalIsOpen(!modalIsOpen)
        setIsEdit(true)
    }

    const toggleDeleteModal = () => {
        setModalIsOpen(!modalIsOpen)
        setIsEdit(false)
    }



    return {modalIsOpen, toggleEditModal, isEdit, toggleDeleteModal}
}