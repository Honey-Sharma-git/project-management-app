import profilePic from "../assets/images/default-profile-pic.png";
import { FaUserAstronaut } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
export const MyAccountModal = ({ isAccModalShown }) => {
  return (
    <div
      className={`absolute top-8.5 shadow-xl p-3  rounded-lg bg-[var(--dialog-color-dark-navy)]  text-[var(--text-color-gray)] min-h-50 flex flex-col gap-3 w-[115%] transition-[ opacity 0.3s ease-in-out, transform 0.3s ease-in-out;] ${
        isAccModalShown ? "show" : "hide"
      }`}
    >
      <figure className="flex flex-row items-center justify-center gap-3 p-2  ">
        <div className="relative p-1">
          <img
            className="rounded-full h-10 object-cover aspect-square outline-2 outline-[var(--color-pink)] shadow-lg shadow-black/90 "
            src={profilePic}
            alt="User's profile picture."
          />
          <span
            title="Super Admin"
            className="text-yellow-300 absolute  bottom-0 right-0 font-bold text-xl bg-[var(--color-dark-navy)] hover:bg-black rounded-full "
          >
            <MdWorkspacePremium />
          </span>
        </div>
        <div>
          <figcaption>Hi Honey Sharma</figcaption>
        </div>
      </figure>
      <div className="px-2 border-b-2  border-dashed border-t-2 border-gray-500 ">
        <table className="w-full">
          <tr className="">
            <th className="text-xl py-2 text-[var(--color-pink)]">
              <FaUserAstronaut />
            </th>
            <td className="text-sm">superAdmin123</td>
          </tr>
          <tr className="">
            <th className="text-xl py-2 text-[var(--color-pink)]">
              <MdEmail />
            </th>
            <td className="text-sm">admin@gmail.com</td>
          </tr>
        </table>
      </div>
      <button className="bg-[var(--btn-color-purple)] text-[var(--text-color-gray)] p-1 rounded-lg shadow-lg cursor-pointer hover:bg-[var(--btn-hover-color-purple)]">
        Manage Profile
      </button>
    </div>
  );
};
