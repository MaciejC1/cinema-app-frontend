import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ text = "Ładowanie...", size = 40 }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
            <ClipLoader size={size} color="#df2144" />
            {text && (
                <p className="mt-2 text-gray-400 text-sm">
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;
