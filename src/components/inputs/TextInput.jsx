import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const TextInput = ({ label, type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col w-full relative">
      <span>{label}</span>
      <input
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`bg-[#0C0C0C] border-2 border-[#505050] px-2 py-4 rounded-md placeholder:text-[#202020] focus:outline-none focus:border-primary transition-colors ${isPassword ? "pr-10" : ""}`}
      />

      {isPassword && (
        <button
          type="button"
          className="absolute right-2 top-[63%] -translate-y-1/2 text-gray-400 hover:text-primary cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

export default TextInput;
