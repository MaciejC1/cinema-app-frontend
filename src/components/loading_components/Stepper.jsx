const Stepper = ({ currentStep }) => {
    const steps = [
        { number: 1, label: "Miejsca" },
        { number: 2, label: "Płatność" },
        { number: 3, label: "Bilet" },
    ];

    return (
        <div className="flex items-center justify-end gap-4 lg:gap-6 xl:gap-8">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                        <div
                            className={`
                                rounded-full transition-all
                                w-4 h-4
                                lg:w-5 lg:h-5
                                xl:w-6 xl:h-6
                                ${step.number <= currentStep
                                    ? "bg-primary"
                                    : "bg-gray-500"
                                }
                            `}
                        />
                        <span
                            className={`
                                mt-2 font-medium whitespace-nowrap
                                text-sm
                                lg:text-base
                                xl:text-lg
                                ${step.number <= currentStep
                                    ? "text-primary"
                                    : "text-[gray-500]"
                                }
                            `}
                        >
                            {step.label}
                        </span>
                    </div>

                    {index < steps.length - 1 && (
                        <div
                            className="
                                bg-gray-500 mb-6
                                w-16 h-px
                                lg:w-24
                                xl:w-32
                                mx-3 lg:mx-4
                            "
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stepper;