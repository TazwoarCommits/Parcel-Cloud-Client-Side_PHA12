import PropTypes from "prop-types";
import { LuSparkles } from "react-icons/lu";

const FeaturedCard = ({ title, description, icon }) => {
    return (
        <div className={`py-6 px-3 flex flex-row-reverse  items-start md:gap-4 justify-self-center border-2 justify-between`}>
            <div className="rounded-full border-2 border-amber-400 p-1">
                <img className="w-[60px] rounded-full"
                src={icon} />
            </div>
            <div className="mt-6 w-9/12">
                <h4 className="text-xl md:text-3xl font-semibold flex items-center gap-2">
                    <LuSparkles className="text-amber-800/85 text-lg md:text-xl font-extrabold" /> {title}</h4>
                <p className="ml-6">{description}</p>
            </div>
        </div>
    );
};

FeaturedCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
}

export default FeaturedCard;