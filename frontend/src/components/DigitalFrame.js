import { useState, useEffect, useRef } from "react";

const DigitalFrame = () => {
  const [veritcalPhotos, setVerticalPhotos] = useState([]);
  const [horizontalPhotos, setHorizontalPhotos] = useState([]);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [currentVertImages, setCurrentVertImages] = useState([]);
  const [isHorizontalMode, setIsHorizontalMode] = useState(true);
  const vertIndexRef = useRef(0);
  const horiIndexRef = useRef(0);
  const intervalRef = useRef(null);

  const loadImages = async () => {
    const response = await fetch("api/digital-frame/list");
    const photos = await response.json();
    setHorizontalPhotos(photos.horizontal);
    setVerticalPhotos(photos.vertical);
  };

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (horizontalPhotos.length > 0 && veritcalPhotos.length > 1) {
      // Show initial image
      setPrimaryImage(horizontalPhotos[0]);
      setIsHorizontalMode(true);

      intervalRef.current = setInterval(() => {
        setIsHorizontalMode((prevMode) => {
          if (!prevMode) {
            // Switch to horizontal mode
            const nextHoriIndex = horiIndexRef.current % horizontalPhotos.length;
            setPrimaryImage(horizontalPhotos[nextHoriIndex]);
            horiIndexRef.current++;
            return true;
          } else {
            // Switch to vertical mode
            const v1 = veritcalPhotos[vertIndexRef.current % veritcalPhotos.length];
            const v2 = veritcalPhotos[(vertIndexRef.current + 1) % veritcalPhotos.length];
            setCurrentVertImages([v1, v2]);
            vertIndexRef.current += 2;
            return false;
          }
        });
      }, 5000);

      return () => clearInterval(intervalRef.current);
    }
  }, [horizontalPhotos, veritcalPhotos]);

  return (
    <div className="digital-frame">
      {isHorizontalMode ? (
        primaryImage && (
          <img
            src={`api/digital-frame/${primaryImage}`}
            alt="Horizontal Slide"
          />
        )
      ) : (
        currentVertImages.length === 2 && (
          <div className="vertical-pair">
            <img
              src={`api/digital-frame/${currentVertImages[0]}`}
              alt="Vertical 1"
            />
            <img
              src={`api/digital-frame/${currentVertImages[1]}`}
              alt="Vertical 2"
            />
          </div>
        )
      )}
    </div>
  );
};

export default DigitalFrame;
