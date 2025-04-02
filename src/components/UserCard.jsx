import React from "react";

const UserCard = ({ users }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = users || {};
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <span>
          Age: {age} - Gender: {gender}
        </span>
        <p>{about}</p>
        <div className="card-actions justify-center my-4 mx-auto">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
