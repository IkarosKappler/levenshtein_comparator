
@date 2014-09-10


Compare two Names using Levenshtein Distance
--------------------------------------------
http://en.wikipedia.org/wiki/Levenshtein_distance



The function call

   StringUtils.similarNames( strA, strB, minSimilarity )

returns true if the two strings strA and strB are similar (regarding the 
passed minimal similarity in [0.0 .. 1.0]), false otherwise.


Note that different modifications of the names are used (no commas, no
colons, no white space, no 'Mr', 'Mr.', 'Ms', 'Jr', and so on ...).



