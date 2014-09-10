/**
 * This is just a demo.
 * 
 * @date 2014-09-10
 **/

/* This function is called on button click */
function compare() {

    // Fetch the input from the form
    var strA = document.getElementById( "strA" ).value;
    var strB = document.getElementById( "strB" ).value;
    var minSimilarity = document.getElementById( "minSimilarity" ).value/100.0;


    // Compute similarities (demo)
    var levenshteinSimilarity = StringUtils.getLevenshteinSimilarity(strA,strB);
    var altNamesSimilarity    = StringUtils.getAlternativeNamesSimilarity(strA,strB);
    
    // This is the one we are interested in
    var similarNames          = StringUtils.similarNames(strA,strB,minSimilarity)

    // Display results
    window.alert( "minSimilarity=" + minSimilarity + ",\n" +
		  "levenshteinSimilarity=" + levenshteinSimilarity + ",\n" +
		  "alternativeNamesSimilarity=" + altNamesSimilarity + ",\n" +
		  "similarNames=" + similarNames 
		);


}
