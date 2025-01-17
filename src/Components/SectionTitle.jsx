import PropTypes from "prop-types";

const SectionTitle = ({title}) => {
    return (
       <div>
         <div className="w-8/12 md:w-4/12 my-16 md:my-24 text-center mx-auto border-x-4 border border-x-amber-300 border-y-0">
            <h2 className="special text-5xl capitalize"
            >{title}</h2>
        </div>
       </div>
    );
};

SectionTitle.propTypes = {
    title : PropTypes.string.isRequired ,
}

export default SectionTitle;