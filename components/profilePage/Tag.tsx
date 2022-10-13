import React from "react";

type TagProps = {};

const Tag: React.FC<TagProps> = () => {
  return (
    <div className="inline-flex ml-8 mt-8">
      <div className="flex-1 text-center px-4 py-2 m-2">
        <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
          <img
            className="object-cover w-full h-full hover:scale-110 transition-transform duration-200 ease-out"
            src="https://media.istockphoto.com/photos/fun-and-party-in-office-picture-id645796196"
          />
        </div>
        <h1 className="pt-16 text-base font-semibold text-gray-900">Fun</h1>
      </div>

      <div className="flex-1 text-center px-4 py-2 m-2">
        <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
          <img
            className="object-cover w-full h-full hover:scale-110 transition-transform duration-200 ease-out"
            src="https://res.cloudinary.com/grohealth/image/upload/$wpsize_!_cld_full!,w_2308,h_1299,c_scale/v1588090907/iStock-1001927840.jpg"
          />
        </div>
        <h1 className="pt-16 text-base font-semibold text-gray-900">Travel</h1>
      </div>

      <div className="flex-1 text-center px-4 py-2 m-2">
        <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
          <img
            className="object-cover w-full h-full hover:scale-110 transition-transform duration-200 ease-out"
            src="https://img2.mashed.com/img/gallery/the-ultimate-list-of-your-favorite-fast-food-copycat-recipes/l-intro-1603229426.jpg"
          />
        </div>
        <h1 className="pt-16 text-base font-semibold text-gray-900">Food</h1>
      </div>

      <div className="flex-1 text-center px-4 py-2 m-2">
        <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
          <img
            className="object-cover w-full h-full hover:scale-110 transition-transform duration-200 ease-out"
            src="https://living.medicareful.com/images/posts/ways-seniors-can-start-a-photography-hobby.jpg"
          />
        </div>
        <h1 className="pt-16 text-base font-semibold text-gray-900">Hobby</h1>
      </div>

      <div className="flex-1 text-center px-4 py-2 m-2">
        <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
          <img
            className="object-cover w-full h-full hover:scale-110 transition-transform duration-200 ease-out"
            src="https://broadly.com/wp-content/uploads/2018/07/Improve-Work-Performance.jpeg"
          />
        </div>
        <h1 className="pt-16 text-base font-semibold text-gray-900">My Work</h1>
      </div>
    </div>
  );
};
export default Tag;
