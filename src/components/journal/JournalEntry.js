import { useDispatch } from 'react-redux'
import { setNote } from 'actions'

const placeholder =
    'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'

export const JournalEntry = ({ id, image, title, body, date }) => {
    const _date = new Date(date)
    const dispatch = useDispatch()
    return (
        <div
            className='journal__entry cursor animate__animated animate__fadeIn'
            onClick={() => dispatch(setNote(id, { image, title, body, date }))}
        >
            <div
                className='journal__entry-picture'
                style={{
                    backgroundImage: `url(${image || placeholder})`,
                }}
            />
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>{title}</p>
                <p className='journal__entry-content'>{body}</p>
            </div>
            <div className='journal__entry-date-box'>
                <span>{_date.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                <h4>{_date.getDate()}</h4>
            </div>
        </div>
    )
}
