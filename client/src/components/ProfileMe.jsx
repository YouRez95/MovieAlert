import useAuth from "../hooks/useAuth";
import badge1 from "../assets/Badge_01.png";
import badge2 from "../assets/Badge_02.png";
import badge3 from "../assets/Badge_03.png";
import badge4 from "../assets/Badge_04.png";

const BADGES = [
  { id: 1, badge: badge1, level: "Amateur" },
  { id: 2, badge: badge2, level: "Intermediate" },
  { id: 3, badge: badge3, level: "Advanced" },
  { id: 4, badge: badge4, level: "Expert" },
];

export default function ProfileMe() {
  const { user } = useAuth();

  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <div className="flex gap-10 items-center w-[60%]">
        <label htmlFor="email" className="font-primary flex-1">
          Email:
        </label>
        <input
          type="email"
          id="email"
          disabled
          placeholder={user.email}
          className="border px-2 py-1 font-secondary flex-1"
        />
      </div>
      <div className="flex gap-10 items-center w-[60%]">
        <label htmlFor="email" className="font-primary flex-1">
          First name:
        </label>
        <input
          type="email"
          id="email"
          disabled
          placeholder={user.firstName}
          className="border px-2 py-1 font-secondary flex-1"
        />
      </div>
      <div className="flex gap-10 items-center w-[60%]">
        <label htmlFor="email" className="font-primary flex-1">
          Last name:
        </label>
        <input
          type="email"
          id="email"
          disabled
          placeholder={user.lastName}
          className="border px-2 py-1 font-secondary flex-1"
        />
      </div>
      <div className="flex gap-10 items-center w-[60%]">
        <label htmlFor="email" className="font-primary flex-1">
          Movies viewed:
        </label>
        <input
          type="email"
          id="email"
          disabled
          placeholder={user.moviesViewed}
          className="border px-2 py-1 font-secondary flex-1"
        />
      </div>
      <div className="flex gap-10 items-center w-[60%]">
        <label htmlFor="email" className="font-primary flex-1">
          Movies submitted:
        </label>
        <input
          type="email"
          id="email"
          disabled
          placeholder={user.moviesSubmitted}
          className="border px-2 py-1 font-secondary flex-1"
        />
      </div>

      <div className="flex gap-10 items-center w-[60%]">
        <span className="font-primary flex-1">Badges:</span>
        <div className="font-secondary flex-1 flex gap-1">
          {BADGES.slice(0, user.badge).map((badge) => (
            <div
              key={badge.id}
              className="text-center flex-1 flex flex-col items-center border hover:scale-110 transition-all cursor-pointer"
            >
              <img src={badge.badge} alt={badge.level} className="w-[60px]" />
              <span>{badge.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
