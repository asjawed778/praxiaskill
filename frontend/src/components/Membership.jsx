import girl1 from "/imgs/girl1.png";

export default function Membership() {
  return (
    <div className="relative text-white bg-red-600 flex items-center md:h-[200px] h-[170px] md:w-[670px] lg:w-[950px] my-5 p-5 mx-6 rounded-lg overflow-x-visible pr-16">

      <div className="flex flex-col gap-1 md:gap-5 text-sm mr-10">
        <h1 className="font-semibold mr-10 md:mr-0 text-sm md:text-xl lg:text-2xl">
          Why You should buy Abilita Membership?
        </h1>

        <p className="md:text-xs text-[10px] lg:text-sm flex flex-col gap-1 w-[70%] md:w-[100%]">
          <span>
            Teachers don't get lost in the grid view and have a dedicated Podium
            space.
          </span>
          <span>
            Teachers don't get lost in the grid view and have a dedicated Podium
            space.
          </span>
        </p>

        <button className="text-xs text-green-800 bg-white w-fit md:px-6 px-4 mt-1 md:py-2 py-1 rounded-lg">
          BUY NOW
        </button>
      </div>

      <img
        src={girl1}
        alt="girl"
        className="absolute md:-right-28 -right-20 bottom-0 md:w-96 w-72 md:h-fit h-52"
      />
    </div>
  );
}
