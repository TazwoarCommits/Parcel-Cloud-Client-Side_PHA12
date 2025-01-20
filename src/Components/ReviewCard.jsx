import PropTypes from "prop-types";

const ReviewCard = ({ singleReview }) => {
    const {reviewers_photo , reviewers_name , createdAt , review , rating} = {singleReview } ;

    return (
        <div className="p-2 border-2 border-red-700 rounded-xl">
            <div className="flex items-center gap-2">
                <img className="w-[35px] h-[35px] rounded-full"
                    src={reviewers_photo}/>
                <div>
                    <h4>{reviewers_name}</h4>
                    <p className="text-xs">{createdAt}</p>
                </div>
            </div>
            <div>
                <p>{rating}</p>
                <p>{review}</p>
            </div>
        </div>
    );
};

ReviewCard.propTypes = {
    singleReview : PropTypes.object,
}

export default ReviewCard;