const ErrorLoading = ({ message = "Wystąpił błąd" }) => {
    return (
        <div className="flex items-center justify-center min-h-[300px] text-red-500">
            <p>{message}</p>
        </div>
    );
};

export default ErrorLoading;
