import { Copy, Check, Clipboard } from 'lucide-react';

export default function CopyProductInfo({ onCopy, copied, copyText }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white/3 border border-white/5 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-[#02cbf9]/10 text-[#02cbf9]">
          <Clipboard size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Copy Product Information</p>
          <p className="text-xs text-white/40">
            Copies product names, prices, quantities & totals
          </p>
        </div>
      </div>
      <button
        onClick={onCopy}
        className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
          copied
            ? 'bg-green-500/20 border-green-500/30 text-green-400 cursor-default'
            : 'bg-[#02cbf9]/20 border-[#02cbf9]/30 text-[#02cbf9] hover:bg-[#02cbf9]/30 hover:border-[#02cbf9]/50 cursor-pointer'
        }`}
        disabled={copied}
      >
        {copied ? (
          <>
            <Check size={16} />
            Copied!
          </>
        ) : (
          <>
            <Copy size={16} />
            Copy
          </>
        )}
      </button>
    </div>
  );
}