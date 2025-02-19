import PropTypes from "prop-types";
import { FaStar, FaTrophy } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const TopDeliveryManCard = ({ deliveryman, idx }) => {
    const { delivered, photo, review, name } = deliveryman;
    return (
        <div data-aos="fade-up"
     data-aos-duration={`${idx+1}000`}
        className="flex justify-between items-end bg-amber-600/20 dark:bg-amber-200/80 p-4 my-8 rounded-lg relative">
            <div className="absolute top-0 left-0 p-4 bg-gray-600 rounded-b-full rounded-r-full">
                <p className="text-amber-300 flex items-center gap-2 special">
                    <span className="text-amber-300"><FaTrophy /></span>
                    <span className="text-2xl">{idx + 1}</span></p>
            </div>
            <div className="mt-16">
                <h4 className="dark:text-black special text-4xl">{name}</h4>
                <div className="dark:text-gray-800">
                    <p className="flex items-center gap-1">{review} <FaStar className="text-amber-300"></FaStar> with</p>
                    <p>{delivered} delivery</p>
                </div>
            </div>
            <img className="w-1/2 rounded-l-full rounded-r-full " src={photo} />
        </div>
    );
};

TopDeliveryManCard.propTypes = {
    deliveryman: PropTypes.object,
    idx : PropTypes.number
}

export default TopDeliveryManCard;