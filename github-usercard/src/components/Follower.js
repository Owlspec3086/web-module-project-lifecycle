import React from "react";

export default function Follower(props) {
  return (
    <div>
      <h3>{props.follower.login}</h3>
      <img src={props.follower.avatar_url} alt="" />
      <a href={props.follower.html_url}> </a>
    </div>
  );
}
