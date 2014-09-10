/**
 * @date 2014-09-10
 **/
var StringUtils = {}; 


/**
 * This function compares two names and checks for similarity
 **/
StringUtils.similarNames = function( strA, 
				     strB, 
				     requiredSimilarity 
				   ) {
    return StringUtils.getAlternativeNamesSimilarity( strA, strB ) >= requiredSimilarity;
};

StringUtils.getAlternativeNamesSimilarity = function( strA,
						      strB
						    ) {
    
    var alternativesA = StringUtils._buildAlternativeNames( strA );
    var alternativesB = StringUtils._buildAlternativeNames( strB );

    //window.alert( "alternativesA.length=" + alternativesA.length + ", alternativesB.length=" + alternativesB.length );
    
    var similarity = 0.0;
    for( var a = 0; a < alternativesA.length; a++ ) {
	for( var b = 0; b < alternativesB.length; b++ ) {
	    similarity = Math.max( similarity,
				   StringUtils.getLevenshteinSimilarity( alternativesA[a], alternativesB[b] )
				   );
	    
	}
    }
    
    return similarity;
    
};

/**
 * This function creates a set of alternative name variants.
 *  - whitespace is removed
 *  - commas and colons are removed
 *  - 'Mr', 'Mister', 'Mrs', 'Miss' and 'Jr' are removed
 *  - a reverse sequence will be added to the result
 **/
StringUtils._buildAlternativeNames = function( str ) {
				    
    // Split names at white space or comma
    var split = str.split(/[ ,\.]+/g);
    
    var buffer = "", bufferReverse = "", tmp;
    var result = Array();
  
    // Build alternatives by removing 'Jr.', 'Mr.', 'Mrs.', ...
    for( var i = 0; i < split.length; i++ ) {

	tmp = split[i].toLowerCase();
	if( tmp == "jr" ||
	    tmp == "mr" ||
	    tmp == "mister" ||
	    tmp == "mrs" ||
	    tmp == "ms" ||
	    tmp == "miss" ||
	    tmp == "misses"
	  ) {
	    
	    // NOOP
	} else {
	    
	    buffer += tmp;
	    bufferReverse = tmp + bufferReverse;
	}
	    
    }
    
    result.push( buffer );
    result.push( bufferReverse );
    
    return result;
};


StringUtils.similar = function( strA, 
				strB, 
				requiredSimilarity 
			      ) {
    return getLevenshteinSimilarity(strA,strB) >= requiredSimilarity;
};

StringUtils.getLevenshteinSimilarity = function( strA, strB ) {

    // A value between 0 (match) and the length difference (min) or longer string (max)
    var levenshteinValue = StringUtils.levenshteinator( strA, strB );

    return 1.0 - levenshteinValue/Math.max( strA.length, strB.length );
    
};


/*
// Found at: 
//   http://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
StringUtils.stringSimilarity = function( strA, strB ) {

    for(var result = 0, i = strA.length; i--;){
        if(typeof strB[i] == 'undefined' || strA[i] == strB[i]);
        else if(strA[i].toLowerCase() == strB[i].toLowerCase())
            result++;
        else
            result += 4;
    }
    return 1 - (result + 4*Math.abs(strA.length - strB.length))/(2*(strA.length+strB.length));
};
*/


// DON'T IGNORE THE COPYRIGHT HERE!
// Found at
//   http://andrew.hedges.name/experiments/levenshtein/
/*
Copyright (c) 2006. All Rights reserved.

If you use this script, please email me and let me know, thanks!

Andrew Hedges
andrew (at) hedges (dot) name

If you want to hire me to write JavaScript for you, see my resume.

http://andrew.hedges.name/resume/
*/

// calculate the Levenshtein distance between a and b, fob = form object, passed to the function


StringUtils.levenshteinator = function( a, b ) { 
	var cost;
	
	// get values
	var m = a.length;
	var n = b.length;
	
	// make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
	if (m < n) {
		var c=a;a=b;b=c;
		var o=m;m=n;n=o;
	}
	
	var r = new Array();
	r[0] = new Array();
	for (var c = 0; c < n+1; c++) {
		r[0][c] = c;
	}
	
	for (var i = 1; i < m+1; i++) {
		r[i] = new Array();
		r[i][0] = i;
		for (var j = 1; j < n+1; j++) {
			cost = (a.charAt(i-1) == b.charAt(j-1))? 0: 1;
			r[i][j] = StringUtils._levenshteinMinimator(r[i-1][j]+1,r[i][j-1]+1,r[i-1][j-1]+cost);
		}
	}
	
	return r[m][n];
};

// return the smallest of the three values passed in
StringUtils._levenshteinMinimator = function(x,y,z) {
	if (x < y && x < z) return x;
	if (y < x && y < z) return y;
	return z;
};


