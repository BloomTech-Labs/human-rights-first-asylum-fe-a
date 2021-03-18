import React from 'react';
import { Link } from 'react-router-dom';

const RenderProfileListPage = props => (
  <div>
    <p>
      <Link to="/">Home</Link>
    </p>
    {props.data.map(item => (
      <figure key={item.id}>
        <img src={item.avatarUrl} alt={item.name} />
        <figcaption>
          <h3>{item.name}</h3>
        </figcaption>
      </figure>
    ))}
  </div>
);

export default RenderProfileListPage;
