import { useSelector } from 'react-redux'
import { NotePage } from 'components/notes/NotePage'

import { NothingSelected } from './NothingSelected'
import { SideBar } from './SideBar'

export const JournalPage = () => {
    const { active } = useSelector(state => state.notes)
    return (
        <div className='journal animate__animated animate__fadeIn animate__faster'>
            <SideBar />
            <main className='journal__main-content'>
                {active ? <NotePage /> : <NothingSelected />}
            </main>
        </div>
    )
}
