
var getMinYPoint = function(array) {
	// loop through points and get point with lowest Y value
	array = array.sort(function(a,b){
		return a.y - b.y;
	})

	return array[0];
}


var removePoint = function(array, item) {
	for (var i=0; i < array.length; ++i) {
		if(array[i] == item) {
			array.splice(i,1);
			console.log("Removed item!");
			break;
		}
	}
}


var pointEquals = function(a, b) {
	return (a.x == b.x && a.y == b.y);
}


/*

CONCAVEHULL [pointsList, k]
Input. List of points to process (pointsList); number of neighbours (k)
Output. An ordered list of points representing the computed polygon
 http://repositorium.sdum.uminho.pt/bitstream/1822/6429/1/ConcaveHull_ACM_MYS.pdf
 */


var findConcaveHull = function(dataset, k) {

	//1: kk ← Max[k,3] ► make sure k>=3
	//var kk = k*k;

	var firstPoint = currentPoint = null;
	var hull = [];
	var previousAngle = 0;
	var step;

	//2: dataset ← CleanList[pointsList] ► remove equal points
	// assumes no duplicate points, if duplicates, strip them out first.

	if(k >= 3) {

		//3: If Length[dataset] < 3
		//4: Return[null] ► a minimum of 3 dissimilar points is required
		if(dataset.length < 3) return false;

		// 5: If Length[dataset] = 3
		// 6: Return[dataset] ► for a 3 points dataset, the polygon is the dataset itself
		if(dataset.length == 3) return dataset;

		// 7: kk ← Min[kk,Length[dataset]-1] ► make sure that k neighbours can be found
		kk = Math.min(kk, dataset.length-1);

		// 8: firstPoint ← FindMinYPoint[dataset]
		firstPoint = getMinYPoint(dataset);
		console.log("firstPoint: " , firstPoint);

		// 9: hull ← {firstPoint} ► initialize the hull with the first point
		hull.push(firstPoint);

		// 10: currentPoint ← firstPoint
		currentPoint = firstPoint;

		// 11: dataset ← RemovePoint[dataset,firstPoint] ► remove the first point
		removePoint(dataset, firstPoint);

		// 12: previousAngle ← 0
		previousAngle = 0;

		// 13: step ← 2
		step = 2;
		var i = 0;

		// 14: While ((currentPoint≠firstPoint)or(step=2))and(Length[dataset]>0)
		while((!pointEquals(currentPoint, firstPoint) || step == 2) && dataset.length > 0)
		{
			// 15: If step=5
			if (step == 5) {
				// 16: dataset ← AddPoint[dataset,firstPoint] ► add the firstPoint again
				dataset.push(firstPoint);

				// 17: kNearestPoints ← NearestPoints[dataset,currentPoint,kk] ► find the nearest neighbours

			}
		}

	}

}

/*


 // 18: cPoints ← SortByAngle[kNearestPoints,currentPoint,prevAngle] ► sort the candidates (neighbours) in descending order of right-hand turn

 // 19: its ← True

 // 20: i ← 0

 // 21: While (its=True)and(i<Length[cPoints]) ► select the first candidate that does not intersects any of the polygon edges

 // 22: i++

 // 23: If cPointsi=firstPoint

 // 24: lastPoint ← 1

 // 25: else

 // 26: lastPoint ← 0

 // 27: j ← 2

 // 28: its ← False

 // 29: While (its=False)and(j<Length[hull]-lastPoint)

 // 30: its ← IntersectsQ[{hullstep-1,cPointsi},{hullstep-1-j,hullstep-j}]

 // 31: j++


 32: If its=True ► since all candidates intersect at least one edge, try again with a higher number of neighbours
 33: Return[ConcaveHull[pointsList,kk+1]]
 34: currentPoint ← cPointsi
 35: hull ← AddPoint[hull,currentPoint] ► a valid candidate was found
 36: prevAngle ← Angle[hullstep,hullstep-1]
 37: dataset ← RemovePoint[dataset,currentPoint]
 38: step++
 39: allInside ← True
 40: i ← Length[dataset]
 41: While (allInside=True)and(i>0) ► check if all the given points are inside the computed polygon
 42: allInside ← PointInPolygonQ[dataseti,hull]
 43: i--
 44: If allInside=False
 45: Return[ConcaveHull[pointsList,kk+1]] ► since at least one point is out of the computed polygon,
 try again with a higher number of neighbours
 46: Return[hull] ► a valid hull was found!

 */
