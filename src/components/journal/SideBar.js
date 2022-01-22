import { useDispatch, useSelector } from 'react-redux'
import { startLogOut } from 'actions'
import { JournalEntries } from './JournalEntries'
import { UserCard } from './UserCard'
import { startAddNote } from 'actions/notes.actions'

export const SideBar = () => {
    const dispatch = useDispatch()
    const { name, photo } = useSelector(state => state.auth)
    const handleLogOut = () => {
        dispatch(startLogOut())
    }
    const handleAddNew = () => {
        dispatch(startAddNote())
    }
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <UserCard name={name} src={photo} />
                <button className="button link" onClick={handleLogOut}>
                    Log out
                </button>
            </div>
            <button
                className="button journal__new-entry"
                onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p>New entry</p>
            </button>

            <JournalEntries />
        </aside>
    )
}
