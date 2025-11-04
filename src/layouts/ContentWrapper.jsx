export default function ContentWrapper({ children }) {
    return (
        <div className="px-4 lg:px-17 2xl:px-24 w-full mx-auto max-w-[1920px]">
            {children}
        </div>
    );
}
