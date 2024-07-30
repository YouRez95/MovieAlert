import useAuth from "../hooks/useAuth";
import { BADGES } from "../data/badges";

export default function ProfileMe() {
  const { user } = useAuth();

  return (
    <div className="w-[90vw] sm:w-fit md:w-full flex flex-col gap-5 items-center">
      <div className="grid grid-cols-3 gap-4 items-center w-full md:w-[60%]">
        <label htmlFor="email" className="font-primary flex-1">
          Email:
        </label>
        <input
          type="email"
          id="email"
          disabled
          placeholder={user.email}
          className="border px-2 py-1 font-secondary flex-1 col-span-2"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 items-center w-full md:w-[60%]">
        <label htmlFor="email" className="font-primary">
          First name:
        </label>
        <input
          type="email"
          id="email"
          disabled
          placeholder={user.firstName}
          className="border px-2 py-1 font-secondary col-span-2"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 items-center w-full md:w-[60%]">
        <label htmlFor="email" className="font-primary">
          Last name:
        </label>
        <input
          type="email"
          id="email"
          disabled
          placeholder={user.lastName}
          className="border px-2 py-1 font-secondary col-span-2"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 items-center w-full md:w-[60%]">
        <label htmlFor="email" className="font-primary">
          Movies viewed:
        </label>
        <input
          type="email"
          id="email"
          disabled
          placeholder={user.moviesViewed}
          className="border px-2 py-1 font-secondary col-span-2"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 items-center w-full md:w-[60%]">
        <label htmlFor="email" className="font-primary">
          Movies submitted:
        </label>
        <input
          type="email"
          id="email"
          disabled
          placeholder={user.moviesSubmitted}
          className="border px-2 py-1 font-secondary col-span-2"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 items-center w-full md:w-[60%]">
        <span className="font-primary">Badges:</span>
        <div className="font-secondary col-span-2 flex gap-1">
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
