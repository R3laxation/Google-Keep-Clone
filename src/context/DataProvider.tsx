import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";
import {NoteType} from "../components/notes/addNoteForm/AddNoteForm";

export const DataContext = createContext<ProviderValueType>({} as ProviderValueType);

export const DataProvider = ({children}: DataProviderPropsType) => {

    const [notes, setNotes] = useState([] as NoteType[]);
    const [archiveNotes, setArchiveNotes] = useState([] as NoteType[]);
    const [deletedNotes, setDeletedNotes] = useState([] as NoteType[]);

    return(
        <DataContext.Provider value={{
            notes, setNotes, archiveNotes, setArchiveNotes, deletedNotes, setDeletedNotes
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
    archiveNotes: NoteType[]
    deletedNotes: NoteType[]
    setArchiveNotes: Dispatch<SetStateAction<NoteType[]>>
    setNotes: Dispatch<SetStateAction<NoteType[]>>
    setDeletedNotes: Dispatch<SetStateAction<NoteType[]>>
}