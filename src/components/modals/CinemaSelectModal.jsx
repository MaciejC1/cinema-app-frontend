 import { X } from "lucide-react";
import { useCinema } from "../../context/CinemaContext";
import { useCinemas } from "../../api/hooks/cinemaQueries";

const CinemaSelectModal = ({ onClose }) => {
  const { data: cinemas = [], isLoading } = useCinemas();
  const { cinema, changeCinema } = useCinema();

  return (
    <div
      className="fixed inset-0 z-999 bg-black/70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#111] border-2 border-primary rounded-3xl w-full max-w-lg p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Wybierz kino</h2>
          <button onClick={onClose} className="cursor-pointer">
            <X size={28} />
          </button>
        </div>

        {isLoading ? (
          <p className="text-gray-400">Ładowanie kin...</p>
        ) : (
          <div className="flex flex-col gap-2">
            {cinemas.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  changeCinema(c);
                  onClose();
                }}
                className={`
                  text-left px-4 py-3 rounded-xl border
                  transition
                  cursor-pointer
                  ${cinema?.id === c.id
                    ? "border-primary bg-primary/20"
                    : "border-white/20 hover:border-primary"}
                `}
              >
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-400">
                  {c.city}, {c.address}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CinemaSelectModal;
