import {NoteType} from "../components/notes/addNoteForm/AddNoteForm";

export const saveNotesToLocalStorage = (notes: NoteType[]) => {
    localStorage.setItem('google-keep-clone-notes', JSON.stringify(notes))
};
export const saveArchivedToLocalStorage = (notes: NoteType[]) => {
    localStorage.setItem('google-keep-clone-archived', JSON.stringify(notes))
};
export const saveDeletedToLocalStorage = (notes: NoteType[]) => {
    localStorage.setItem('google-keep-clone-deleted', JSON.stringify(notes))
};

export const getFromLocalStorage = (name: string, handler: (newValue: NoteType[]) => void) => {
    const value = localStorage.getItem(name)
    if (value) {
        handler(JSON.parse(value))
    }
}