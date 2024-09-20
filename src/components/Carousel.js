import React, { useState, useEffect } from 'react';
import './Carousel.css';
import { Carousel } from 'react-bootstrap';

const images = [
  'azaria-morake-3.jpg',  
  'azaria-morake-2.jpg',
  'azaria-morake-1.jpg'
];

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
    }, 3000);

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  return (
  <Carousel>
    <div className="carousel">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-item ${index === currentIndex ? 'active' : ''}`}   >
          <img src={image} alt={`Slide ${index}`} className="carousel-img" />
        </div>
      ))}
    </div>
  </Carousel>
  );
};

export default CarouselComponent;
