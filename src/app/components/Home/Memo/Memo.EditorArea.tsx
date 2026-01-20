import { fontPressStart2P, fontDungGeunMo } from "./Memo.styles";
import { MemoCornerStickers } from "./Memo.CornerStickers";

type MemoEditorAreaProps = {
  content: string;
  isLoading: boolean;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
};

export function MemoEditorArea({
  content,
  isLoading,
  error,
  onChange,
  onBlur,
}: MemoEditorAreaProps) {
  return (
    <div
      className="relative bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 border-4 border-[#FFB6C1] shadow-[6px_6px_0px_0px_rgba(255,105,180,0.4)]"
      style={{ imageRendering: "pixelated" }}
    >
      <MemoCornerStickers />

      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 28px, #FFB6C1 28px, #FFB6C1 29px)",
        }}
      />

      <div
        className="absolute top-0 bottom-0 left-12 w-[2px] bg-pink-300 opacity-50 pointer-events-none"
        style={{ imageRendering: "pixelated" }}
      />

      <textarea
        value={content}
        onChange={onChange}
        onBlur={onBlur}
        disabled={isLoading}
        className="relative z-0 w-full h-64 md:h-80 p-4 pl-16 bg-transparent resize-none focus:outline-none text-gray-800 leading-[29px]"
        style={{ ...fontDungGeunMo, fontSize: "14px" }}
        placeholder={isLoading ? "불러오는 중..." : "여기에 메모를 작성하세요... ♡"}
      />

      <div
        className={`absolute bottom-2 right-4 text-[9px] bg-white/70 px-2 py-1 border ${error ? "text-red-500 border-red-300" : "text-pink-400 border-pink-300"}`}
        style={fontPressStart2P}
      >
        {error ?? `${content.length} chars`}
      </div>
    </div>
  );
}
