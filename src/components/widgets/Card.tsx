const Card = ({ title, hideIfRender }) => {
    const hide = hideIfRender.length > 0;
    return (
        <>
            {!hide && (
                <div>
                    {title}
                </div>
            )
            }
        </>
    )
}

export default Card;