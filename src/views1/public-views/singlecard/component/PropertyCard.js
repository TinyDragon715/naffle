import '../css/PropertyCard.css';

const PropertyCard = (props) => {
    const data = props.data;
    return(
        <>
        <div id='PropertyCard'>
            <span className="PropertyCardCaption">{data.title}</span>
            <span>{data.caption}</span>
            <span>{data.text}</span>
        </div>
        </>
    )
}

export default PropertyCard;