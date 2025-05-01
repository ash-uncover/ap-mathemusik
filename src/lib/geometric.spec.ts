import * as geometric from './geometric'

describe('geometric', () => {
  
  // #region getDistanceX
  describe('getDistanceX', () => {

    test('when same point', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 1, y: 1 }
      // Execution
      const result = geometric.getDistanceX(point1, point2)
      // Assertion
      expect(result).toEqual(0)
    })

    test('when point1 before on x axis', () => {
      // Declaration
      const point1 = { x: 0, y: 2 }
      const point2 = { x: 1, y: 1 }
      // Execution
      const result = geometric.getDistanceX(point1, point2)
      // Assertion
      expect(result).toEqual(1)
    })

    test('when point1 afteron x axis', () => {
      // Declaration
      const point1 = { x: 3, y: 1 }
      const point2 = { x: 1, y: 2 }
      // Execution
      const result = geometric.getDistanceX(point1, point2)
      // Assertion
      expect(result).toEqual(2)
    })
  })
  // #endregion

  // #region getDistanceY
  describe('getDistanceY', () => {

    test('when same point', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 1, y: 1 }
      // Execution
      const result = geometric.getDistanceY(point1, point2)
      // Assertion
      expect(result).toEqual(0)
    })

    test('when point1 before on y axis', () => {
      // Declaration
      const point1 = { x: 0, y: 0 }
      const point2 = { x: 1, y: 1 }
      // Execution
      const result = geometric.getDistanceY(point1, point2)
      // Assertion
      expect(result).toEqual(1)
    })

    test('when point1 after on y axis', () => {
      // Declaration
      const point1 = { x: 3, y: 4 }
      const point2 = { x: 1, y: 2 }
      // Execution
      const result = geometric.getDistanceY(point1, point2)
      // Assertion
      expect(result).toEqual(2)
    })
  })
  // #endregion

  // #region getDistance
  describe('getDistance', () => {

    test('when same point', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 1, y: 1 }
      // Execution
      const result = geometric.getDistance(point1, point2)
      // Assertion
      expect(result).toEqual(0)
    })

    test('when same x value', () => {
      // Declaration
      const point1 = { x: 0, y: 0 }
      const point2 = { x: 0, y: 4 }
      // Execution
      const result = geometric.getDistance(point1, point2)
      // Assertion
      expect(result).toEqual(4)
    })

    test('when same y value', () => {
      // Declaration
      const point1 = { x: 3, y: 4 }
      const point2 = { x: 1, y: 4 }
      // Execution
      const result = geometric.getDistance(point1, point2)
      // Assertion
      expect(result).toEqual(2)
    })

    test('when different points', () => {
      // Declaration
      const point1 = { x: 0, y: 3 }
      const point2 = { x: 4, y: 0 }
      // Execution
      const result = geometric.getDistance(point1, point2)
      // Assertion
      expect(result).toEqual(5)
    })
  })
  // #endregion

  // #region getGeoDirection
  describe('getGeoDirection', () => {

    test('when NW', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 0, y: 0 }
      // Execution
      const result = geometric.getGeoDirection(point1, point2)
      // Assertion
      expect(result).toEqual(geometric.GeoDirections.NW)
    })

    test('when NE', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 2, y: 0 }
      // Execution
      const result = geometric.getGeoDirection(point1, point2)
      // Assertion
      expect(result).toEqual(geometric.GeoDirections.NE)
    })

    test('when SE', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 2, y: 2 }
      // Execution
      const result = geometric.getGeoDirection(point1, point2)
      // Assertion
      expect(result).toEqual(geometric.GeoDirections.SE)
    })

    test('when SW', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 0, y: 2 }
      // Execution
      const result = geometric.getGeoDirection(point1, point2)
      // Assertion
      expect(result).toEqual(geometric.GeoDirections.SW)
    })
  })
  // #endregion

  // #region getAngleDegree
  describe('getAngleDegree', () => {

    test('when 0', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 1, y: 0 }
      // Execution
      const result = geometric.getAngleDegree(point1, point2)
      // Assertion
      expect(Math.round(result)).toEqual(0)
    })
    test('when 45', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 2, y: 0 }
      // Execution
      const result = geometric.getAngleDegree(point1, point2)
      // Assertion
      expect(Math.round(result)).toEqual(45)
    })
    test('when 90', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 2, y: 1 }
      // Execution
      const result = geometric.getAngleDegree(point1, point2)
      // Assertion
      expect(Math.round(result)).toEqual(90)
    })
    test('when 135', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 2, y: 2 }
      // Execution
      const result = geometric.getAngleDegree(point1, point2)
      // Assertion
      expect(Math.round(result)).toEqual(135)
    })
    test('when 180', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 1, y: 2 }
      // Execution
      const result = geometric.getAngleDegree(point1, point2)
      // Assertion
      expect(Math.round(result)).toEqual(180)
    })
    test('when 225', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 0, y: 2 }
      // Execution
      const result = geometric.getAngleDegree(point1, point2)
      // Assertion
      expect(Math.round(result)).toEqual(225)
    })
    test('when 270', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 0, y: 1 }
      // Execution
      const result = geometric.getAngleDegree(point1, point2)
      // Assertion
      expect(Math.round(result)).toEqual(270)
    })
    test('when 315', () => {
      // Declaration
      const point1 = { x: 1, y: 1 }
      const point2 = { x: 0, y: 0 }
      // Execution
      const result = geometric.getAngleDegree(point1, point2)
      // Assertion
      expect(Math.round(result)).toEqual(315)
    })
  })
  // #endregion
})
