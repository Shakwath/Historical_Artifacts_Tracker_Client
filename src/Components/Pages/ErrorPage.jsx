import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-6">
      {/* Error Image */}
      <img
        src="https://i.ibb.co.com/mCBdmfTn/404-error.jpg"
        alt="404 Illustration"
        className="w-72 md:w-96 mb-6"
      />

      <p className="mt-2 text-base-content/70">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-6 flex gap-4">
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
        <Link to="/allartifacts" className="btn btn-outline">
          Browse Artifacts
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;