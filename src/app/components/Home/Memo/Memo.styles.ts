const PIXELATED = { imageRendering: "pixelated" as const };

export const windowBorderStyle = {
  borderTopColor: "#ffffff",
  borderLeftColor: "#ffffff",
  borderRightColor: "#808080",
  borderBottomColor: "#808080",
  ...PIXELATED,
};

export const windowButtonStyle = {
  borderTopColor: "#ffffff",
  borderLeftColor: "#ffffff",
  borderRightColor: "#808080",
  borderBottomColor: "#808080",
  ...PIXELATED,
};

export const fontPressStart2P = {
  fontFamily: "'Press Start 2P', monospace",
  ...PIXELATED,
};

export const fontDungGeunMo = {
  fontFamily: "'DungGeunMo', monospace",
  ...PIXELATED,
};
