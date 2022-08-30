import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";
import {NoteType} from "../components/notes/addNoteForm/AddNoteForm";

export const DataContext = createContext<ProviderValueType>({} as ProviderValueType);

export const DataProvider = ({children}: DataProviderPropsType) => {

    // Состояния для разных компонент, для поиска и уведомления

    const [notes, setNotes] = useState([] as NoteType[]);
    const [archivedNotes, setArchivedNotes] = useState([] as NoteType[]);
    const [deletedNotes, setDeletedNotes] = useState([] as NoteType[]);
    const [searchValue, setSearchValue] = useState('');
    const [alert, setAlert] = useState('');


    return(
        <DataContext.Provider value={{
            notes, setNotes, archivedNotes, setArchivedNotes,
            deletedNotes, setDeletedNotes, searchValue, setSearchValue,
            alert, setAlert
        }}>
            {children}
        </DataContext.Provider>
    )
}

type DataProviderPropsType = {
    children: ReactNode
}

export type ProviderValueType = {
    notes: NoteType[]
    archivedNotes: NoteType[]
    deletedNotes: NoteType[]
    setArchivedNotes: SetterType
    setNotes: SetterType
    setDeletedNotes: SetterType
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
    alert: string
    setAlert: Dispatch<SetStateAction<string>>
}

export type SetterType = Dispatch<SetStateAction<NoteType[]>>