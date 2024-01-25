import React, { useState } from 'react';
import '../../../Styles/Components/ImageSlider.css';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';


/**
 * ImageSlider component for displaying images in a slider.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.images - Array of image URLs.
 * @returns {JSX.Element} - JSX element representing the ImageSlider component.
 */
const ImageSlider = ( props ) => {
  const [current, setCurrent] = useState(0);
  const length = props.images.length;


  /**
   * Function to move to the next slide.
   */
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  
    /**
   * Function to move to the previous slide.
   */
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };


  return (
    <>
    {(props.images).length > 0 &&
        <div className='slider'>
          <FaArrowAltCircleLeft className='arrows' onClick={prevSlide}/>
            <img src={props.images[current]} alt={current} className='image'/>
          <FaArrowAltCircleRight className='arrows' onClick={nextSlide}/>
        </div>
    }
    </>
  );
};

export default ImageSlider;
