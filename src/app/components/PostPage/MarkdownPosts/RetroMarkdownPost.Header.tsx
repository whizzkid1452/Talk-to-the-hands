import { FileText } from "lucide-react";
import { headerStyles, fontStyles, commonStyles } from "./RetroMarkdownPost.styles";

export function PostHeader() {
  return (
    <div className={headerStyles.container}>
      <div className="flex items-center gap-2 mb-3">
        <FileText
          className="w-5 h-5 md:w-6 md:h-6 text-white"
          style={commonStyles.pixelated}
        />
        <h1 className={headerStyles.title} style={fontStyles.pressStart2P}>
          Markdown Examples
        </h1>
      </div>
      <p className={headerStyles.subtitle} style={fontStyles.dungGeunMo}>
        마크다운 옵션의 모든 예제 보기 • View examples of all possible Markdown options.
      </p>
    </div>
  );
}
