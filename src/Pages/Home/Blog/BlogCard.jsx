
const BlogCard = ({blog}) => {
    const {title,image,date,description} = blog;
    return (
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img
          className="w-[287px] h-[177px]"
            src={image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="text-gray-400 font-medium">Date: {date}</p>
          <hr />
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    );
};

export default BlogCard;