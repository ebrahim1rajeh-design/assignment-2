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

  // At the end of binary search, missing count matches at left + k
  return left + k;
};

// Test cases
if (require.main === module) {
  console.log("arr = [2,3,4,7,11], k = 5 => Result:", findKthPositive([2, 3, 4, 7, 11], 5), "(Expected: 9)");
  console.log("arr = [1,2,3,4], k = 2 => Result:", findKthPositive([1, 2, 3, 4], 2), "(Expected: 6)");
  console.log("arr = [5,6,7,8,9], k = 3 => Result:", findKthPositive([5, 6, 7, 8, 9], 3), "(Expected: 3)");
}

module.exports = findKthPositive;

