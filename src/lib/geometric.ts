export interface Point {
  x: number
  y: number
}

export type GeoDirection =
  | 'NE'
  | 'SE'
  | 'SW'
  | 'NW'
export const GeoDirections: {
  NE: GeoDirection
  SE: GeoDirection
  SW: GeoDirection
  NW: GeoDirection
} = {
  NE: 'NE',
  SE: 'SE',
  SW: 'SW',
  NW: 'NW'
}

export const getDistanceX = (point1: Point, point2: Point): number => {
  const distX = Math.abs(point1.x - point2.x)
  return distX
}
export const getDistanceY = (point1: Point, point2: Point): number => {
  const distY = Math.abs(point1.y - point2.y)
  return distY
}
export const getDistance = (point1: Point, point2: Point): number => {
  const distX = getDistanceX(point1, point2)
  const distY = getDistanceY(point1, point2)
  return Math.sqrt(distX*distX + distY*distY)
}

export const getGeoDirection = (center: Point, point: Point): GeoDirection => {
  if (center.x >= point.x && center.y >= point.y) {
    return GeoDirections.NW
  }
  if (center.x >= point.x && center.y < point.y) {
    return GeoDirections.SW
  }
  if (center.x < point.x && center.y >= point.y) {
    return GeoDirections.NE
  }
  return GeoDirections.SE
}

export const degreeToRadian = (degree: number): number => {
  return degree * Math.PI / 180
}
export const radianToDegree = (radian: number): number => {
  return radian * 180 / Math.PI
}

export const getAngle = (center: Point, point: Point): number => {
  const direction = getGeoDirection(center, point)
  const distance = getDistance(center, point)
  switch (direction) {
    case GeoDirections.NE: {
      const distY = getDistanceY(center, point)
      return Math.acos(distY / distance)
    }
    case GeoDirections.SE: {
      const distX = getDistanceX(center, point)
      return Math.PI/2 + Math.acos(distX / distance)
    }
    case GeoDirections.SW: {
      const distY = getDistanceY(center, point)
      return Math.PI + Math.acos(distY / distance)
    }
    case GeoDirections.NW: {
      const distX = getDistanceX(center, point)
      return 3*Math.PI/2 + Math.acos(distX / distance)
    }
  }
}
export const getAngleDegree = (center: Point, point: Point): number => {
  const angle = getAngle(center, point)
  return radianToDegree(angle) % 360
}