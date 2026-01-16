// 월을 각도로 변환 (12월 = 위쪽(270도), 1월 = 300도, ...)
function monthToAngle(month: number): number {
  // 12월이 12시 방향(위쪽)이 되도록 설정
  // SVG 좌표계: 0도 = 오른쪽(3시), 90도 = 아래(6시), 180도 = 왼쪽(9시), 270도 = 위(12시)
  // 시계 방향: 12시(위) = 270도, 1시 = 300도, 2시 = 330도, 3시 = 0도, ...
  // 12월 = 270도, 1월 = 300도, 2월 = 330도, 3월 = 0도, 4월 = 30도, ..., 11월 = 240도
  // 공식: 각도 = ((month - 12) * 30 + 270) % 360
  let angle = ((month - 12) * 30 + 270) % 360;
  if (angle < 0) angle += 360;
  return angle;
}

// 파이 조각 경로 생성 (월 기준)
export function createPieSlice(
  startMonth: number,
  endMonth: number,
  centerX: number,
  centerY: number,
  radius: number
): string {
  const startAngle = monthToAngle(startMonth);
  // 12월을 넘어가는 경우 처리 (예: 12월-1월)
  let endAngle = monthToAngle(endMonth);
  if (endMonth < startMonth) {
    // 12월을 넘어가는 경우
    endAngle = monthToAngle(endMonth + 12);
  }

  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1 = centerX + radius * Math.cos(startRad);
  const y1 = centerY + radius * Math.sin(startRad);
  const x2 = centerX + radius * Math.cos(endRad);
  const y2 = centerY + radius * Math.sin(endRad);

  // 각도 차이 계산
  let angleDiff = endAngle - startAngle;
  if (angleDiff < 0) angleDiff += 360;
  const largeArc = angleDiff > 180 ? 1 : 0;

  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

// 텍스트 위치 계산 (월 기준)
export function getTextPosition(
  startMonth: number,
  endMonth: number,
  centerX: number,
  centerY: number,
  textRadius: number
) {
  // 중간 월 계산 (12월을 넘어가는 경우 처리)
  let midMonth: number;
  if (startMonth < endMonth) {
    // 일반적인 경우
    midMonth = (startMonth + endMonth) / 2;
  } else {
    // 12월을 넘어가는 경우 (예: 12월-1월)
    const totalMonths = (12 - startMonth) + endMonth;
    midMonth = startMonth + totalMonths / 2;
    if (midMonth > 12) midMonth -= 12;
  }
  
  const angle = monthToAngle(midMonth);
  const rad = (angle * Math.PI) / 180;

  return {
    x: centerX + textRadius * Math.cos(rad),
    y: centerY + textRadius * Math.sin(rad),
    angle: angle + 90,
  };
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function calculateMonthRotation(month: number): number {
  return month === 12 ? 0 : month * 30;
}
