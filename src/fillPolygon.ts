import { Point } from './hooks/useMouseHandlers';

interface EdgeData {
  yMax: number;
  xofYMin: number;
  slopeInverted: number;
}

interface ActiveEdgeData {
  edgeData: EdgeData;
  x: number;
}

export default function fillPolygon(
  image: ImageData,
  polygon: Point[],
  filterFn: (value: number) => number,
  canvasWidth: number,
  canvasHeight: number
) {
  const edgeTable: EdgeData[][] = [];

  for (let i = 0; i < polygon.length; i++) {
    const iNext = (i + 1) % polygon.length;

    const leftVertex =
      polygon[i].x > polygon[iNext].x ? polygon[iNext] : polygon[i];
    const rightVertex = polygon[i] === leftVertex ? polygon[iNext] : polygon[i];

    if (leftVertex.y === rightVertex.y) continue;

    const yMinVertex =
      polygon[i].y < polygon[iNext].y ? polygon[i] : polygon[iNext];

    const edgeData: EdgeData = {
      xofYMin: yMinVertex.x,
      yMax: Math.max(polygon[i].y, polygon[iNext].y),
      slopeInverted:
        (rightVertex.x - leftVertex.x) / (rightVertex.y - leftVertex.y),
    };

    const yMin = yMinVertex.y;
    if (!edgeTable[yMin]) edgeTable[yMin] = [];

    edgeTable[yMin].push(edgeData);
  }

  let activeEdgeTable: ActiveEdgeData[] = [];

  const tempEdgeTable: EdgeData[][] = [];
  for (const edgeTableRow in edgeTable) {
    tempEdgeTable[edgeTableRow] = [...edgeTable[edgeTableRow]];
  }

  let y = Math.min(...Object.keys(tempEdgeTable).map((key) => parseInt(key)));

  do {
    // move from ET to AET
    if (tempEdgeTable[y]) {
      tempEdgeTable[y].forEach((e) => {
        activeEdgeTable.push({ edgeData: e, x: e.xofYMin });
      });
    }

    // remove from AET
    activeEdgeTable = activeEdgeTable.filter((e) => y < e.edgeData.yMax);

    // sort AET
    activeEdgeTable.sort((a, b) => a.x - b.x);

    // fill pixels
    if (y > canvasHeight - 1) return;

    if (activeEdgeTable.length % 2 !== 0) return;

    for (let i = 0; i < activeEdgeTable.length; i += 2) {
      const startX = activeEdgeTable[i].x << 0;
      const endX = activeEdgeTable[i + 1].x << 0;
      for (let x = startX; x <= endX; x++) {
        if (x > canvasWidth - 1) continue;
        const offset = (y * canvasWidth + x) * 4;
        image.data.set(
          [
            filterFn(image.data[offset + 0]),
            filterFn(image.data[offset + 1]),
            filterFn(image.data[offset + 2]),
          ],
          offset
        );
      }
    }

    // move to next scan line
    y++;

    // update x in AET
    activeEdgeTable.forEach((e) => (e.x += e.edgeData.slopeInverted));
  } while (activeEdgeTable.length > 0 && tempEdgeTable.length > 0);
}
