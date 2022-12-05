import { useContext, useRef, MouseEvent, useEffect } from 'react';
import { AppContext } from '../AppContext';
import { FilterType } from '../hooks/useFilter';

interface Point {
  x: number;
  y: number;
}

const POINT_RADIUS = 5;

function BezierGraph() {
  const { currentBezier, setCurrentBezier, setFilter, filter } =
    useContext(AppContext);
  const bezierCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMouseDown = useRef<boolean>(false);
  const currentMovedPoint = useRef<Point | null>(null);

  const updateBezier = () => {
    const newBezier = [];

    const v0 = { x: 0, y: 0 };
    const v1 = bezierPoints.current[0];
    const v2 = bezierPoints.current[1];
    const v3 = { x: 255, y: 255 };

    const a0 = v0;
    const a1 = multiply(subtract(v1, v0), 3);
    const a2 = multiply(add(subtract(v2, multiply(v1, 2)), v0), 3);
    let a3 = subtract(v3, multiply(v2, 3));
    a3 = add(a3, multiply(v1, 3));
    a3 = subtract(a3, v0);

    for (let t = 0; t <= 1; t += 0.001) {
      const point = getBezierFuncVal(t, a0, a1, a2, a3);
      newBezier[Math.round(point.x)] = Math.round(point.y);
    }

    setCurrentBezier(newBezier);
  };

  useEffect(() => {
    // console.log('currentBezier', currentBezier);
    if (filter.type == FilterType.Custom && currentBezier) {
      setFilter(FilterType.Custom, (value) => currentBezier[value] ?? 0);
    }
  }, [currentBezier]);

  const bezierPoints = useRef<[Point, Point]>([
    { x: 85, y: 100 },
    { x: 170, y: 155 },
  ]);

  const getMousePosition = (event: MouseEvent): Point => {
    const rect = bezierCanvasRef.current?.getBoundingClientRect()!;
    return {
      x: (event.clientX - rect.left) << 0,
      y: (event.clientY - rect.top) << 0,
    };
  };

  const draw = () => {
    const ctx = bezierCanvasRef.current?.getContext('2d');
    if (!ctx) return;

    const p1 = bezierPoints.current[0];
    const p2 = bezierPoints.current[1];

    ctx.clearRect(0, 0, 256, 256);

    // draw dashed line
    ctx.strokeStyle = '#444';
    ctx.beginPath();
    ctx.setLineDash([8, 8]);
    ctx.moveTo(0, 255);
    ctx.lineTo(p1.x, 255 - p1.y);
    ctx.lineTo(p2.x, 255 - p2.y);
    ctx.lineTo(255, 0);
    ctx.stroke();

    // draw bezier curve
    ctx.setLineDash([]);
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, 255);
    ctx.bezierCurveTo(p1.x, 255 - p1.y, p2.x, 255 - p2.y, 255, 0);
    ctx.stroke();

    // draw bezier points
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(p1.x, 255 - p1.y, POINT_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p2.x, 255 - p2.y, POINT_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isMouseDown.current) return;
    const pos = getMousePosition(event);
    const p1 = bezierPoints.current[0];
    const p2 = bezierPoints.current[1];

    let movedPoint = currentMovedPoint.current;

    if (!movedPoint) {
      let newMovedPoint: Point | undefined;
      if (
        Math.abs(pos.x - p1.x) < POINT_RADIUS * 3 &&
        Math.abs(pos.y - (255 - p1.y)) < POINT_RADIUS * 3
      )
        newMovedPoint = p1;
      else if (
        Math.abs(pos.x - p2.x) < POINT_RADIUS * 3 &&
        Math.abs(pos.y - (255 - p2.y)) < POINT_RADIUS * 3
      )
        newMovedPoint = p2;
      if (newMovedPoint) {
        movedPoint = newMovedPoint;
        currentMovedPoint.current = newMovedPoint;
      }
    }

    if (movedPoint) {
      movedPoint.x = pos.x;
      movedPoint.y = 255 - pos.y;
      currentMovedPoint.current = movedPoint;
    }

    if (!movedPoint) return;

    updateBezier();
    draw();
  };

  useEffect(() => {
    updateBezier();
    draw();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={bezierCanvasRef}
        onMouseDown={() => (isMouseDown.current = true)}
        onMouseUp={() => {
          isMouseDown.current = false;
          currentMovedPoint.current = null;
        }}
        onMouseLeave={() => {
          isMouseDown.current = false;
          currentMovedPoint.current = null;
        }}
        onMouseMove={handleMouseMove}
        height={255}
        width={255}
        style={{ border: '2px black solid' }}
      />
    </div>
  );
}

export default BezierGraph;

function getBezierFuncVal(
  t: number,
  a0: Point,
  a1: Point,
  a2: Point,
  a3: Point
): Point {
  let res = a3;
  res = add(multiply(res, t), a2);
  res = add(multiply(res, t), a1);
  res = add(multiply(res, t), a0);
  return res;
}

function add(p1: Point, p2: Point): Point {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
}

function subtract(p1: Point, p2: Point): Point {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

function multiply(p: Point, a: number): Point {
  return { x: p.x * a, y: p.y * a };
}
