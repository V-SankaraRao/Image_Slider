import React, { useState, useEffect } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import './App.css';

const url = "https://dummyjson.com/products?limit=5";

function App() {
  const [images, setImages] = useState([]);
  const [curImage, setCurImage] = useState(0);

  function leftHandler() {
    setCurImage(curImage === 0 ? 4 : curImage - 1);
  }

  function rightHandler() {
    setCurImage(curImage === 4 ? 0 : curImage + 1);
  }

  async function fetchData() {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.products) {
        setImages(data.products);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (url !== "") {
      fetchData();
    }
  }, []); 

  return (
    <> <h1>Image Slider</h1>
    <div className="App">
      <BsArrowLeftCircleFill className='larrow arrow' onClick={leftHandler} />
      {images.map((img, i) => (
        <img
          src={img.thumbnail}
          key={img.id}
          className={i === curImage ? 'current-image' : 'current-image inactive'}
          alt={`Product ${i}`}
        />
      ))}
      <BsArrowRightCircleFill className='rarrow arrow' onClick={rightHandler} />
      <span className='circles'>
        {images.map((_, i) => (
          <button
            key={i}
            className={curImage===i?"active-circle":"" }id="indicator"
          />
        ))}
      </span>
    </div> </>
  );
}

export default App;
