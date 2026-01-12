import { Code } from "lucide-react";
import { CODE_COLORS, FONTS, COMMON_STYLES } from "./MarkdownPosts/RetroMarkdownPost.constants";

const commonStyles = COMMON_STYLES;

export function CodeBlock() {
  const codeLines = [
    'export default function App({ Component, pageProps }) {',
    '  return (',
    '    <>',
    '      <Head>',
    '        <link',
    '          rel="alternate"',
    '          type="application/rss+xml"',
    '          title="RSS"',
    '          href="/feed.xml"',
    '        />',
    '        <link',
    '          rel="preload"',
    '          href="/fonts/Inter-roman.latin.var.woff2"',
    '          as="font"',
    '          type="font/woff2"',
    '          crossOrigin="anonymous"',
    '        />',
    '      </Head>',
    '      <Component {...pageProps} />',
    '    </>',
    '  )',
    '}'
  ];

  const renderCodeLine = (line: string, index: number) => {
    // Comments
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      return (
        <div key={index} className="text-[#bd93f9] py-[2px] opacity-70">
          💭 {line}
        </div>
      );
    }
    
    // Function/Class declarations
    if (line.includes('function') || line.includes('class') || line.includes('const') || line.includes('let') || line.includes('var')) {
      return (
        <div key={index} className="py-[2px]">
          <span className="text-[#ff79c6] font-bold">★ </span>
          <span className="text-[#ff79c6]">{line}</span>
        </div>
      );
    }
    
    // Import/Export
    if (line.includes('import') || line.includes('export')) {
      return (
        <div key={index} className="text-[#8be9fd] py-[2px]">
          ⚡ {line}
        </div>
      );
    }
    
    // Return statements
    if (line.includes('return')) {
      return (
        <div key={index} className="text-[#50fa7b] py-[2px]">
          ← {line}
        </div>
      );
    }
    
    // Strings
    if (line.includes('"') || line.includes("'") || line.includes('`')) {
      return (
        <div key={index} className="text-[#f1fa8c] py-[2px]">
          ✿ {line}
        </div>
      );
    }
    
    // JSX tags
    if (line.includes('<') && line.includes('>')) {
      return (
        <div key={index} className="text-[#ffb86c] py-[2px]">
          ♦ {line}
        </div>
      );
    }
    
    // Default
    return (
      <div key={index} className="text-[#f8f8f2] py-[2px]">
        {line || ' '}
      </div>
    );
  };

  return (
    <div className="my-8 bg-[#c0c0c0] border-4 border-[#ff1493] shadow-[8px_8px_0px_0px_rgba(255,20,147,0.5)] overflow-hidden" style={commonStyles.pixelated}>
      {/* Window Title Bar */}
      <div 
        className="bg-gradient-to-r from-[#ff1493] to-[#ff69b4] px-3 py-2 border-b-4 border-[#c71585] flex items-center justify-between"
        style={commonStyles.windowShadow}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border-2 border-black flex items-center justify-center">
            <Code className="w-3 h-3 text-[#ff1493]" />
          </div>
          <span className="text-white text-xs" style={{ fontFamily: FONTS.pressStart2P, textShadow: "2px 2px 0px rgba(0,0,0,0.5)" }}>
            CODE_BLOCK.EXE
          </span>
          <div className="flex gap-1 ml-2">
            <div className="w-2 h-2 bg-[#00ff00] border border-black animate-pulse"></div>
            <div className="w-2 h-2 bg-[#ffff00] border border-black"></div>
            <div className="w-2 h-2 bg-[#ff00ff] border border-black"></div>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="w-5 h-5 bg-[#c0c0c0] border-2 border-black flex items-center justify-center text-[10px] hover:bg-[#a0a0a0] font-bold"
            style={commonStyles.windowShadow}>
            _
          </button>
          <button className="w-5 h-5 bg-[#c0c0c0] border-2 border-black flex items-center justify-center text-[10px] hover:bg-[#a0a0a0] font-bold"
            style={commonStyles.windowShadow}>
            □
          </button>
          <button className="w-5 h-5 bg-[#c0c0c0] border-2 border-black flex items-center justify-center text-[10px] hover:bg-[#ff0000] font-bold"
            style={commonStyles.windowShadow}>
            ×
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div 
        className="bg-[#c0c0c0] px-3 py-1 border-b-2 border-[#808080] flex gap-3 text-[10px]"
        style={{ 
          fontFamily: FONTS.vt323,
          ...commonStyles.windowShadow
        }}
      >
        <span className="hover:bg-[#ff1493] hover:text-white px-2 cursor-pointer border-2 border-transparent hover:border-black">File</span>
        <span className="hover:bg-[#ff1493] hover:text-white px-2 cursor-pointer border-2 border-transparent hover:border-black">Edit</span>
        <span className="hover:bg-[#ff1493] hover:text-white px-2 cursor-pointer border-2 border-transparent hover:border-black">View</span>
        <span className="hover:bg-[#ff1493] hover:text-white px-2 cursor-pointer border-2 border-transparent hover:border-black">Help</span>
      </div>
      
      {/* Code Content */}
      <div className="bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#1a0033] p-4 md:p-6">
        <div className="bg-black/40 border-4 border-[#ff69b4]/30 p-4 shadow-[inset_4px_4px_8px_rgba(255,20,147,0.2)]">
          <div className="flex gap-2">
            {/* Line Numbers */}
            <div className="pr-4 border-r-4 border-[#ff1493]/50 select-none bg-[#2d0a4e]/50 px-2">
              {Array.from({ length: codeLines.length }, (_, i) => (
                <div
                  key={i}
                  className="text-[#ff69b4] text-sm leading-relaxed text-right py-[2px]"
                  style={{ fontFamily: FONTS.pressStart2P, fontSize: "10px" }}
                >
                  {String(i + 1).padStart(3, '0')}
                </div>
              ))}
            </div>
            
            {/* Code Lines */}
            <div className="flex-1 overflow-x-auto">
              <pre className="text-sm leading-relaxed" style={{ fontFamily: FONTS.vt323 }}>
                {codeLines.map((line, index) => renderCodeLine(line, index))}
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div 
        className="bg-[#c0c0c0] px-4 py-2 border-t-2 border-[#808080] flex items-center justify-between text-[10px]"
        style={{ 
          fontFamily: FONTS.vt323,
          ...commonStyles.windowShadow
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#ff1493] border border-black"></div>
            <span className="text-black">LINES: {codeLines.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#00ff00] border border-black animate-pulse"></div>
            <span className="text-black">READY</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-black">UTF-8</span>
          <span className="text-[#808080]">│</span>
          <span className="text-black">CRLF</span>
          <span className="text-[#808080]">│</span>
          <span className="text-black">PIXEL MODE</span>
        </div>
      </div>
    </div>
  );
}
