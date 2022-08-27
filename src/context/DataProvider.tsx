import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";
import {NoteType} from "../components/notes/addNoteForm/AddNoteForm";

export const DataContext = createContext<ProviderValueType>({} as ProviderValueType);

export const DataProvider = ({children}: DataProviderPropsType) => {

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
    setArchivedNotes: Dispatch<SetStateAction<NoteType[]>>
    setNotes: Dispatch<SetStateAction<NoteType[]>>
    setDeletedNotes: Dispatch<SetStateAction<NoteType[]>>
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
    alert: string
    setAlert: Dispatch<SetStateAction<string>>
}