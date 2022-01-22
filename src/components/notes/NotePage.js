import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'hooks'
import { setNote, startDeleteNote } from 'actions'
import { Form } from '../forms'
import { NotesAppBar } from './NotesAppBar'

export const NotePage = () => {
    const dispatch = useDispatch()
    const { note } = useSelector(state => state.notes)
    const noteRef = useRef({ id: note.id, image: note.image })
    const [values, onChange, reset] = useForm(note)
    const { title, body } = values
    useEffect(() => {
        if (noteRef.current.id !== note.id || noteRef.current.image !== note.image) {
            reset()
            noteRef.current = { id: note.id, image: note.image }
        }
    }, [note.id, note.image, reset])
    useEffect(() => {
        dispatch(setNote(values.id, values))
    }, [values, dispatch])
    const handleDeleteEntry = () => dispatch(startDeleteNote(note.id))
    return (
        <div className='notes animate__animated animate__fadeIn animate__faster'>
            <NotesAppBar />

            <div className='notes__content'>
                <Form className='notes__form'>
                    <input
                        className='notes__input'
                        type='text'
                        label='Title'
                        onChange={onChange}
                        placeholder='Some awesome title'
                        name='title'
                        value={title}
                    />
                    <textarea
                        className='notes__textarea'
                        placeholder='What happened today?'
                        onChange={onChange}
                        name='body'
                        value={body}
                    ></textarea>
                    {note.image && (
                        <div className='notes__image'>
                            <img src={note.image} alt='Note' />
                        </div>
                    )}
                </Form>
            </div>
            <button
                className='button button--danger notes__delete-button'
                onClick={handleDeleteEntry}
            >
                Delete Entry
            </button>
        </div>
    )
}
