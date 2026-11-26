import React from 'react';
import { Carousel } from "antd";
import casa1 from "../assets/casa1.jpg";
import casa2 from "../assets/casa2.jpg";
import casa3 from "../assets/casa3.jpg";

const imagens = [casa1, casa2, casa3];

const Home = () => (
    <div className='mt-6 '>
        <div className="flex justify-center text-4xl font-bold p-6">
           Encontre o lugar onde sua proxima história começa 
        </div>



    <Carousel autoplay arrows>
      {imagens.map((src, index) => (
        <div key={index}>
          <img
            src={src}
            alt={`Imóvel ${index + 1}`}
            className="w-full h-[720px] object-cover"
          />
        </div>
      ))}
    </Carousel>
  </div>
);
 
export default Home;