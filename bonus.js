/**
 * LeetCode Problem #1539: Kth Missing Positive Number
 * Problem URL: https://leetcode.com/problems/kth-missing-positive-number/
 * 
 * Given an array `arr` of positive integers sorted in a strictly increasing order,
 * and an integer `k`.
 * Return the kth positive integer that is missing from this array.
 * 
 * Approach: Binary Search - O(log n) Time Complexity, O(1) Space Complexity
 * 
 * Explanation:
 * For any index `mid`, the number of positive integers that should be present up to arr[mid]
 * without any missing numbers is `arr[mid]`.
 * The actual number of elements present is `mid + 1`.
 * Therefore, the count of missing numbers before index `mid` is:
 *    missing = arr[mid] - (mid + 1)
 * 
 * If missing < k:
 *    The k-th missing number is strictly to the right of `mid`, so we search in [mid + 1, right].
 * If missing >= k:
 *    The k-th missing number is to the left of `mid`, so we search in [left, mid - 1].
 * 
 * At the end of the binary search, `left` will be at the index where the k-th missing number
 * lies. The answer is `left + k`.
 * 
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function(arr, k) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const missingCount = arr[mid] - (mid + 1);

    if (missingCount < k) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // Answer is left + k
  return left + k;
};

// ==========================================
// Test Cases
// ==========================================
if (require.main === module) {
  console.log("=== Testing LeetCode 1539: Kth Missing Positive Number ===");

  // Example 1:
  // arr = [2,3,4,7,11], k = 5 -> Missing: [1, 5, 6, 8, 9, 10, 12, ...], 5th missing is 9
  const test1 = findKthPositive([2, 3, 4, 7, 11], 5);
  console.log(`Test 1: arr = [2,3,4,7,11], k = 5 => Result: ${test1} (Expected: 9)`);

  // Example 2:
  // arr = [1,2,3,4], k = 2 -> Missing: [5, 6, 7, ...], 2nd missing is 6
  const test2 = findKthPositive([1, 2, 3, 4], 2);
  console.log(`Test 2: arr = [1,2,3,4], k = 2 => Result: ${test2} (Expected: 6)`);

  // Example 3:
  // arr = [5,6,7,8,9], k = 3 -> Missing: [1, 2, 3, 4], 3rd missing is 3
  const test3 = findKthPositive([5, 6, 7, 8, 9], 3);
  console.log(`Test 3: arr = [5,6,7,8,9], k = 3 => Result: ${test3} (Expected: 3)`);
}

module.exports = findKthPositive;

