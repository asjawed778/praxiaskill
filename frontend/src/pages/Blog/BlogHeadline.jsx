import { GoHome } from "react-icons/go";
import { PiGreaterThanBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { RiArrowRightWideLine } from "react-icons/ri";

export default function BlogHeadline() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 items-center">
        <Link to="/">
          <GoHome size={20} />
        </Link>
        <RiArrowRightWideLine color="grey" size={20} />
        <Link to="/blog" className="text-gray-500 font-semibold">
          Blogs
        </Link>
      </div>

      <p className="font-bold text-[15px] md:text-2xl lg:text-3xl space-x-1 whitespace-nowrap">
        <span className="text-[var(--color-primary)]">Popular Feeds.</span>
        <span className="text-gray-600">Click On The Post And Enjoy.</span>
      </p>
    </div>
  );
}
