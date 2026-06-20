import { Wallet, CreditCard } from 'lucide-react';

export default function PaymentMethod({ options, selected, onChange }) {
  return (
    <>
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-white/10 bg-gradient-to-r from-[#02cbf9]/[0.03] to-transparent">
        <h2 className="font-extrabold text-lg text-white flex items-center gap-2">
          <div className="w-1 h-5 bg-[#02cbf9] rounded-full" />
          Payment Method
        </h2>
      </div>

      <div className="p-5 flex flex-col gap-2.5">
        {options.map((option) => {
          const isSelected = selected === option.id;
          const Icon = option.id === 'cod' ? Wallet : CreditCard;
          return (
            <label
              key={option.id}
              htmlFor={`payment-${option.id}`}
              className={`flex items-center border rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-[#02cbf9]/[0.04] border-[#02cbf9]/30 shadow-sm'
                  : 'bg-white/bg-white/3 border-white/5 hover:border-[#02cbf9]/20'
              }`}
            >
              <input
                id={`payment-${option.id}`}
                type="radio"
                name="payment"
                value={option.id}
                checked={isSelected}
                onChange={() => onChange(option.id)}
                className="mr-3 h-4 w-4 accent-[#02cbf9] cursor-pointer"
              />
              <Icon
                size={18}
                className={`mr-2.5 transition-colors ${
                  isSelected ? 'text-[#02cbf9]' : 'text-white/40'
                }`}
              />
              <span className={`text-[15px] font-semibold transition-colors ${
                isSelected ? 'text-white' : 'text-white/70'
              }`}>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </>
  );
}