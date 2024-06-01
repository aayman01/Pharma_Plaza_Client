
const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="text-center mt-28">
            <h2 className="text-4xl font-bold mb-2">{heading}</h2>
            <p className="text-gray-500 text-sm mb-12">{subHeading}</p>
        </div>
    );
};

export default SectionTitle;