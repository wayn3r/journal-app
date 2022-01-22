import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploadNoteImage } from 'actions'

export const NotesAppBar = () => {
    const dispatch = useDispatch()
    const file = useRef()
    const { note } = useSelector(state => state.notes)
    const date = new Date(note.date)
    const handleSave = () => {
        dispatch(startSaveNote(note))
    }
    const handlePictureClick = () => {
        file.current.click()
    }
    const handleFileChange = e => {
        const file = e.target.files[0]
        e.target.value = null
        if (file) {
            dispatch(startUploadNoteImage(file))
        }
    }
    return (
        <div className='notes__appbar'>
            <span>
                {date.toLocaleString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                })}
            </span>
            <input ref={file} type='file' hidden onChange={handleFileChange} />
            <div>
                <button className='button notes__appbar-button' onClick={handlePictureClick}>
                    Picture
                </button>
                <button className='button notes__appbar-button' onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
