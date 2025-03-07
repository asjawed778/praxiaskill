import { GoHome } from "react-icons/go";
import { PiGreaterThanBold } from "react-icons/pi";
import { RiArrowRightWideLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Headline({ title }) {
  return (
    <div className="flex w-full gap-2 items-center">
      <Link to="/">
        <GoHome size={20} />
      </Link>
      <RiArrowRightWideLine size={20} className="text-neutral-400" />
      <Link to="/blog" className="text-gray-600 font-semibold">
        Blogs
      </Link>
      <RiArrowRightWideLine size={20} className="text-neutral-400" />
      <h1 className="text-neutral-400 font-semibold text-xs">{title}</h1>
    </div>
  );
}
