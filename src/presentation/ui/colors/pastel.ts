const PASTEL_COLORS = {
  LEVEL_ONE: "#F39E60",
  LEVEL_TWO: "#E16A54",
  LEVEL_THREE: "#9F5255",
} 

export const getPastelColor = (level: number) => {
  switch (level) {
    case 1:
      return PASTEL_COLORS.LEVEL_ONE;
    case 2:
      return PASTEL_COLORS.LEVEL_TWO;
    case 3:
      return PASTEL_COLORS.LEVEL_THREE;
    default:
      return "#AAA";
  }
}