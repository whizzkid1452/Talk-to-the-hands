import { memo } from "react";
import { SCHEDULE } from "./RetroDateClock.constants";
import { createPieSlice, getTextPosition } from "./RetroDateClock.utils";
import { pieChartStyles, getPieChartTextStyle } from "./RetroDateClock.styles";

export const SchedulePieChart = memo(function SchedulePieChart() {
  const viewBoxSize = 100;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const radius = 42; // 참고 파일과 동일
  const textRadius = 32; // 참고 파일과 동일

  return (
    <svg
      className={pieChartStyles.container}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      {SCHEDULE.map((slot, index) => {
        // 제목이 없는 경우는 파이 조각만 그리고 텍스트는 표시하지 않음
        if (!slot.title) {
          return (
            <path
              key={index}
              className={pieChartStyles.path}
              style={{
                animationDelay: `${0.5 + index * 0.08}s`,
              }}
              d={createPieSlice(slot.startMonth, slot.endMonth, centerX, centerY, radius)}
              fill={slot.color}
              stroke="black"
              strokeWidth="0.3"
            />
          );
        }

        const textPos = getTextPosition(
          slot.startMonth,
          slot.endMonth,
          centerX,
          centerY,
          textRadius
        );

        // 텍스트를 줄바꿈하기 위해 적절한 길이로 나누기
        const splitText = (text: string, maxLength: number = 8): string[] => {
          const words = text.split(/(\s+)/);
          const lines: string[] = [];
          let currentLine = "";

          for (const word of words) {
            // 공백도 포함하여 처리
            if ((currentLine + word).length <= maxLength) {
              currentLine += word;
            } else {
              if (currentLine.trim()) {
                lines.push(currentLine);
              }
              // 현재 단어가 공백이 아니면 새 줄에 추가
              if (word.trim()) {
                currentLine = word;
              } else {
                currentLine = "";
              }
            }
          }
          
          if (currentLine.trim()) {
            lines.push(currentLine);
          }
          
          return lines.length > 0 ? lines : [text];
        };

        const textLines = splitText(slot.title);
        const lineHeight = 5; // 줄 간격
        const startY = textPos.y - ((textLines.length - 1) * lineHeight) / 2;

        return (
          <g key={index}>
            <path
              className={pieChartStyles.path}
              style={{
                animationDelay: `${0.5 + index * 0.08}s`,
              }}
              d={createPieSlice(slot.startMonth, slot.endMonth, centerX, centerY, radius)}
              fill={slot.color}
              stroke="black"
              strokeWidth="0.3"
            />
            <text
              x={textPos.x}
              y={startY}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${textPos.angle}, ${textPos.x}, ${textPos.y})`}
              className={pieChartStyles.text}
              style={getPieChartTextStyle("4px")}
            >
              {textLines.map((line, lineIndex) => (
                <tspan
                  key={lineIndex}
                  x={textPos.x}
                  dy={lineIndex === 0 ? 0 : lineHeight}
                >
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
});
