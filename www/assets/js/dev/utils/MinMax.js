(function(){

	var namespace = MAIN.namespace('MAIN.utils');
	//console.log('MAIN.namespace(\'MAIN.utils\') ::', namespace);

	if (namespace.MinMax === undefined) 
	{
		var MinMax = function MinMax()
		{	
		}

		namespace.MinMax = MinMax;
		
		
		MinMax.getValueAtPercentageBetween = function(min, max, perc)
		{
			return min + ((max - min) * perc);
		}

		MinMax.getPercentageAtValueBetween = function(min, max, value)
		{
			return (value-min)/(max - min);
		}
	}

})();
