export const UserCard = ({ src, name }) => {
    return (
        <div className='user-card user-card--thubnail'>
            {src ? (
                <img
                    className='user-card__image'
                    src={src}
                    alt={name}
                    title={name}
                    loading='lazy'
                />
            ) : (
                <i className='far fa-moon' />
            )}
            <span className='user-card__name'>{name}</span>
        </div>
    )
}
