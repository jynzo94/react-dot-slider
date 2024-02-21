export type Point = {
    x: number;
    y: number;
};
export type Segment = {
    p1: Point;
    p2: Point;
};
declare function angleBetweenLines(s1: Segment, s2: Segment): number;
export default angleBetweenLines;
