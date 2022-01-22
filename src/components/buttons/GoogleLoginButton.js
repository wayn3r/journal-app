export const GoogleLoginButton = ({ onClick }) => {
    return (
        <button className='google-button' onClick={onClick}>
            <div className='google-icon-wrapper'>
                <img
                    className='google-icon'
                    src='https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png'
                    alt='google button'
                />
            </div>
            <p className='button-text'>
                <b>Sign in with google</b>
            </p>
        </button>
    )
}
