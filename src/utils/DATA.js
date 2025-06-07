questionData: question: content: "<p>Given two integers <code>n</code> and <code>k</code>, return <em>all possible combinations of</em> <code>k</code> <em>numbers chosen from the range</em> <code>[1, n]</code>.</p>\n\n<p>You may return the answer in <strong>any order</strong>.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example : /strong></p>\n\n<pre>\n<strong>Inp : /strong> n = 4, k = 2\n<strong>Outp : /strong> [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]\n<strong>Explanati : /strong> There are 4 choose 2 = 6 total combinations.\nNote that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.\n</pre>\n\n<p><strong class=\"example\">Example : /strong></p>\n\n<pre>\n<strong>Inp : /strong> n = 1, k = 1\n<strong>Outp : /strong> [[1]]\n<strong>Explanati : /strong> There is 1 choose 1 = 1 total combination.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constrain : /strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 20</code></li>\n\t<li><code>1 &lt;= k &lt;= n</code></li>\n</ul>\n"
difficulty: "Medium"
questionId: "77"
title: "Combinations"
titleSlug: "combinations"

leetcodeData: submissionDetails: code: "class Solution {\npublic:\n    vector<vector<int>> output;\n    int n;\n    // Approach: recursive backtracking + pruning\n    void solve(int i, int k, vector<int> &temp){\n        if(k == 0){\n            output.push_back(temp);\n            return;\n        }\n        int nextSize = (n+1)-i;\n        if(i > n || nextSize < k) return;\n\n        temp.push_back(i);\n        solve(i+1, k-1, temp);\n        temp.pop_back();\n\n        solve(i+1, k, temp);\n    }\n    vector<vector<int>> combine(int n, int k) {\n        this -> n = n;\n        vector<int> temp;\n        solve(1, k, temp);\n\n        return output;\n    }\n};"
id: 1655830762
lang: name: "cpp"
question: questionId: "77"
title: "Combinations"
titleSlug: "combinations"