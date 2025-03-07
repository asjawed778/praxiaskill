import { useNavigate } from "react-router-dom";
import pageNotFoundImage from "../../public/imgs/notFoundError.jpg";

function PageNotFound() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <img src={pageNotFoundImage} alt="Page Not Found" className="w-[350px]" />

      <div className="flex flex-col items-center gap-3">
        <h1 className="text-4xl text-orange-400">
          Oops! This page got lost...
        </h1>
        <p className="text-lg">We couldn’t find the page you’re looking for.</p>

        <button
          className="text-white bg-orange-400 px-5 py-3 rounded-lg"
          onClick={goToHome}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
