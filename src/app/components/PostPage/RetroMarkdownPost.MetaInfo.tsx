import { User, Clock, Eye, Tag } from "lucide-react";
import { metaStyles, fontStyles } from "./RetroMarkdownPost.styles";

export function MetaInfo() {
  return (
    <div className={metaStyles.container}>
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 md:w-5 md:h-5 text-[#e91e63]" />
        <span style={fontStyles.dungGeunMo}>You</span>
      </div>
      <div className="flex items-center gap-[0.25rem]">
        <Clock className="w-3 h-3 md:w-4 md:h-4 text-[#9c27b0]" />
        <span style={fontStyles.vt323}>2021/3/19</span>
      </div>
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 md:w-5 md:h-5 text-[#00bcd4]" />
        <span style={fontStyles.vt323}>1,234 views</span>
      </div>
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 md:w-5 md:h-5 text-[#FF1493]" />
        <span className={metaStyles.tag} style={{ ...fontStyles.pressStart2P, ...{ imageRendering: "pixelated" } }}>
          web development
        </span>
      </div>
    </div>
  );
}
