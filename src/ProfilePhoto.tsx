import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "./content";

/** Fixed portrait slot: swapping the image does not change the page layout. */
export default function ProfilePhoto() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="profile-photo">
      {profile.photo && !failed && (
        <img
          src={profile.photo}
          alt={profile.name}
          onError={() => setFailed(true)}
        />
      )}
      <span className="profile-monogram" aria-hidden="true">
        AR
        <span className="monogram-dot" />
      </span>
      <div className="photo-caption">
        <span>THE HUMAN BEHIND THE SYSTEMS</span>
        <strong>
          {profile.name}
          <ArrowUpRight size={20} />
        </strong>
      </div>
    </div>
  );
}
