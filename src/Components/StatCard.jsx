import PropTypes from "prop-types";
import AOS from 'aos';
import 'aos/dist/aos.css';  // You can also use <link> for styles// ..
AOS.init();

const StatCard = ({ bg, data, description, image, title }) => {

    return (
        <div data-aos="zoom-out" className={`py-3 px-3  w-11/12 md:w-full items-start md:gap-4 justify-self-center justify-between ${bg} rounded-lg`}>
            <div className="flex justify-around">
                <img className="w-[120px] h-[120px] rounded-full"
                    src={image} />
                <div className="flex items-center gap-4">
                    <p className="special text-5xl">{data}</p>
                    <p className=" md:text-xl">{title}</p>
                </div>
            </div>
            <p>{description}</p>
        </div>
    );
};

StatCard.propTypes = {
    description: PropTypes.string,
    data: PropTypes.number,
    bg: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
}

export default StatCard;