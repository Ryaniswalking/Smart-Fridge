import { useState, useEffect, useRef } from "react";

const DigitalFrame = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const currentImageIndex = useRef(0);
  const imageRef = useRef(null)

  const loadImages = async () => {
    const response = await fetch("api/digital-frame/list");
    const imageList = await response.json();
    setImages(imageList);
  };

  const startSlideShow = () => {
    setInterval(() => {
      currentImageIndex.current =
        (currentImageIndex.current + 1) % images.length;
      setCurrentImage(images[currentImageIndex.current]);
    }, 25000);
  };

  const getPhotoSize = (src) => {
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;

      console.log(`Ratio: ${width/height}`)
      console.log(`Width: ${img.width}px`);
      console.log(`Height: ${img.height}px`);
    };
    img.src = src;


  };

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[0]);
      startSlideShow();
    }
  }, [images]);

  useEffect(() => {
    if (currentImage) {
      getPhotoSize(`api/digital-frame/${currentImage}`);
    }
  }, [currentImage]);

  return (
    <div className="digital-frame">
      {currentImage && (
        <img 
        ref={imageRef}
        src={`api/digital-frame/${currentImage}`} alt="Slideshow" />
      )}
    </div>
  );
};

export default DigitalFrame;
