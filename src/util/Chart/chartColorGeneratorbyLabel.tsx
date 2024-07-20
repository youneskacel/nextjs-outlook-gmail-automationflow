export const chartColorGeneratorbyLabel = (label: string) => {
  const hashCode = label.split("").reduce((acc, char) => {
    acc = (acc << 5) - acc + char.charCodeAt(0);
    return acc & acc;
  }, 0);

  const color = `hsl(${hashCode % 360}, 70%, 50%, 0.5)`;
  return color;
};
