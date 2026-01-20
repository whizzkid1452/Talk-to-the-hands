import { motion } from "motion/react";
import { MENU_ITEMS } from "./Memo.constants";
import { fontPressStart2P } from "./Memo.styles";

export function MemoMenuBar() {
  return (
    <div
      className="bg-white px-2 py-1 flex gap-3 text-[11px] border-b"
      style={{ ...fontPressStart2P, borderBottomColor: "#808080" }}
    >
      {MENU_ITEMS.map((menu) => (
        <motion.button
          key={menu}
          whileHover={{ backgroundColor: "#FFE4A0", color: "#C2185B" }}
          className="hover:bg-yellow-100 px-1 text-[9px]"
        >
          {menu}
        </motion.button>
      ))}
    </div>
  );
}
