export type Point = {
  x: number;
  y: number;
};

export type Segment = {
  p1: Point;
  p2: Point;
};

function angleBetweenLines(s1: Segment, s2: Segment): number {
  const m1 = (s1.p2.y - s1.p1.y) / (s1.p2.x - s1.p1.x);
  const m2 = (s2.p2.y - s2.p1.y) / (s2.p2.x - s2.p1.x);

  const angleRadians = Math.abs(Math.atan(m1) - Math.atan(m2));
  const angleDegrees = (angleRadians * 180) / Math.PI;

  return angleDegrees;
}

export default angleBetweenLines;
