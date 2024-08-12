import { Carousel } from "@material-tailwind/react";
import banner from "../assets/banner.jpg"
 
export function Cateroy() {
  return (
    <div className="flex justify-center content-center items-center h-[60vh] px-[10%] my-32">
      <Carousel className="rounded-xl h-[600px] ">
      <div className="flex justify-start content-center">
      <img
        src="https://www.whiteteak.com/media/customimages/Homepage/Desktop/pendant_Decorative_Lighting_category_images.jpg"
        alt=""
        className="h-full w-full object-cover"
      />
      <img
        src="https://www.whiteteak.com/media/customimages/Homepage/Desktop/chandelier_Decorative_Lighting_category_images.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://www.whiteteak.com/media/customimages/Homepage/Desktop/floor_lamp_Decorative_Lighting_category_images.jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
      </div>
      <div className="flex justify-start content-center">
      <img
        src="https://www.whiteteak.com/media/customimages/Homepage/Desktop/pendant_Decorative_Lighting_category_images.jpg"
        alt=""
        className="h-full w-full object-cover"
      />
      <img
        src="https://www.whiteteak.com/media/customimages/Homepage/Desktop/chandelier_Decorative_Lighting_category_images.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://www.whiteteak.com/media/customimages/Homepage/Desktop/floor_lamp_Decorative_Lighting_category_images.jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
      </div>
      

      
    </Carousel>
    </div>
  );
}