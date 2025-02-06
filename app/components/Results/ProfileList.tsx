import React from "react";
import Tooltip from "../Tooltip";
import {
  FaBriefcase,
  FaCompass,
  FaUser,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { User } from "../../utils/api";

export default function ProfileList({ profile }: { profile: User }) {
  return (
    <ul className="card-list">
      <li>
        <Tooltip text="User's Name">
          <FaUser color="rgb(239, 115, 115)" size={22} />
          {profile.name}
        </Tooltip>
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's Location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's Company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};
