export interface MonthSlot {
  startMonth: number; // 1-12 (소수점 가능, 예: 3.5)
  endMonth: number; // 1-12 (exclusive, 소수점 가능)
  title: string;
  color: string;
}

export const SCHEDULE: MonthSlot[] = [
  // 12월-1월: react 인강 끝
  { startMonth: 12, endMonth: 1, title: "react 인강 끝", color: "#F3E5F580" },
  // 1월-4월: js Deep Dive 인강
  { startMonth: 1, endMonth: 4, title: "js Deep Dive 인강", color: "#E3F2FD80" },
  // 4월-6월: react 책
  { startMonth: 4, endMonth: 6, title: "react 책", color: "#FFE5EC80" },
  // 6월-8월: TypeScript
  { startMonth: 6, endMonth: 8, title: "TypeScript", color: "#E8F5E980" },
  // 8월-10월: Web Core (MDN)
  { startMonth: 8, endMonth: 10, title: "Web Core (MDN)", color: "#FFF3E080" },
];
