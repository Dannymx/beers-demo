import React, { useState, useEffect } from "react";
import Link from "next/link";

const ImageCard = (props) => {
  const [editing, setEditing] = useState(false);
  const [beerName, setBeerName] = useState(props.beer.name);

  const handleEditing = () => {
    props.setActiveBeer(props.beer_index);
  };

  const handleChange = (value) => {
    setBeerName(value);
  };

  useEffect(() => {
    setEditing(!editing);
  }, [props.setActiveBeer]);

  const handleSubmit = () => {};

  return (
    <div className="rounded overflow-hidden shadow-lg inline-block">
      <img
        className="w-full object-cover"
        src={getImageUrl(props.beer)}
        alt=""
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {editing && props.beer_index === props.activeBeer ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="text"
              value={beerName}
              onChange={(e) => handleChange(e.target.value)}
            ></input>
          ) : (
            <a className="cursor-pointer" onClick={() => handleEditing()}>
              {beerName}
            </a>
          )}
        </div>
      </div>
      <style jsx>
        {`
          img {
            height: 30rem;
          }
        `}
      </style>
    </div>
  );
};

const getImageUrl = (beer) => {
  return `${process.env.NEXT_PUBLIC_API_BASEURL}${beer.image.url}`;
};

export default ImageCard;
