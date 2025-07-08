const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const { GoogleGenerativeAI } = require('@google/generative-ai')

const app = express()
app.use(cors())
app.use(bodyParser.json())

console.log('ENV KEY:', process.env.GEMINI_API_KEY ?? 'NOT SET')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

app.post('/analyze', async (req, res) => {
  const { code } = req.body

  if (!code) return res.status(400).json({ error: 'Code is required'})

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite-preview-06-17' })

    const prompt = `
    You are a software performance expert. Your job is to analyze **any code** (in any language) and return:
    - Time Complexity (Best / Average / Worst Case)
    - Space Complexity (Best / Average / Worst Case)
    - Optimization Hints (if any)
    
    ⚠️ Strictly respond in this JSON format:
    {
      "timeComplexity": {
        "bestCase": "...",
        "averageCase": "...",
        "worstCase": "..."
      },
      "spaceComplexity": {
        "bestCase": "...",
        "averageCase": "...",
        "worstCase": "..."
      },
      "optimization": "..."
    }
    
    ---
    
    ### Examples with Hints & Optimizations:
    
    Example 1:
    \`\`\`python
    def binary_search(arr, x):
      left, right = 0, len(arr) - 1
      while left <= right:
        mid = (left + right) // 2
        if arr[mid] == x:
          return mid
        elif arr[mid] < x:
          left = mid + 1
        else:
          right = mid - 1
      return -1
    \`\`\`
    
    JSON:
    {
      "timeComplexity": {
        "bestCase": "O(1)",
        "averageCase": "O(log n)",
        "worstCase": "O(log n)"
      },
      "spaceComplexity": {
        "bestCase": "O(1)",
        "averageCase": "O(1)",
        "worstCase": "O(1)"
      },
      "optimization": "Already optimal. Uses no extra space and avoids recursion stack. Ensure input is sorted to maintain guarantees."
    }
    
    ---
    
    Example 2:
    \`\`\`cpp
    vector<vector<int>> combine(int n, int k) {
      vector<vector<int>> result;
      vector<int> temp;
      function<void(int)> backtrack = [&](int start) {
        if (temp.size() == k) {
          result.push_back(temp);
          return;
        }
        for (int i = start; i <= n; ++i) {
          temp.push_back(i);
          backtrack(i + 1);
          temp.pop_back();
        }
      };
      backtrack(1);
      return result;
    }
    \`\`\`
    
    JSON:
    {
      "timeComplexity": {
        "bestCase": "O(1)",
        "averageCase": "O(C(n, k))",
        "worstCase": "O(C(n, k))"
      },
      "spaceComplexity": {
        "bestCase": "O(k)",
        "averageCase": "O(k + C(n, k))",
        "worstCase": "O(k + C(n, k))"
      },
      "optimization": "Consider adding pruning conditions like (n - i + 1 < k - temp.size()) to skip unnecessary branches. Also, memoization isn't useful here, but early termination helps."
    }
    
    ---
    
    Now analyze this:
    \`\`\`
    ${code}
    \`\`\`
    `;
    

    const result = await model.generateContent(prompt)
    const raw = result.response.text()

    const jsonStart = raw.indexOf('{')
    const jsonEnd = raw.lastIndexOf('}')
    const jsonString = raw.substring(jsonStart, jsonEnd + 1)
    const json = JSON.parse(jsonString)

    res.json(json)
  } catch (error) {
    console.error('Gemini Analysis Error:', error)
    res.status(500).json({
      error: 'Failed to analyze code',
      details: error.message,
    })
  }
})

const PORT = 3000
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
