import { format } from "date-fns";
import PropTypes from "prop-types";
import { IoIosStar } from "react-icons/io";

const ReviewCard = ({ singleReview }) => {
    const {reviewersPhoto , reviewersName , createdAt , review , rating} = singleReview ;
    console.log(singleReview);

    return (
        <div className="p-2 border-2 border-gray-600 rounded-xl ">
            <div className="flex items-center gap-2">
                <img className="w-[35px] h-[35px] rounded-full"
                    src={reviewersPhoto}/>
                <div>
                    <h4>{reviewersName}</h4>
                    <p className="text-xs">{format(new Date(createdAt) , "MM-dd-yyyy")}</p>
                </div>
            </div>
            <div className="my-2 text-base">
                <p className="flex items-center"><span className="font-medium">Rating :</span> <span className="flex items-center gap-1">{rating}<IoIosStar className="text-amber-500" /></span></p>
                <p><span className="font-medium">Review :</span> {review}</p>
            </div>
        </div>
    );
};

ReviewCard.propTypes = {
    singleReview : PropTypes.object,
}

export default ReviewCard;