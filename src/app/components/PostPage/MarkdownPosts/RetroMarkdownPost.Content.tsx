import { motion } from "motion/react";
import {
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Book,
} from "lucide-react";
import {
  contentStyles,
  blockquoteStyles,
  listStyles,
  tableStyles,
  linkStyles,
  fontStyles,
  commonStyles,
} from "./RetroMarkdownPost.styles";
import { CodeBlock } from "./RetroMarkdownPost.CodeBlock";

export function MarkdownContent() {
  return (
    <div className={contentStyles.container}>
      {/* Main Title */}
      <div className="mb-8 pb-6 border-b-4 border-[#FFB6C1]">
        <h1 className={contentStyles.heading.h1} style={fontStyles.pressStart2P}>
          # Markdown Examples
        </h1>
      </div>

      {/* h2 Heading */}
      <div className={contentStyles.section}>
        <h2 className={contentStyles.heading.h2} style={fontStyles.pressStart2P}>
          ## h2 Heading
        </h2>

        {/* h3 Heading */}
        <h3 className={contentStyles.heading.h3} style={fontStyles.pressStart2P}>
          ### h3 Heading
        </h3>

        {/* h4 Heading */}
        <h4 className={contentStyles.heading.h4} style={fontStyles.pressStart2P}>
          #### h4 Heading
        </h4>

        {/* h5 Heading */}
        <h5 className={contentStyles.heading.h5} style={fontStyles.pressStart2P}>
          ##### h5 Heading
        </h5>

        {/* h6 Heading */}
        <h6 className={contentStyles.heading.h6} style={fontStyles.pressStart2P}>
          ###### h6 Heading
        </h6>
      </div>

      {/* Emphasis */}
      <div className={contentStyles.section}>
        <h2 className={contentStyles.heading.h2} style={fontStyles.pressStart2P}>
          ## Emphasis
        </h2>
        <div className="space-y-2" style={fontStyles.dungGeunMo}>
          <p className={contentStyles.text}>
            <strong className="text-[#FF1493]">**This is bold text**</strong>
          </p>
          <p className={contentStyles.text}>
            <em className="text-[#9c27b0]">_This is italic text_</em>
          </p>
          <p className={contentStyles.text}>
            <del className="text-gray-500">~~Strikethrough~~</del>
          </p>
        </div>
      </div>

      {/* Blockquotes */}
      <div className={contentStyles.section}>
        <h2 className={contentStyles.heading.h2} style={fontStyles.pressStart2P}>
          ## Blockquotes
        </h2>
        <div className={blockquoteStyles.container} style={commonStyles.pixelated}>
          <Quote className="w-6 h-6 text-[#FF69B4] mb-2" style={commonStyles.pixelated} />
          <p className={blockquoteStyles.text} style={fontStyles.dungGeunMo}>
            Develop. Preview. Ship. – Vercel
          </p>
        </div>
      </div>

      {/* Lists */}
      <div className={contentStyles.section}>
        <h2 className={contentStyles.heading.h2} style={fontStyles.pressStart2P}>
          ## Lists
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Unordered List */}
          <div className={listStyles.unordered.container} style={commonStyles.pixelated}>
            <div className="flex items-center gap-2 mb-3">
              <List className="w-5 h-5 text-[#FF69B4]" />
              <h3 className="text-[#FF1493] text-sm" style={fontStyles.pressStart2P}>
                Unordered
              </h3>
            </div>
            <ul className="space-y-2 text-[#1a0033] text-xs md:text-sm" style={fontStyles.dungGeunMo}>
              <li className={listStyles.unordered.item}>
                <span className={listStyles.unordered.bullet}>●</span>
                <span>Lorem ipsum dolor sit amet</span>
              </li>
              <li className={listStyles.unordered.item}>
                <span className={listStyles.unordered.bullet}>●</span>
                <span>Consectetur adipiscing elit</span>
              </li>
              <li className={listStyles.unordered.item}>
                <span className={listStyles.unordered.bullet}>●</span>
                <span>Integer molestie lorem at massa</span>
              </li>
            </ul>
          </div>

          {/* Ordered List */}
          <div className={listStyles.ordered.container} style={commonStyles.pixelated}>
            <div className="flex items-center gap-2 mb-3">
              <ListOrdered className="w-5 h-5 text-[#00bcd4]" />
              <h3 className="text-[#00bcd4] text-sm" style={fontStyles.pressStart2P}>
                Ordered
              </h3>
            </div>
            <ol className="space-y-2 text-[#1a0033] text-xs md:text-sm" style={fontStyles.dungGeunMo}>
              <li className={listStyles.ordered.item}>
                <span className={listStyles.ordered.number}>1.</span>
                <span>Lorem ipsum dolor sit amet</span>
              </li>
              <li className={listStyles.ordered.item}>
                <span className={listStyles.ordered.number}>2.</span>
                <span>Consectetur adipiscing elit</span>
              </li>
              <li className={listStyles.ordered.item}>
                <span className={listStyles.ordered.number}>3.</span>
                <span>Integer molestie lorem at massa</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Code */}
      <div className={contentStyles.section}>
        <h2 className={contentStyles.heading.h2} style={fontStyles.pressStart2P}>
          ## Code
        </h2>

        {/* Inline Code */}
        <p className={`${contentStyles.text} mb-4`} style={fontStyles.dungGeunMo}>
          Inline{" "}
          <code
            className="px-2 py-1 bg-[#2d2d2d] text-[#00ff00] border-2 border-[#00ff00] text-xs"
            style={{ ...fontStyles.vt323, ...commonStyles.pixelated }}
          >
            code
          </code>
        </p>

        {/* Code Block */}
        <CodeBlock />
      </div>

      {/* Tables */}
      <div className={contentStyles.section}>
        <h2 className={contentStyles.heading.h2} style={fontStyles.pressStart2P}>
          ## Tables
        </h2>
        <div className="overflow-x-auto">
          <table className={tableStyles.container} style={commonStyles.pixelated}>
            <thead>
              <tr className={tableStyles.header}>
                <th className={tableStyles.headerCell} style={fontStyles.pressStart2P}>
                  Option
                </th>
                <th className={tableStyles.headerCell} style={fontStyles.pressStart2P}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody style={fontStyles.dungGeunMo}>
              <tr className={tableStyles.row.even}>
                <td className={`${tableStyles.cell} text-[#FF1493]`}>First</td>
                <td className={`${tableStyles.cell} text-[#1a0033]`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </td>
              </tr>
              <tr className={tableStyles.row.odd}>
                <td className={`${tableStyles.cell} text-[#FF1493]`}>Second</td>
                <td className={`${tableStyles.cell} text-[#1a0033]`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </td>
              </tr>
              <tr className={tableStyles.row.even}>
                <td className={`${tableStyles.cell} text-[#FF1493]`}>Third</td>
                <td className={`${tableStyles.cell} text-[#1a0033]`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Links */}
      <div className={contentStyles.section}>
        <h2 className={contentStyles.heading.h2} style={fontStyles.pressStart2P}>
          ## Links
        </h2>
        <div className="space-y-3">
          <motion.a
            whileHover={{ scale: 1.05, x: 5 }}
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles.container}
            style={{ ...fontStyles.dungGeunMo, ...commonStyles.pixelated }}
          >
            <LinkIcon className="w-4 h-4 text-[#FF1493]" />
            <span className={linkStyles.text}>Next.js</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, x: 5 }}
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles.container}
            style={{ ...fontStyles.dungGeunMo, ...commonStyles.pixelated }}
          >
            <LinkIcon className="w-4 h-4 text-[#FF1493]" />
            <span className={linkStyles.text}>Vercel</span>
          </motion.a>
        </div>
      </div>

      {/* Footnotes */}
      <div className={contentStyles.section}>
        <h2 className={contentStyles.heading.h2} style={fontStyles.pressStart2P}>
          ### Footnotes
        </h2>
        <div className="space-y-3" style={fontStyles.dungGeunMo}>
          <p className={contentStyles.text}>
            - Footnote{" "}
            <sup className="text-[#FF1493] text-xs">
              <a href="#fn1" className="hover:underline">[^1]</a>
            </sup>
            .
          </p>
          <p className={contentStyles.text}>
            - Footnote{" "}
            <sup className="text-[#FF1493] text-xs">
              <a href="#fn2" className="hover:underline">[^2]</a>
            </sup>
            .
          </p>

          <div className="mt-6 pt-6 border-t-3 border-[#FFB6C1] space-y-4">
            <div id="fn1" className="bg-[#FFF0F5] border-l-4 border-[#FF1493] p-3">
              <p className="text-[#1a0033] text-xs md:text-sm">
                <sup className="text-[#FF1493]">[^1]:</sup> Footnote{" "}
                <strong className="text-[#FF1493]">can have markup</strong>
              </p>
              <p className="text-[#1a0033] text-xs md:text-sm mt-2">
                and multiple paragraphs.
              </p>
            </div>
            <div id="fn2" className="bg-[#FFF0F5] border-l-4 border-[#FF1493] p-3">
              <p className="text-[#1a0033] text-xs md:text-sm">
                <sup className="text-[#FF1493]">[^2]:</sup> Footnote text.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Ending */}
      <div className="mt-12 pt-6 border-t-4 border-[#FFB6C1] text-center">
        <div className="inline-block bg-gradient-to-r from-[#FFE4E1] via-[#FFB6C1] to-[#FFE4E1] border-3 border-[#FF1493] px-6 py-3 shadow-[6px_6px_0px_0px_rgba(255,20,147,0.4)]" style={commonStyles.pixelated}>
          <Book className="w-6 h-6 text-[#FF1493] mx-auto mb-2" style={commonStyles.pixelated} />
          <p className="text-[#FF1493] text-xs" style={fontStyles.pressStart2P}>
            END OF MARKDOWN GUIDE
          </p>
          <p className="text-[#C2185B] text-sm mt-2" style={fontStyles.dungGeunMo}>
            마크다운 가이드 끝 • Happy Coding!
          </p>
        </div>
      </div>
    </div>
  );
}
