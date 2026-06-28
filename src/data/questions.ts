export interface Question {
  id: number;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: string;
  solution: string;
  expectedOutput: string;
  hints: string[];
  explanation: string;
  tags: string[];
}

export const categories = [
  'Arrays & Strings',
  'Linked Lists',
  'Stacks & Queues',
  'Trees & Graphs',
  'Sorting & Searching',
  'Recursion',
  'OOP Concepts',
  'Design Patterns',
  'HashMap & Sets',
  'Dynamic Programming',
];

export const questions: Question[] = [
  // ===== ARRAYS & STRINGS =====
  {
    id: 1,
    title: 'Reverse an Array',
    category: 'Arrays & Strings',
    difficulty: 'Easy',
    description: 'Write a method that reverses an integer array in-place. Do not use any built-in reverse methods. Return the reversed array.',
    starterCode: `public class Solution {
    public static int[] reverseArray(int[] arr) {
        // Your code here
        return arr;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int[] result = reverseArray(arr);
        for (int num : result) {
            System.out.print(num + " ");
        }
    }
}`,
    solution: `public class Solution {
    public static int[] reverseArray(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
        return arr;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int[] result = reverseArray(arr);
        for (int num : result) {
            System.out.print(num + " ");
        }
    }
}`,
    expectedOutput: '5 4 3 2 1',
    hints: ['Use two pointers - one at the start and one at the end', 'Swap elements and move pointers towards each other'],
    explanation: 'We use a two-pointer technique. Start with one pointer at the beginning and one at the end. Swap the elements at these pointers and move them towards each other until they meet. Time complexity: O(n), Space: O(1).',
    tags: ['arrays', 'two-pointers'],
  },
  {
    id: 2,
    title: 'Find Maximum Element',
    category: 'Arrays & Strings',
    difficulty: 'Easy',
    description: 'Write a method to find the maximum element in an integer array without using any built-in methods like Arrays.sort() or Collections.max().',
    starterCode: `public class Solution {
    public static int findMax(int[] arr) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        int[] arr = {3, 7, 2, 9, 1, 5};
        System.out.println(findMax(arr));
    }
}`,
    solution: `public class Solution {
    public static int findMax(int[] arr) {
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }

    public static void main(String[] args) {
        int[] arr = {3, 7, 2, 9, 1, 5};
        System.out.println(findMax(arr));
    }
}`,
    expectedOutput: '9',
    hints: ['Start by assuming the first element is the maximum', 'Iterate through the array comparing each element'],
    explanation: 'Initialize max with the first element. Then iterate through the rest of the array, updating max whenever we find a larger element. Time complexity: O(n).',
    tags: ['arrays', 'iteration'],
  },
  {
    id: 3,
    title: 'Check Palindrome String',
    category: 'Arrays & Strings',
    difficulty: 'Easy',
    description: 'Write a method that checks if a given string is a palindrome (reads the same forwards and backwards). Ignore case sensitivity.',
    starterCode: `public class Solution {
    public static boolean isPalindrome(String s) {
        // Your code here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("Racecar"));
        System.out.println(isPalindrome("Hello"));
    }
}`,
    solution: `public class Solution {
    public static boolean isPalindrome(String s) {
        s = s.toLowerCase();
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("Racecar"));
        System.out.println(isPalindrome("Hello"));
    }
}`,
    expectedOutput: 'true\nfalse',
    hints: ['Convert the string to lowercase first', 'Use two pointers from both ends'],
    explanation: 'Convert to lowercase for case-insensitive comparison. Use two pointers from both ends, comparing characters. If any mismatch is found, it\'s not a palindrome. Time complexity: O(n).',
    tags: ['strings', 'two-pointers'],
  },
  {
    id: 4,
    title: 'Count Vowels in String',
    category: 'Arrays & Strings',
    difficulty: 'Easy',
    description: 'Write a method that counts the number of vowels (a, e, i, o, u) in a given string. Consider both uppercase and lowercase vowels.',
    starterCode: `public class Solution {
    public static int countVowels(String s) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(countVowels("Euromonitor International"));
    }
}`,
    solution: `public class Solution {
    public static int countVowels(String s) {
        int count = 0;
        String vowels = "aeiouAEIOU";
        for (int i = 0; i < s.length(); i++) {
            if (vowels.indexOf(s.charAt(i)) != -1) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        System.out.println(countVowels("Euromonitor International"));
    }
}`,
    expectedOutput: '11',
    hints: ['Create a string of vowels to check against', 'Iterate through each character'],
    explanation: 'Iterate through each character and check if it\'s a vowel by comparing against a predefined set of vowels. Time complexity: O(n).',
    tags: ['strings', 'counting'],
  },
  {
    id: 5,
    title: 'Two Sum Problem',
    category: 'Arrays & Strings',
    difficulty: 'Easy',
    description: 'Given an array of integers and a target sum, find two numbers that add up to the target. Print their indices.',
    starterCode: `public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int[] result = twoSum(nums, 9);
        System.out.println(result[0] + " " + result[1]);
    }
}`,
    solution: `import java.util.HashMap;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int[] result = twoSum(nums, 9);
        System.out.println(result[0] + " " + result[1]);
    }
}`,
    expectedOutput: '0 1',
    hints: ['Use a HashMap to store values and their indices', 'For each number, check if the complement (target - num) exists in the map'],
    explanation: 'Use a HashMap to store each number and its index. For each number, calculate the complement (target - current number) and check if it already exists in the map. This gives us O(n) time complexity.',
    tags: ['arrays', 'hashmap'],
  },
  {
    id: 6,
    title: 'Remove Duplicates from Array',
    category: 'Arrays & Strings',
    difficulty: 'Easy',
    description: 'Write a method to remove duplicate elements from a sorted array in-place and return the number of unique elements.',
    starterCode: `public class Solution {
    public static int removeDuplicates(int[] arr) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        int[] arr = {1, 1, 2, 2, 3, 4, 4, 5};
        int uniqueCount = removeDuplicates(arr);
        for (int i = 0; i < uniqueCount; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}`,
    solution: `public class Solution {
    public static int removeDuplicates(int[] arr) {
        if (arr.length == 0) return 0;
        int j = 0;
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] != arr[j]) {
                j++;
                arr[j] = arr[i];
            }
        }
        return j + 1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 1, 2, 2, 3, 4, 4, 5};
        int uniqueCount = removeDuplicates(arr);
        for (int i = 0; i < uniqueCount; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}`,
    expectedOutput: '1 2 3 4 5',
    hints: ['Since the array is sorted, duplicates are adjacent', 'Use a slow pointer to track unique elements'],
    explanation: 'Use two pointers: a slow pointer j that tracks the position of the last unique element, and a fast pointer i that scans the array. When a new unique element is found, increment j and place it there. Time: O(n), Space: O(1).',
    tags: ['arrays', 'two-pointers'],
  },
  {
    id: 7,
    title: 'String Anagram Check',
    category: 'Arrays & Strings',
    difficulty: 'Easy',
    description: 'Write a method to check if two strings are anagrams of each other (contain the same characters with the same frequency).',
    starterCode: `public class Solution {
    public static boolean isAnagram(String s1, String s2) {
        // Your code here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("listen", "silent"));
        System.out.println(isAnagram("hello", "world"));
    }
}`,
    solution: `public class Solution {
    public static boolean isAnagram(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s1.length(); i++) {
            count[s1.charAt(i) - 'a']++;
            count[s2.charAt(i) - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("listen", "silent"));
        System.out.println(isAnagram("hello", "world"));
    }
}`,
    expectedOutput: 'true\nfalse',
    hints: ['If lengths differ, they can\'t be anagrams', 'Use a character frequency array of size 26'],
    explanation: 'Use a frequency array of 26 characters. Increment for chars in s1, decrement for s2. If all counts are zero, they\'re anagrams. Time: O(n), Space: O(1).',
    tags: ['strings', 'frequency-counting'],
  },
  {
    id: 8,
    title: 'Rotate Array by K Positions',
    category: 'Arrays & Strings',
    difficulty: 'Medium',
    description: 'Write a method to rotate an array to the right by k positions.',
    starterCode: `public class Solution {
    public static void rotateArray(int[] arr, int k) {
        // Your code here
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        rotateArray(arr, 3);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
    solution: `public class Solution {
    public static void rotateArray(int[] arr, int k) {
        k = k % arr.length;
        reverse(arr, 0, arr.length - 1);
        reverse(arr, 0, k - 1);
        reverse(arr, k, arr.length - 1);
    }

    private static void reverse(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        rotateArray(arr, 3);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
    expectedOutput: '5 6 7 1 2 3 4',
    hints: ['Use the reverse technique: reverse entire array, then reverse first k, then reverse rest', 'Handle k > array length by using modulo'],
    explanation: 'The reverse approach: 1) Reverse the entire array, 2) Reverse the first k elements, 3) Reverse the remaining elements. This gives O(n) time and O(1) space.',
    tags: ['arrays', 'in-place'],
  },
  // ===== LINKED LISTS =====
  {
    id: 9,
    title: 'Implement a Singly Linked List',
    category: 'Linked Lists',
    difficulty: 'Easy',
    description: 'Implement a basic singly linked list with methods to add at the end and display all elements.',
    starterCode: `public class Solution {
    static class Node {
        int data;
        Node next;
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    static class LinkedList {
        Node head;

        public void addLast(int data) {
            // Your code here
        }

        public void display() {
            // Your code here
        }
    }

    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.addLast(10);
        list.addLast(20);
        list.addLast(30);
        list.display();
    }
}`,
    solution: `public class Solution {
    static class Node {
        int data;
        Node next;
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    static class LinkedList {
        Node head;

        public void addLast(int data) {
            Node newNode = new Node(data);
            if (head == null) {
                head = newNode;
                return;
            }
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }

        public void display() {
            Node current = head;
            while (current != null) {
                System.out.print(current.data + " -> ");
                current = current.next;
            }
            System.out.println("null");
        }
    }

    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.addLast(10);
        list.addLast(20);
        list.addLast(30);
        list.display();
    }
}`,
    expectedOutput: '10 -> 20 -> 30 -> null',
    hints: ['For addLast, traverse to the last node and attach the new node', 'Handle the case when the list is empty (head is null)'],
    explanation: 'A singly linked list stores data in nodes, each pointing to the next. To add at the end, traverse to the last node and set its next pointer to the new node. Display traverses from head to null.',
    tags: ['linked-list', 'data-structures'],
  },
  {
    id: 10,
    title: 'Reverse a Linked List',
    category: 'Linked Lists',
    difficulty: 'Medium',
    description: 'Write a method to reverse a singly linked list iteratively.',
    starterCode: `public class Solution {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }

    public static Node reverse(Node head) {
        // Your code here
        return head;
    }

    public static void main(String[] args) {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        head.next.next.next = new Node(4);

        head = reverse(head);
        Node curr = head;
        while (curr != null) {
            System.out.print(curr.data + " ");
            curr = curr.next;
        }
    }
}`,
    solution: `public class Solution {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }

    public static Node reverse(Node head) {
        Node prev = null;
        Node current = head;
        while (current != null) {
            Node next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }

    public static void main(String[] args) {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        head.next.next.next = new Node(4);

        head = reverse(head);
        Node curr = head;
        while (curr != null) {
            System.out.print(curr.data + " ");
            curr = curr.next;
        }
    }
}`,
    expectedOutput: '4 3 2 1',
    hints: ['Use three pointers: prev, current, and next', 'At each step, reverse the current node\'s pointer to point to prev'],
    explanation: 'Use three pointers to iteratively reverse each link. For each node, save the next node, point current to prev, then advance prev and current. Time: O(n), Space: O(1).',
    tags: ['linked-list', 'pointers'],
  },
  {
    id: 11,
    title: 'Find Middle of Linked List',
    category: 'Linked Lists',
    difficulty: 'Easy',
    description: 'Find the middle element of a singly linked list using the slow and fast pointer technique.',
    starterCode: `public class Solution {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }

    public static int findMiddle(Node head) {
        // Your code here
        return -1;
    }

    public static void main(String[] args) {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        head.next.next.next = new Node(4);
        head.next.next.next.next = new Node(5);
        System.out.println(findMiddle(head));
    }
}`,
    solution: `public class Solution {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }

    public static int findMiddle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow.data;
    }

    public static void main(String[] args) {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        head.next.next.next = new Node(4);
        head.next.next.next.next = new Node(5);
        System.out.println(findMiddle(head));
    }
}`,
    expectedOutput: '3',
    hints: ['Use slow and fast pointers', 'Fast moves 2 steps, slow moves 1 step'],
    explanation: 'The slow pointer moves one step while the fast pointer moves two steps. When fast reaches the end, slow is at the middle. Time: O(n), Space: O(1).',
    tags: ['linked-list', 'two-pointers'],
  },
  {
    id: 12,
    title: 'Detect Cycle in Linked List',
    category: 'Linked Lists',
    difficulty: 'Medium',
    description: 'Write a method to detect if a linked list has a cycle using Floyd\'s cycle detection algorithm.',
    starterCode: `public class Solution {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }

    public static boolean hasCycle(Node head) {
        // Your code here
        return false;
    }

    public static void main(String[] args) {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        head.next.next.next = new Node(4);
        head.next.next.next.next = head.next; // Creates cycle

        System.out.println(hasCycle(head));
    }
}`,
    solution: `public class Solution {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }

    public static boolean hasCycle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        head.next.next.next = new Node(4);
        head.next.next.next.next = head.next;

        System.out.println(hasCycle(head));
    }
}`,
    expectedOutput: 'true',
    hints: ['Use Floyd\'s tortoise and hare algorithm', 'If slow and fast pointers meet, there\'s a cycle'],
    explanation: 'Floyd\'s algorithm uses two pointers at different speeds. If there\'s a cycle, the fast pointer will eventually catch up to the slow pointer. Time: O(n), Space: O(1).',
    tags: ['linked-list', 'cycle-detection'],
  },
  // ===== STACKS & QUEUES =====
  {
    id: 13,
    title: 'Implement Stack using Array',
    category: 'Stacks & Queues',
    difficulty: 'Easy',
    description: 'Implement a stack data structure using an array with push, pop, and peek operations.',
    starterCode: `public class Solution {
    static class Stack {
        int[] arr;
        int top;

        Stack(int capacity) {
            arr = new int[capacity];
            top = -1;
        }

        public void push(int val) {
            // Your code here
        }

        public int pop() {
            // Your code here
            return -1;
        }

        public int peek() {
            // Your code here
            return -1;
        }
    }

    public static void main(String[] args) {
        Stack stack = new Stack(10);
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println(stack.peek());
        System.out.println(stack.pop());
        System.out.println(stack.peek());
    }
}`,
    solution: `public class Solution {
    static class Stack {
        int[] arr;
        int top;

        Stack(int capacity) {
            arr = new int[capacity];
            top = -1;
        }

        public void push(int val) {
            arr[++top] = val;
        }

        public int pop() {
            return arr[top--];
        }

        public int peek() {
            return arr[top];
        }
    }

    public static void main(String[] args) {
        Stack stack = new Stack(10);
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println(stack.peek());
        System.out.println(stack.pop());
        System.out.println(stack.peek());
    }
}`,
    expectedOutput: '30\n30\n20',
    hints: ['Use top pointer to track the current position', 'Push increments top, pop decrements it'],
    explanation: 'Stack follows LIFO. Push places element at top+1, pop removes from top. Peek returns the top element without removing it. All operations are O(1).',
    tags: ['stack', 'data-structures'],
  },
  {
    id: 14,
    title: 'Balanced Parentheses',
    category: 'Stacks & Queues',
    difficulty: 'Easy',
    description: 'Check if a string of parentheses (), {}, [] is balanced using a stack.',
    starterCode: `import java.util.Stack;

public class Solution {
    public static boolean isBalanced(String s) {
        // Your code here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isBalanced("{[()]}"));
        System.out.println(isBalanced("{[(])}"));
        System.out.println(isBalanced("((()))"));
    }
}`,
    solution: `import java.util.Stack;

public class Solution {
    public static boolean isBalanced(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isBalanced("{[()]}"));
        System.out.println(isBalanced("{[(])}"));
        System.out.println(isBalanced("((()))"));
    }
}`,
    expectedOutput: 'true\nfalse\ntrue',
    hints: ['Push opening brackets onto the stack', 'For closing brackets, check if the top of stack has the matching opening bracket'],
    explanation: 'Push opening brackets onto the stack. For each closing bracket, pop and check if it matches. At the end, the stack should be empty. Time: O(n), Space: O(n).',
    tags: ['stack', 'strings'],
  },
  {
    id: 15,
    title: 'Implement Queue using Two Stacks',
    category: 'Stacks & Queues',
    difficulty: 'Medium',
    description: 'Implement a queue using two stacks with enqueue and dequeue operations.',
    starterCode: `import java.util.Stack;

public class Solution {
    static class QueueUsingStacks {
        Stack<Integer> stack1 = new Stack<>();
        Stack<Integer> stack2 = new Stack<>();

        public void enqueue(int val) {
            // Your code here
        }

        public int dequeue() {
            // Your code here
            return -1;
        }
    }

    public static void main(String[] args) {
        QueueUsingStacks q = new QueueUsingStacks();
        q.enqueue(1);
        q.enqueue(2);
        q.enqueue(3);
        System.out.println(q.dequeue());
        System.out.println(q.dequeue());
        q.enqueue(4);
        System.out.println(q.dequeue());
    }
}`,
    solution: `import java.util.Stack;

public class Solution {
    static class QueueUsingStacks {
        Stack<Integer> stack1 = new Stack<>();
        Stack<Integer> stack2 = new Stack<>();

        public void enqueue(int val) {
            stack1.push(val);
        }

        public int dequeue() {
            if (stack2.isEmpty()) {
                while (!stack1.isEmpty()) {
                    stack2.push(stack1.pop());
                }
            }
            return stack2.pop();
        }
    }

    public static void main(String[] args) {
        QueueUsingStacks q = new QueueUsingStacks();
        q.enqueue(1);
        q.enqueue(2);
        q.enqueue(3);
        System.out.println(q.dequeue());
        System.out.println(q.dequeue());
        q.enqueue(4);
        System.out.println(q.dequeue());
    }
}`,
    expectedOutput: '1\n2\n3',
    hints: ['Use one stack for enqueue and transfer to another for dequeue', 'Only transfer elements when the dequeue stack is empty'],
    explanation: 'Push to stack1 for enqueue. For dequeue, if stack2 is empty, pour all elements from stack1 to stack2 (reversing order), then pop from stack2. Amortized O(1) per operation.',
    tags: ['stack', 'queue', 'design'],
  },
  {
    id: 16,
    title: 'Min Stack',
    category: 'Stacks & Queues',
    difficulty: 'Medium',
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    starterCode: `import java.util.Stack;

public class Solution {
    static class MinStack {
        Stack<Integer> mainStack = new Stack<>();
        Stack<Integer> minStack = new Stack<>();

        public void push(int val) {
            // Your code here
        }

        public int pop() {
            // Your code here
            return -1;
        }

        public int getMin() {
            // Your code here
            return -1;
        }
    }

    public static void main(String[] args) {
        MinStack ms = new MinStack();
        ms.push(5);
        ms.push(3);
        ms.push(7);
        ms.push(1);
        System.out.println(ms.getMin());
        ms.pop();
        System.out.println(ms.getMin());
    }
}`,
    solution: `import java.util.Stack;

public class Solution {
    static class MinStack {
        Stack<Integer> mainStack = new Stack<>();
        Stack<Integer> minStack = new Stack<>();

        public void push(int val) {
            mainStack.push(val);
            if (minStack.isEmpty() || val <= minStack.peek()) {
                minStack.push(val);
            }
        }

        public int pop() {
            int val = mainStack.pop();
            if (val == minStack.peek()) {
                minStack.pop();
            }
            return val;
        }

        public int getMin() {
            return minStack.peek();
        }
    }

    public static void main(String[] args) {
        MinStack ms = new MinStack();
        ms.push(5);
        ms.push(3);
        ms.push(7);
        ms.push(1);
        System.out.println(ms.getMin());
        ms.pop();
        System.out.println(ms.getMin());
    }
}`,
    expectedOutput: '1\n3',
    hints: ['Use an auxiliary stack to track minimums', 'Push to min stack when the value is less than or equal to current min'],
    explanation: 'Maintain an auxiliary min stack. Push to min stack only when the value is <= current minimum. When popping, also pop from min stack if the value equals the current minimum. All ops are O(1).',
    tags: ['stack', 'design'],
  },
  // ===== SORTING & SEARCHING =====
  {
    id: 17,
    title: 'Bubble Sort',
    category: 'Sorting & Searching',
    difficulty: 'Easy',
    description: 'Implement the bubble sort algorithm to sort an array of integers in ascending order.',
    starterCode: `public class Solution {
    public static void bubbleSort(int[] arr) {
        // Your code here
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
    solution: `public class Solution {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
    expectedOutput: '11 12 22 25 34 64 90',
    hints: ['Compare adjacent elements and swap if they are in wrong order', 'Use a flag to optimize - stop if no swaps occurred in a pass'],
    explanation: 'Bubble sort repeatedly swaps adjacent elements if they are in wrong order. The optimization flag breaks early if the array is already sorted. Time: O(n²) worst case, O(n) best case.',
    tags: ['sorting', 'comparison'],
  },
  {
    id: 18,
    title: 'Binary Search',
    category: 'Sorting & Searching',
    difficulty: 'Easy',
    description: 'Implement binary search to find the index of a target element in a sorted array. Return -1 if not found.',
    starterCode: `public class Solution {
    public static int binarySearch(int[] arr, int target) {
        // Your code here
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println(binarySearch(arr, 23));
        System.out.println(binarySearch(arr, 50));
    }
}`,
    solution: `public class Solution {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println(binarySearch(arr, 23));
        System.out.println(binarySearch(arr, 50));
    }
}`,
    expectedOutput: '5\n-1',
    hints: ['Use left and right pointers to narrow the search space', 'Compare with middle element and eliminate half the array'],
    explanation: 'Binary search halves the search space each iteration by comparing the middle element with the target. Time: O(log n), Space: O(1). Array must be sorted.',
    tags: ['searching', 'divide-and-conquer'],
  },
  {
    id: 19,
    title: 'Selection Sort',
    category: 'Sorting & Searching',
    difficulty: 'Easy',
    description: 'Implement selection sort algorithm to sort an array in ascending order.',
    starterCode: `public class Solution {
    public static void selectionSort(int[] arr) {
        // Your code here
    }

    public static void main(String[] args) {
        int[] arr = {29, 10, 14, 37, 13};
        selectionSort(arr);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
    solution: `public class Solution {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {
        int[] arr = {29, 10, 14, 37, 13};
        selectionSort(arr);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
    expectedOutput: '10 13 14 29 37',
    hints: ['Find the minimum element in the unsorted part', 'Swap it with the first unsorted element'],
    explanation: 'Selection sort finds the minimum element from the unsorted part and swaps it with the first unsorted position. Time: O(n²) for all cases, Space: O(1).',
    tags: ['sorting', 'selection'],
  },
  {
    id: 20,
    title: 'Merge Sort',
    category: 'Sorting & Searching',
    difficulty: 'Medium',
    description: 'Implement the merge sort algorithm using divide and conquer.',
    starterCode: `public class Solution {
    public static void mergeSort(int[] arr, int left, int right) {
        // Your code here
    }

    public static void merge(int[] arr, int left, int mid, int right) {
        // Your code here
    }

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(arr, 0, arr.length - 1);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
    solution: `public class Solution {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    public static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        int[] L = new int[n1];
        int[] R = new int[n2];
        for (int i = 0; i < n1; i++) L[i] = arr[left + i];
        for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(arr, 0, arr.length - 1);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
    expectedOutput: '3 9 10 27 38 43 82',
    hints: ['Divide the array into two halves recursively', 'Merge two sorted halves into one sorted array'],
    explanation: 'Merge sort divides the array into halves, recursively sorts each half, then merges them. The merge step combines two sorted arrays into one. Time: O(n log n), Space: O(n).',
    tags: ['sorting', 'divide-and-conquer', 'recursion'],
  },
  // ===== RECURSION =====
  {
    id: 21,
    title: 'Factorial using Recursion',
    category: 'Recursion',
    difficulty: 'Easy',
    description: 'Write a recursive method to calculate the factorial of a number.',
    starterCode: `public class Solution {
    public static long factorial(int n) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(factorial(5));
        System.out.println(factorial(0));
        System.out.println(factorial(10));
    }
}`,
    solution: `public class Solution {
    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(5));
        System.out.println(factorial(0));
        System.out.println(factorial(10));
    }
}`,
    expectedOutput: '120\n1\n3628800',
    hints: ['Base case: factorial of 0 or 1 is 1', 'Recursive case: n * factorial(n-1)'],
    explanation: 'The factorial function has a base case (n <= 1 returns 1) and recursive case (n * factorial(n-1)). Each recursive call reduces the problem until we reach the base case. Time: O(n), Space: O(n) for call stack.',
    tags: ['recursion', 'math'],
  },
  {
    id: 22,
    title: 'Fibonacci Series',
    category: 'Recursion',
    difficulty: 'Easy',
    description: 'Write a method to print the first N numbers of the Fibonacci series.',
    starterCode: `public class Solution {
    public static int fibonacci(int n) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
    }
}`,
    solution: `public class Solution {
    public static int fibonacci(int n) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
    }
}`,
    expectedOutput: '0 1 1 2 3 5 8 13 21 34',
    hints: ['Base cases: fib(0) = 0, fib(1) = 1', 'Recursive case: fib(n) = fib(n-1) + fib(n-2)'],
    explanation: 'Fibonacci has two base cases (0 and 1) and each subsequent number is the sum of the previous two. The recursive version is O(2^n) time but is intuitive. Iterative or memoized version is preferred for large n.',
    tags: ['recursion', 'dynamic-programming'],
  },
  {
    id: 23,
    title: 'Power Function (Recursive)',
    category: 'Recursion',
    difficulty: 'Easy',
    description: 'Implement a recursive power function that calculates base^exponent without using Math.pow().',
    starterCode: `public class Solution {
    public static long power(int base, int exp) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(power(2, 10));
        System.out.println(power(3, 4));
        System.out.println(power(5, 0));
    }
}`,
    solution: `public class Solution {
    public static long power(int base, int exp) {
        if (exp == 0) return 1;
        return base * power(base, exp - 1);
    }

    public static void main(String[] args) {
        System.out.println(power(2, 10));
        System.out.println(power(3, 4));
        System.out.println(power(5, 0));
    }
}`,
    expectedOutput: '1024\n81\n1',
    hints: ['Base case: any number to the power of 0 is 1', 'Recursive case: base * power(base, exp - 1)'],
    explanation: 'The base case is exponent = 0 (returns 1). Each recursive call multiplies the base and reduces the exponent by 1. Time: O(exp), can be optimized to O(log exp) with fast exponentiation.',
    tags: ['recursion', 'math'],
  },
  {
    id: 24,
    title: 'Sum of Digits (Recursive)',
    category: 'Recursion',
    difficulty: 'Easy',
    description: 'Write a recursive method to find the sum of digits of a positive integer.',
    starterCode: `public class Solution {
    public static int sumOfDigits(int n) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(sumOfDigits(12345));
        System.out.println(sumOfDigits(9999));
    }
}`,
    solution: `public class Solution {
    public static int sumOfDigits(int n) {
        if (n == 0) return 0;
        return (n % 10) + sumOfDigits(n / 10);
    }

    public static void main(String[] args) {
        System.out.println(sumOfDigits(12345));
        System.out.println(sumOfDigits(9999));
    }
}`,
    expectedOutput: '15\n36',
    hints: ['Use n % 10 to get the last digit', 'Use n / 10 to remove the last digit'],
    explanation: 'Extract the last digit with n%10, add it to the recursive call with n/10 (which removes the last digit). Base case: n=0. Time: O(d) where d is the number of digits.',
    tags: ['recursion', 'math'],
  },
  {
    id: 25,
    title: 'Tower of Hanoi',
    category: 'Recursion',
    difficulty: 'Medium',
    description: 'Solve the Tower of Hanoi problem for N disks. Print each move as "Move disk from [source] to [destination]".',
    starterCode: `public class Solution {
    public static void towerOfHanoi(int n, char from, char to, char aux) {
        // Your code here
    }

    public static void main(String[] args) {
        towerOfHanoi(3, 'A', 'C', 'B');
    }
}`,
    solution: `public class Solution {
    public static void towerOfHanoi(int n, char from, char to, char aux) {
        if (n == 1) {
            System.out.println("Move disk 1 from " + from + " to " + to);
            return;
        }
        towerOfHanoi(n - 1, from, aux, to);
        System.out.println("Move disk " + n + " from " + from + " to " + to);
        towerOfHanoi(n - 1, aux, to, from);
    }

    public static void main(String[] args) {
        towerOfHanoi(3, 'A', 'C', 'B');
    }
}`,
    expectedOutput: 'Move disk 1 from A to C\nMove disk 2 from A to B\nMove disk 1 from C to B\nMove disk 3 from A to C\nMove disk 1 from B to A\nMove disk 2 from B to C\nMove disk 1 from A to C',
    hints: ['Move n-1 disks from source to auxiliary', 'Move the nth disk from source to destination', 'Move n-1 disks from auxiliary to destination'],
    explanation: 'Tower of Hanoi decomposes into: move n-1 disks to auxiliary peg, move largest disk to destination, move n-1 disks from auxiliary to destination. Time: O(2^n), which is optimal.',
    tags: ['recursion', 'classic-problem'],
  },
  // ===== OOP CONCEPTS =====
  {
    id: 26,
    title: 'Basic Class and Constructor',
    category: 'OOP Concepts',
    difficulty: 'Easy',
    description: 'Create a Student class with name and grade fields, a constructor, and a display method.',
    starterCode: `public class Solution {
    // Create the Student class here
    static class Student {
        // Fields and constructor here

        // Display method here
    }

    public static void main(String[] args) {
        Student s1 = new Student("Alice", 95);
        Student s2 = new Student("Bob", 87);
        s1.display();
        s2.display();
    }
}`,
    solution: `public class Solution {
    static class Student {
        String name;
        int grade;

        Student(String name, int grade) {
            this.name = name;
            this.grade = grade;
        }

        void display() {
            System.out.println("Name: " + name + ", Grade: " + grade);
        }
    }

    public static void main(String[] args) {
        Student s1 = new Student("Alice", 95);
        Student s2 = new Student("Bob", 87);
        s1.display();
        s2.display();
    }
}`,
    expectedOutput: 'Name: Alice, Grade: 95\nName: Bob, Grade: 87',
    hints: ['Define instance variables for name and grade', 'Use \'this\' keyword to refer to instance variables in the constructor'],
    explanation: 'Classes encapsulate data (fields) and behavior (methods). The constructor initializes the object\'s state. The \'this\' keyword distinguishes instance variables from parameters.',
    tags: ['oop', 'class', 'constructor'],
  },
  {
    id: 27,
    title: 'Inheritance and Method Overriding',
    category: 'OOP Concepts',
    difficulty: 'Easy',
    description: 'Create a Shape base class with an area() method. Create Circle and Rectangle subclasses that override area().',
    starterCode: `public class Solution {
    static class Shape {
        // Base class
        double area() {
            return 0;
        }
    }

    static class Circle extends Shape {
        double radius;
        Circle(double radius) { this.radius = radius; }
        // Override area() here
    }

    static class Rectangle extends Shape {
        double width, height;
        Rectangle(double w, double h) { this.width = w; this.height = h; }
        // Override area() here
    }

    public static void main(String[] args) {
        Shape c = new Circle(5);
        Shape r = new Rectangle(4, 6);
        System.out.printf("Circle area: %.2f%n", c.area());
        System.out.printf("Rectangle area: %.2f%n", r.area());
    }
}`,
    solution: `public class Solution {
    static class Shape {
        double area() {
            return 0;
        }
    }

    static class Circle extends Shape {
        double radius;
        Circle(double radius) { this.radius = radius; }

        @Override
        double area() {
            return Math.PI * radius * radius;
        }
    }

    static class Rectangle extends Shape {
        double width, height;
        Rectangle(double w, double h) { this.width = w; this.height = h; }

        @Override
        double area() {
            return width * height;
        }
    }

    public static void main(String[] args) {
        Shape c = new Circle(5);
        Shape r = new Rectangle(4, 6);
        System.out.printf("Circle area: %.2f%n", c.area());
        System.out.printf("Rectangle area: %.2f%n", r.area());
    }
}`,
    expectedOutput: 'Circle area: 78.54\nRectangle area: 24.00',
    hints: ['Use @Override annotation when overriding methods', 'Circle area = π * r², Rectangle area = width * height'],
    explanation: 'Inheritance allows subclasses to inherit from a parent class. Method overriding lets subclasses provide specific implementations. Polymorphism allows treating different shapes through the Shape reference.',
    tags: ['oop', 'inheritance', 'polymorphism'],
  },
  {
    id: 28,
    title: 'Encapsulation with Getters/Setters',
    category: 'OOP Concepts',
    difficulty: 'Easy',
    description: 'Create a BankAccount class with private balance field, deposit, withdraw, and getBalance methods. Validate that withdrawal doesn\'t exceed balance.',
    starterCode: `public class Solution {
    static class BankAccount {
        // Private field
        // Constructor, deposit, withdraw, getBalance methods
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000);
        account.deposit(500);
        System.out.println("Balance: " + account.getBalance());
        account.withdraw(200);
        System.out.println("Balance: " + account.getBalance());
        account.withdraw(2000);
        System.out.println("Balance: " + account.getBalance());
    }
}`,
    solution: `public class Solution {
    static class BankAccount {
        private double balance;

        BankAccount(double initialBalance) {
            this.balance = initialBalance;
        }

        public void deposit(double amount) {
            if (amount > 0) {
                balance += amount;
            }
        }

        public void withdraw(double amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
            } else {
                System.out.println("Insufficient funds!");
            }
        }

        public double getBalance() {
            return balance;
        }
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000);
        account.deposit(500);
        System.out.println("Balance: " + account.getBalance());
        account.withdraw(200);
        System.out.println("Balance: " + account.getBalance());
        account.withdraw(2000);
        System.out.println("Balance: " + account.getBalance());
    }
}`,
    expectedOutput: 'Balance: 1500.0\nBalance: 1300.0\nInsufficient funds!\nBalance: 1300.0',
    hints: ['Make balance private and provide public methods to access it', 'Validate inputs in deposit and withdraw methods'],
    explanation: 'Encapsulation hides internal state (private balance) and provides controlled access through public methods. This prevents invalid states like negative balances.',
    tags: ['oop', 'encapsulation'],
  },
  {
    id: 29,
    title: 'Abstract Class and Methods',
    category: 'OOP Concepts',
    difficulty: 'Medium',
    description: 'Create an abstract Animal class with an abstract speak() method. Implement Dog and Cat subclasses.',
    starterCode: `public class Solution {
    static abstract class Animal {
        String name;
        Animal(String name) { this.name = name; }
        // Abstract method here
        // Concrete method here
    }

    // Dog class here
    // Cat class here

    public static void main(String[] args) {
        Animal dog = new Dog("Buddy");
        Animal cat = new Cat("Whiskers");
        dog.introduce();
        dog.speak();
        cat.introduce();
        cat.speak();
    }
}`,
    solution: `public class Solution {
    static abstract class Animal {
        String name;
        Animal(String name) { this.name = name; }

        abstract void speak();

        void introduce() {
            System.out.println("I am " + name);
        }
    }

    static class Dog extends Animal {
        Dog(String name) { super(name); }

        @Override
        void speak() {
            System.out.println("Woof! Woof!");
        }
    }

    static class Cat extends Animal {
        Cat(String name) { super(name); }

        @Override
        void speak() {
            System.out.println("Meow!");
        }
    }

    public static void main(String[] args) {
        Animal dog = new Dog("Buddy");
        Animal cat = new Cat("Whiskers");
        dog.introduce();
        dog.speak();
        cat.introduce();
        cat.speak();
    }
}`,
    expectedOutput: 'I am Buddy\nWoof! Woof!\nI am Whiskers\nMeow!',
    hints: ['Use the abstract keyword for the class and the method', 'Subclasses must implement all abstract methods'],
    explanation: 'Abstract classes cannot be instantiated and may contain abstract methods (no body). Subclasses must implement all abstract methods. This provides a template for related classes.',
    tags: ['oop', 'abstract-class'],
  },
  {
    id: 30,
    title: 'Interface Implementation',
    category: 'OOP Concepts',
    difficulty: 'Medium',
    description: 'Create a Sortable interface with a sort() method. Implement it in a NumberList class that sorts an array of integers.',
    starterCode: `public class Solution {
    interface Sortable {
        void sort();
    }

    static class NumberList implements Sortable {
        int[] numbers;

        NumberList(int[] numbers) {
            this.numbers = numbers;
        }

        // Implement sort() here

        void display() {
            for (int num : numbers) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        NumberList list = new NumberList(new int[]{5, 2, 8, 1, 9, 3});
        System.out.print("Before: ");
        list.display();
        list.sort();
        System.out.print("After: ");
        list.display();
    }
}`,
    solution: `public class Solution {
    interface Sortable {
        void sort();
    }

    static class NumberList implements Sortable {
        int[] numbers;

        NumberList(int[] numbers) {
            this.numbers = numbers;
        }

        @Override
        public void sort() {
            for (int i = 0; i < numbers.length - 1; i++) {
                for (int j = 0; j < numbers.length - i - 1; j++) {
                    if (numbers[j] > numbers[j + 1]) {
                        int temp = numbers[j];
                        numbers[j] = numbers[j + 1];
                        numbers[j + 1] = temp;
                    }
                }
            }
        }

        void display() {
            for (int num : numbers) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        NumberList list = new NumberList(new int[]{5, 2, 8, 1, 9, 3});
        System.out.print("Before: ");
        list.display();
        list.sort();
        System.out.print("After: ");
        list.display();
    }
}`,
    expectedOutput: 'Before: 5 2 8 1 9 3\nAfter: 1 2 3 5 8 9',
    hints: ['Interfaces define contracts that implementing classes must follow', 'Use any sorting algorithm you know inside the sort() method'],
    explanation: 'Interfaces define a contract that implementing classes must fulfill. A class can implement multiple interfaces. The sort() method must be public when implementing an interface method.',
    tags: ['oop', 'interface'],
  },
  {
    id: 31,
    title: 'Singleton Design Pattern',
    category: 'Design Patterns',
    difficulty: 'Medium',
    description: 'Implement the Singleton design pattern for a Database connection manager class.',
    starterCode: `public class Solution {
    static class DatabaseManager {
        // Implement Singleton here
        private String connectionString;

        // Private constructor, getInstance method, connect method
    }

    public static void main(String[] args) {
        DatabaseManager db1 = DatabaseManager.getInstance();
        DatabaseManager db2 = DatabaseManager.getInstance();
        db1.connect("jdbc:mysql://localhost:3306/mydb");
        System.out.println(db1 == db2);
        System.out.println(db2.getConnectionString());
    }
}`,
    solution: `public class Solution {
    static class DatabaseManager {
        private static DatabaseManager instance;
        private String connectionString;

        private DatabaseManager() {}

        public static DatabaseManager getInstance() {
            if (instance == null) {
                instance = new DatabaseManager();
            }
            return instance;
        }

        public void connect(String connStr) {
            this.connectionString = connStr;
            System.out.println("Connected to: " + connStr);
        }

        public String getConnectionString() {
            return connectionString;
        }
    }

    public static void main(String[] args) {
        DatabaseManager db1 = DatabaseManager.getInstance();
        DatabaseManager db2 = DatabaseManager.getInstance();
        db1.connect("jdbc:mysql://localhost:3306/mydb");
        System.out.println(db1 == db2);
        System.out.println(db2.getConnectionString());
    }
}`,
    expectedOutput: 'Connected to: jdbc:mysql://localhost:3306/mydb\ntrue\njdbc:mysql://localhost:3306/mydb',
    hints: ['Make the constructor private', 'Use a static method to return the single instance'],
    explanation: 'Singleton ensures only one instance exists. Private constructor prevents direct instantiation. A static method creates the instance if it doesn\'t exist and returns it. Both references point to the same object.',
    tags: ['design-patterns', 'singleton'],
  },
  {
    id: 32,
    title: 'Factory Design Pattern',
    category: 'Design Patterns',
    difficulty: 'Medium',
    description: 'Implement the Factory design pattern to create different types of notifications (Email, SMS, Push).',
    starterCode: `public class Solution {
    interface Notification {
        void send(String message);
    }

    // Create EmailNotification, SMSNotification, PushNotification classes

    static class NotificationFactory {
        // Create factory method here
    }

    public static void main(String[] args) {
        Notification email = NotificationFactory.create("email");
        Notification sms = NotificationFactory.create("sms");
        Notification push = NotificationFactory.create("push");
        email.send("Welcome!");
        sms.send("Your OTP is 1234");
        push.send("New update available");
    }
}`,
    solution: `public class Solution {
    interface Notification {
        void send(String message);
    }

    static class EmailNotification implements Notification {
        public void send(String message) {
            System.out.println("[EMAIL] " + message);
        }
    }

    static class SMSNotification implements Notification {
        public void send(String message) {
            System.out.println("[SMS] " + message);
        }
    }

    static class PushNotification implements Notification {
        public void send(String message) {
            System.out.println("[PUSH] " + message);
        }
    }

    static class NotificationFactory {
        public static Notification create(String type) {
            switch (type.toLowerCase()) {
                case "email": return new EmailNotification();
                case "sms": return new SMSNotification();
                case "push": return new PushNotification();
                default: throw new IllegalArgumentException("Unknown type: " + type);
            }
        }
    }

    public static void main(String[] args) {
        Notification email = NotificationFactory.create("email");
        Notification sms = NotificationFactory.create("sms");
        Notification push = NotificationFactory.create("push");
        email.send("Welcome!");
        sms.send("Your OTP is 1234");
        push.send("New update available");
    }
}`,
    expectedOutput: '[EMAIL] Welcome!\n[SMS] Your OTP is 1234\n[PUSH] New update available',
    hints: ['Create an interface for the product (Notification)', 'The factory method takes a type parameter and returns the appropriate implementation'],
    explanation: 'Factory pattern encapsulates object creation. The client doesn\'t need to know the concrete classes. Adding new notification types only requires a new class and a case in the factory.',
    tags: ['design-patterns', 'factory'],
  },
  // ===== TREES & GRAPHS =====
  {
    id: 33,
    title: 'Binary Tree Traversal (Inorder)',
    category: 'Trees & Graphs',
    difficulty: 'Medium',
    description: 'Implement inorder traversal (Left, Root, Right) of a binary tree.',
    starterCode: `public class Solution {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static void inorder(TreeNode root) {
        // Your code here
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        inorder(root);
    }
}`,
    solution: `public class Solution {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static void inorder(TreeNode root) {
        if (root == null) return;
        inorder(root.left);
        System.out.print(root.val + " ");
        inorder(root.right);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        inorder(root);
    }
}`,
    expectedOutput: '4 2 5 1 3',
    hints: ['Inorder: Left subtree → Root → Right subtree', 'Base case: if node is null, return'],
    explanation: 'Inorder traversal visits: left subtree, current node, right subtree. For BSTs, this gives elements in sorted order. Time: O(n), Space: O(h) where h is height.',
    tags: ['tree', 'traversal', 'recursion'],
  },
  {
    id: 34,
    title: 'Height of Binary Tree',
    category: 'Trees & Graphs',
    difficulty: 'Easy',
    description: 'Write a recursive method to find the height of a binary tree.',
    starterCode: `public class Solution {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static int height(TreeNode root) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.left.left = new TreeNode(5);
        System.out.println(height(root));
    }
}`,
    solution: `public class Solution {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static int height(TreeNode root) {
        if (root == null) return 0;
        int leftHeight = height(root.left);
        int rightHeight = height(root.right);
        return 1 + Math.max(leftHeight, rightHeight);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.left.left = new TreeNode(5);
        System.out.println(height(root));
    }
}`,
    expectedOutput: '4',
    hints: ['Height of null node is 0', 'Height = 1 + max(left height, right height)'],
    explanation: 'The height is 1 plus the maximum of left and right subtree heights. An empty tree has height 0. This naturally uses recursion with the base case being a null node. Time: O(n).',
    tags: ['tree', 'recursion'],
  },
  {
    id: 35,
    title: 'Level Order Traversal (BFS)',
    category: 'Trees & Graphs',
    difficulty: 'Medium',
    description: 'Implement level-order (breadth-first) traversal of a binary tree using a queue.',
    starterCode: `import java.util.LinkedList;
import java.util.Queue;

public class Solution {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static void levelOrder(TreeNode root) {
        // Your code here
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        root.right.right = new TreeNode(6);
        levelOrder(root);
    }
}`,
    solution: `import java.util.LinkedList;
import java.util.Queue;

public class Solution {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static void levelOrder(TreeNode root) {
        if (root == null) return;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            System.out.print(node.val + " ");
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        root.right.right = new TreeNode(6);
        levelOrder(root);
    }
}`,
    expectedOutput: '1 2 3 4 5 6',
    hints: ['Use a queue to process nodes level by level', 'Enqueue the root first, then for each node dequeued, enqueue its children'],
    explanation: 'BFS uses a queue. Start with the root, dequeue a node, print it, and enqueue its children. This naturally visits nodes level by level. Time: O(n), Space: O(w) where w is max width.',
    tags: ['tree', 'bfs', 'queue'],
  },
  {
    id: 36,
    title: 'Binary Search Tree - Insert',
    category: 'Trees & Graphs',
    difficulty: 'Medium',
    description: 'Implement insertion into a Binary Search Tree and display with inorder traversal.',
    starterCode: `public class Solution {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static TreeNode insert(TreeNode root, int val) {
        // Your code here
        return root;
    }

    public static void inorder(TreeNode root) {
        if (root == null) return;
        inorder(root.left);
        System.out.print(root.val + " ");
        inorder(root.right);
    }

    public static void main(String[] args) {
        TreeNode root = null;
        int[] values = {50, 30, 70, 20, 40, 60, 80};
        for (int val : values) {
            root = insert(root, val);
        }
        inorder(root);
    }
}`,
    solution: `public class Solution {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static TreeNode insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) root.left = insert(root.left, val);
        else if (val > root.val) root.right = insert(root.right, val);
        return root;
    }

    public static void inorder(TreeNode root) {
        if (root == null) return;
        inorder(root.left);
        System.out.print(root.val + " ");
        inorder(root.right);
    }

    public static void main(String[] args) {
        TreeNode root = null;
        int[] values = {50, 30, 70, 20, 40, 60, 80};
        for (int val : values) {
            root = insert(root, val);
        }
        inorder(root);
    }
}`,
    expectedOutput: '20 30 40 50 60 70 80',
    hints: ['If root is null, create a new node', 'If value < root, go left; if value > root, go right'],
    explanation: 'BST property: left children are smaller, right children are larger. Insert recursively by comparing with the current node and going left or right accordingly. Inorder traversal of BST gives sorted order.',
    tags: ['tree', 'bst', 'recursion'],
  },
  // ===== HASHMAP & SETS =====
  {
    id: 37,
    title: 'First Non-Repeating Character',
    category: 'HashMap & Sets',
    difficulty: 'Easy',
    description: 'Find the first non-repeating character in a string using a HashMap.',
    starterCode: `import java.util.HashMap;

public class Solution {
    public static char firstNonRepeating(String s) {
        // Your code here
        return ' ';
    }

    public static void main(String[] args) {
        System.out.println(firstNonRepeating("aabbcdd"));
        System.out.println(firstNonRepeating("euromonitor"));
    }
}`,
    solution: `import java.util.HashMap;
import java.util.LinkedHashMap;

public class Solution {
    public static char firstNonRepeating(String s) {
        HashMap<Character, Integer> map = new LinkedHashMap<>();
        for (char c : s.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }
        for (char c : s.toCharArray()) {
            if (map.get(c) == 1) return c;
        }
        return ' ';
    }

    public static void main(String[] args) {
        System.out.println(firstNonRepeating("aabbcdd"));
        System.out.println(firstNonRepeating("euromonitor"));
    }
}`,
    expectedOutput: 'c\ne',
    hints: ['Use a HashMap to count character frequencies', 'Then iterate through the string to find the first character with count 1'],
    explanation: 'First pass: count character frequencies using HashMap. Second pass: iterate through the string (not the map) to find the first character with a count of 1. Time: O(n), Space: O(k) where k is unique characters.',
    tags: ['hashmap', 'strings'],
  },
  {
    id: 38,
    title: 'Find Duplicates in Array',
    category: 'HashMap & Sets',
    difficulty: 'Easy',
    description: 'Find all duplicate elements in an array using a HashSet.',
    starterCode: `import java.util.HashSet;
import java.util.ArrayList;

public class Solution {
    public static ArrayList<Integer> findDuplicates(int[] arr) {
        // Your code here
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 4, 2, 2, 3, 5, 1};
        ArrayList<Integer> result = findDuplicates(arr);
        System.out.println(result);
    }
}`,
    solution: `import java.util.HashSet;
import java.util.ArrayList;

public class Solution {
    public static ArrayList<Integer> findDuplicates(int[] arr) {
        HashSet<Integer> seen = new HashSet<>();
        HashSet<Integer> duplicates = new HashSet<>();
        for (int num : arr) {
            if (!seen.add(num)) {
                duplicates.add(num);
            }
        }
        return new ArrayList<>(duplicates);
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 4, 2, 2, 3, 5, 1};
        ArrayList<Integer> result = findDuplicates(arr);
        java.util.Collections.sort(result);
        System.out.println(result);
    }
}`,
    expectedOutput: '[1, 2, 3]',
    hints: ['Use a HashSet to track seen elements', 'If add() returns false, the element is a duplicate'],
    explanation: 'HashSet.add() returns false if the element already exists. We use one set for seen elements and another for duplicates to avoid reporting duplicates multiple times. Time: O(n), Space: O(n).',
    tags: ['hashset', 'arrays'],
  },
  {
    id: 39,
    title: 'Group Anagrams',
    category: 'HashMap & Sets',
    difficulty: 'Medium',
    description: 'Given an array of strings, group anagrams together using a HashMap.',
    starterCode: `import java.util.*;

public class Solution {
    public static List<List<String>> groupAnagrams(String[] strs) {
        // Your code here
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        String[] words = {"eat", "tea", "tan", "ate", "nat", "bat"};
        List<List<String>> result = groupAnagrams(words);
        for (List<String> group : result) {
            Collections.sort(group);
            System.out.println(group);
        }
    }
}`,
    solution: `import java.util.*;

public class Solution {
    public static List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }

    public static void main(String[] args) {
        String[] words = {"eat", "tea", "tan", "ate", "nat", "bat"};
        List<List<String>> result = groupAnagrams(words);
        for (List<String> group : result) {
            Collections.sort(group);
            System.out.println(group);
        }
    }
}`,
    expectedOutput: '[ate, eat, tea]\n[nat, tan]\n[bat]',
    hints: ['Sort each word to create a key - anagrams will have the same sorted form', 'Use a HashMap where key is the sorted string and value is a list of anagrams'],
    explanation: 'Anagrams have the same characters, so sorting each word gives the same key. Use this sorted form as a HashMap key to group anagrams together. Time: O(n * k log k) where k is max word length.',
    tags: ['hashmap', 'strings', 'anagram'],
  },
  {
    id: 40,
    title: 'Word Frequency Counter',
    category: 'HashMap & Sets',
    difficulty: 'Easy',
    description: 'Count the frequency of each word in a sentence using a HashMap and display the results.',
    starterCode: `import java.util.*;

public class Solution {
    public static Map<String, Integer> wordFrequency(String sentence) {
        // Your code here
        return new HashMap<>();
    }

    public static void main(String[] args) {
        String sentence = "the cat sat on the mat the cat";
        Map<String, Integer> freq = wordFrequency(sentence);
        TreeMap<String, Integer> sorted = new TreeMap<>(freq);
        for (Map.Entry<String, Integer> entry : sorted.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`,
    solution: `import java.util.*;

public class Solution {
    public static Map<String, Integer> wordFrequency(String sentence) {
        Map<String, Integer> freq = new HashMap<>();
        String[] words = sentence.split(" ");
        for (String word : words) {
            freq.put(word, freq.getOrDefault(word, 0) + 1);
        }
        return freq;
    }

    public static void main(String[] args) {
        String sentence = "the cat sat on the mat the cat";
        Map<String, Integer> freq = wordFrequency(sentence);
        TreeMap<String, Integer> sorted = new TreeMap<>(freq);
        for (Map.Entry<String, Integer> entry : sorted.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`,
    expectedOutput: 'cat: 2\nmat: 1\non: 1\nsat: 1\nthe: 3',
    hints: ['Split the sentence by spaces to get words', 'Use getOrDefault to handle first occurrence'],
    explanation: 'Split the sentence into words, then iterate through counting occurrences using HashMap. getOrDefault provides a clean way to handle the first occurrence of each word. Time: O(n).',
    tags: ['hashmap', 'strings'],
  },
  // ===== DYNAMIC PROGRAMMING =====
  {
    id: 41,
    title: 'Climbing Stairs',
    category: 'Dynamic Programming',
    difficulty: 'Easy',
    description: 'You can climb 1 or 2 stairs at a time. In how many distinct ways can you climb to the top of n stairs?',
    starterCode: `public class Solution {
    public static int climbStairs(int n) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(climbStairs(3));
        System.out.println(climbStairs(5));
        System.out.println(climbStairs(10));
    }
}`,
    solution: `public class Solution {
    public static int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }

    public static void main(String[] args) {
        System.out.println(climbStairs(3));
        System.out.println(climbStairs(5));
        System.out.println(climbStairs(10));
    }
}`,
    expectedOutput: '3\n8\n89',
    hints: ['This is essentially the Fibonacci sequence', 'The number of ways to reach step n = ways to reach (n-1) + ways to reach (n-2)'],
    explanation: 'At each step, you can come from step n-1 or n-2. So ways(n) = ways(n-1) + ways(n-2), which is Fibonacci. Using iterative approach: O(n) time, O(1) space.',
    tags: ['dp', 'fibonacci'],
  },
  {
    id: 42,
    title: 'Maximum Subarray Sum (Kadane\'s)',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    description: 'Find the contiguous subarray with the largest sum using Kadane\'s algorithm.',
    starterCode: `public class Solution {
    public static int maxSubarraySum(int[] arr) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println(maxSubarraySum(arr));
    }
}`,
    solution: `public class Solution {
    public static int maxSubarraySum(int[] arr) {
        int maxSoFar = arr[0];
        int maxEndingHere = arr[0];
        for (int i = 1; i < arr.length; i++) {
            maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        return maxSoFar;
    }

    public static void main(String[] args) {
        int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println(maxSubarraySum(arr));
    }
}`,
    expectedOutput: '6',
    hints: ['Track the maximum sum ending at each position', 'At each element, decide whether to start a new subarray or extend the existing one'],
    explanation: 'Kadane\'s algorithm maintains two variables: maxEndingHere (max sum ending at current position) and maxSoFar (overall max). At each element, either extend the current subarray or start fresh. Time: O(n), Space: O(1).',
    tags: ['dp', 'arrays'],
  },
  {
    id: 43,
    title: 'Coin Change Problem',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    description: 'Given coin denominations, find the minimum number of coins needed to make a given amount.',
    starterCode: `public class Solution {
    public static int coinChange(int[] coins, int amount) {
        // Your code here
        return -1;
    }

    public static void main(String[] args) {
        int[] coins = {1, 5, 10, 25};
        System.out.println(coinChange(coins, 30));
        System.out.println(coinChange(coins, 11));
    }
}`,
    solution: `import java.util.Arrays;

public class Solution {
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }

    public static void main(String[] args) {
        int[] coins = {1, 5, 10, 25};
        System.out.println(coinChange(coins, 30));
        System.out.println(coinChange(coins, 11));
    }
}`,
    expectedOutput: '2\n2',
    hints: ['Use bottom-up DP: dp[i] = minimum coins for amount i', 'For each amount, try all coins and take the minimum'],
    explanation: 'Build a DP table where dp[i] stores the minimum coins for amount i. For each amount, try subtracting each coin and take the minimum. Time: O(amount * coins), Space: O(amount).',
    tags: ['dp', 'optimization'],
  },
  {
    id: 44,
    title: 'Longest Common Subsequence',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    description: 'Find the length of the longest common subsequence of two strings.',
    starterCode: `public class Solution {
    public static int lcs(String s1, String s2) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(lcs("ABCBDAB", "BDCAB"));
        System.out.println(lcs("AGGTAB", "GXTXAYB"));
    }
}`,
    solution: `public class Solution {
    public static int lcs(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }

    public static void main(String[] args) {
        System.out.println(lcs("ABCBDAB", "BDCAB"));
        System.out.println(lcs("AGGTAB", "GXTXAYB"));
    }
}`,
    expectedOutput: '4\n4',
    hints: ['Use a 2D DP table of size (m+1) x (n+1)', 'If characters match, dp[i][j] = dp[i-1][j-1] + 1; otherwise take max of left or top'],
    explanation: 'Build a 2D DP table. If chars match, extend the LCS from diagonal. Otherwise, take the max from the left or top cell. The bottom-right cell gives the answer. Time: O(m*n), Space: O(m*n).',
    tags: ['dp', 'strings'],
  },
  // ===== MORE QUESTIONS =====
  {
    id: 45,
    title: 'Check Prime Number',
    category: 'Arrays & Strings',
    difficulty: 'Easy',
    description: 'Write a method to check if a given number is prime.',
    starterCode: `public class Solution {
    public static boolean isPrime(int n) {
        // Your code here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isPrime(17));
        System.out.println(isPrime(4));
        System.out.println(isPrime(29));
        System.out.println(isPrime(1));
    }
}`,
    solution: `public class Solution {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPrime(17));
        System.out.println(isPrime(4));
        System.out.println(isPrime(29));
        System.out.println(isPrime(1));
    }
}`,
    expectedOutput: 'true\nfalse\ntrue\nfalse',
    hints: ['Only check divisibility up to the square root of n', 'Handle edge cases: 1 is not prime, 2 and 3 are prime'],
    explanation: 'A prime number is only divisible by 1 and itself. We only need to check up to √n. The 6k±1 optimization skips multiples of 2 and 3. Time: O(√n).',
    tags: ['math', 'optimization'],
  },
  {
    id: 46,
    title: 'String Compression',
    category: 'Arrays & Strings',
    difficulty: 'Medium',
    description: 'Implement basic string compression using counts of repeated characters. For example, "aabcccccaaa" becomes "a2b1c5a3".',
    starterCode: `public class Solution {
    public static String compress(String s) {
        // Your code here
        return "";
    }

    public static void main(String[] args) {
        System.out.println(compress("aabcccccaaa"));
        System.out.println(compress("abcd"));
    }
}`,
    solution: `public class Solution {
    public static String compress(String s) {
        StringBuilder sb = new StringBuilder();
        int count = 1;
        for (int i = 1; i <= s.length(); i++) {
            if (i < s.length() && s.charAt(i) == s.charAt(i - 1)) {
                count++;
            } else {
                sb.append(s.charAt(i - 1)).append(count);
                count = 1;
            }
        }
        String compressed = sb.toString();
        return compressed.length() < s.length() ? compressed : s;
    }

    public static void main(String[] args) {
        System.out.println(compress("aabcccccaaa"));
        System.out.println(compress("abcd"));
    }
}`,
    expectedOutput: 'a2b1c5a3\nabcd',
    hints: ['Use StringBuilder for efficient string concatenation', 'Count consecutive identical characters'],
    explanation: 'Iterate through the string counting consecutive identical characters. When a different character is found, append the character and its count. Return original if compressed isn\'t shorter. Time: O(n).',
    tags: ['strings', 'compression'],
  },
  {
    id: 47,
    title: 'Matrix Diagonal Sum',
    category: 'Arrays & Strings',
    difficulty: 'Easy',
    description: 'Given a square matrix, calculate the sum of both diagonals. Count the center element only once if the matrix size is odd.',
    starterCode: `public class Solution {
    public static int diagonalSum(int[][] matrix) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        System.out.println(diagonalSum(matrix));
    }
}`,
    solution: `public class Solution {
    public static int diagonalSum(int[][] matrix) {
        int n = matrix.length;
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += matrix[i][i];
            sum += matrix[i][n - 1 - i];
        }
        if (n % 2 == 1) {
            sum -= matrix[n / 2][n / 2];
        }
        return sum;
    }

    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        System.out.println(diagonalSum(matrix));
    }
}`,
    expectedOutput: '25',
    hints: ['Primary diagonal: matrix[i][i]', 'Secondary diagonal: matrix[i][n-1-i]', 'Subtract center element if n is odd to avoid double counting'],
    explanation: 'Sum both diagonals in a single loop. Primary diagonal elements are at matrix[i][i], secondary at matrix[i][n-1-i]. If n is odd, the center element is counted twice, so subtract it once. Time: O(n).',
    tags: ['arrays', 'matrix'],
  },
  {
    id: 48,
    title: 'Implement toString Override',
    category: 'OOP Concepts',
    difficulty: 'Easy',
    description: 'Create an Employee class that overrides toString() and equals() methods properly.',
    starterCode: `public class Solution {
    static class Employee {
        String name;
        int id;
        String department;

        Employee(String name, int id, String department) {
            this.name = name;
            this.id = id;
            this.department = department;
        }

        // Override toString() here
        // Override equals() here
    }

    public static void main(String[] args) {
        Employee e1 = new Employee("Alice", 101, "Engineering");
        Employee e2 = new Employee("Alice", 101, "Engineering");
        Employee e3 = new Employee("Bob", 102, "Marketing");
        System.out.println(e1);
        System.out.println(e1.equals(e2));
        System.out.println(e1.equals(e3));
    }
}`,
    solution: `public class Solution {
    static class Employee {
        String name;
        int id;
        String department;

        Employee(String name, int id, String department) {
            this.name = name;
            this.id = id;
            this.department = department;
        }

        @Override
        public String toString() {
            return "Employee{name='" + name + "', id=" + id + ", dept='" + department + "'}";
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Employee other = (Employee) obj;
            return id == other.id && name.equals(other.name) && department.equals(other.department);
        }
    }

    public static void main(String[] args) {
        Employee e1 = new Employee("Alice", 101, "Engineering");
        Employee e2 = new Employee("Alice", 101, "Engineering");
        Employee e3 = new Employee("Bob", 102, "Marketing");
        System.out.println(e1);
        System.out.println(e1.equals(e2));
        System.out.println(e1.equals(e3));
    }
}`,
    expectedOutput: "Employee{name='Alice', id=101, dept='Engineering'}\ntrue\nfalse",
    hints: ['toString() returns a string representation of the object', 'equals() should check type, then compare all relevant fields'],
    explanation: 'Overriding toString() provides meaningful string representation. equals() should first check reference equality, then null and type, then compare fields. This is essential for proper object comparison.',
    tags: ['oop', 'override'],
  },
  {
    id: 49,
    title: 'Iterator Pattern with Custom Collection',
    category: 'Design Patterns',
    difficulty: 'Medium',
    description: 'Implement a custom iterable NumberRange class that generates numbers in a range.',
    starterCode: `import java.util.Iterator;

public class Solution {
    static class NumberRange implements Iterable<Integer> {
        int start, end;

        NumberRange(int start, int end) {
            this.start = start;
            this.end = end;
        }

        // Implement iterator() method here
    }

    public static void main(String[] args) {
        NumberRange range = new NumberRange(1, 5);
        for (int num : range) {
            System.out.print(num + " ");
        }
    }
}`,
    solution: `import java.util.Iterator;

public class Solution {
    static class NumberRange implements Iterable<Integer> {
        int start, end;

        NumberRange(int start, int end) {
            this.start = start;
            this.end = end;
        }

        @Override
        public Iterator<Integer> iterator() {
            return new Iterator<Integer>() {
                int current = start;

                @Override
                public boolean hasNext() {
                    return current <= end;
                }

                @Override
                public Integer next() {
                    return current++;
                }
            };
        }
    }

    public static void main(String[] args) {
        NumberRange range = new NumberRange(1, 5);
        for (int num : range) {
            System.out.print(num + " ");
        }
    }
}`,
    expectedOutput: '1 2 3 4 5',
    hints: ['Implement the Iterable interface and its iterator() method', 'Return an anonymous Iterator with hasNext() and next() methods'],
    explanation: 'The Iterator pattern provides sequential access to elements. Implementing Iterable allows using for-each loops. The iterator maintains its own state (current position) for traversal.',
    tags: ['design-patterns', 'iterator'],
  },
  {
    id: 50,
    title: 'Implement a Generic Pair Class',
    category: 'OOP Concepts',
    difficulty: 'Easy',
    description: 'Create a generic Pair class that can hold two values of any type.',
    starterCode: `public class Solution {
    // Create a generic Pair class here
    static class Pair<A, B> {
        // Your code here
    }

    public static void main(String[] args) {
        Pair<String, Integer> p1 = new Pair<>("Age", 25);
        Pair<String, String> p2 = new Pair<>("Name", "Euromonitor");
        System.out.println(p1.getFirst() + ": " + p1.getSecond());
        System.out.println(p2.getFirst() + ": " + p2.getSecond());
    }
}`,
    solution: `public class Solution {
    static class Pair<A, B> {
        private A first;
        private B second;

        Pair(A first, B second) {
            this.first = first;
            this.second = second;
        }

        public A getFirst() { return first; }
        public B getSecond() { return second; }

        @Override
        public String toString() {
            return "(" + first + ", " + second + ")";
        }
    }

    public static void main(String[] args) {
        Pair<String, Integer> p1 = new Pair<>("Age", 25);
        Pair<String, String> p2 = new Pair<>("Name", "Euromonitor");
        System.out.println(p1.getFirst() + ": " + p1.getSecond());
        System.out.println(p2.getFirst() + ": " + p2.getSecond());
    }
}`,
    expectedOutput: 'Age: 25\nName: Euromonitor',
    hints: ['Use type parameters <A, B> for the class', 'Provide getter methods for both values'],
    explanation: 'Generics allow type-safe code that works with any type. The Pair class uses type parameters A and B so it can hold any combination of types while maintaining compile-time type safety.',
    tags: ['oop', 'generics'],
  },
  {
    id: 51,
    title: 'Quick Sort Implementation',
    category: 'Sorting & Searching',
    difficulty: 'Medium',
    description: 'Implement the quick sort algorithm using the last element as pivot.',
    starterCode: `public class Solution {
    public static void quickSort(int[] arr, int low, int high) {
        // Your code here
    }

    public static int partition(int[] arr, int low, int high) {
        // Your code here
        return 0;
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        quickSort(arr, 0, arr.length - 1);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
    solution: `public class Solution {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        quickSort(arr, 0, arr.length - 1);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
    expectedOutput: '1 5 7 8 9 10',
    hints: ['Partition places pivot at correct position with smaller elements left and larger right', 'Use the last element as pivot'],
    explanation: 'Quick sort picks a pivot, partitions the array around it, and recursively sorts the partitions. Partition places all elements smaller than pivot to the left. Average time: O(n log n), worst: O(n²).',
    tags: ['sorting', 'divide-and-conquer', 'recursion'],
  },
  {
    id: 52,
    title: 'Implement Comparable Interface',
    category: 'OOP Concepts',
    difficulty: 'Medium',
    description: 'Create a Product class that implements Comparable to sort products by price.',
    starterCode: `import java.util.Arrays;

public class Solution {
    static class Product implements Comparable<Product> {
        String name;
        double price;

        Product(String name, double price) {
            this.name = name;
            this.price = price;
        }

        // Implement compareTo here

        @Override
        public String toString() {
            return name + ": $" + price;
        }
    }

    public static void main(String[] args) {
        Product[] products = {
            new Product("Laptop", 999.99),
            new Product("Mouse", 29.99),
            new Product("Keyboard", 79.99),
            new Product("Monitor", 349.99)
        };
        Arrays.sort(products);
        for (Product p : products) {
            System.out.println(p);
        }
    }
}`,
    solution: `import java.util.Arrays;

public class Solution {
    static class Product implements Comparable<Product> {
        String name;
        double price;

        Product(String name, double price) {
            this.name = name;
            this.price = price;
        }

        @Override
        public int compareTo(Product other) {
            return Double.compare(this.price, other.price);
        }

        @Override
        public String toString() {
            return name + ": $" + price;
        }
    }

    public static void main(String[] args) {
        Product[] products = {
            new Product("Laptop", 999.99),
            new Product("Mouse", 29.99),
            new Product("Keyboard", 79.99),
            new Product("Monitor", 349.99)
        };
        Arrays.sort(products);
        for (Product p : products) {
            System.out.println(p);
        }
    }
}`,
    expectedOutput: 'Mouse: $29.99\nKeyboard: $79.99\nMonitor: $349.99\nLaptop: $999.99',
    hints: ['Implement compareTo method from Comparable interface', 'Use Double.compare() for comparing double values'],
    explanation: 'Comparable interface defines natural ordering. compareTo returns negative (less), zero (equal), or positive (greater). Arrays.sort() uses this to sort objects. Double.compare() handles edge cases properly.',
    tags: ['oop', 'interface', 'comparable'],
  },
  {
    id: 53,
    title: 'Exception Handling Basics',
    category: 'OOP Concepts',
    difficulty: 'Easy',
    description: 'Create a method that safely divides two numbers with proper exception handling. Handle division by zero and invalid input.',
    starterCode: `public class Solution {
    public static String safeDivide(String num1, String num2) {
        // Your code here - handle NumberFormatException and ArithmeticException
        return "";
    }

    public static void main(String[] args) {
        System.out.println(safeDivide("10", "3"));
        System.out.println(safeDivide("10", "0"));
        System.out.println(safeDivide("abc", "5"));
    }
}`,
    solution: `public class Solution {
    public static String safeDivide(String num1, String num2) {
        try {
            int a = Integer.parseInt(num1);
            int b = Integer.parseInt(num2);
            int result = a / b;
            return "Result: " + result;
        } catch (NumberFormatException e) {
            return "Error: Invalid number format";
        } catch (ArithmeticException e) {
            return "Error: Division by zero";
        }
    }

    public static void main(String[] args) {
        System.out.println(safeDivide("10", "3"));
        System.out.println(safeDivide("10", "0"));
        System.out.println(safeDivide("abc", "5"));
    }
}`,
    expectedOutput: 'Result: 3\nError: Division by zero\nError: Invalid number format',
    hints: ['Use try-catch blocks for exception handling', 'Catch specific exceptions before general ones'],
    explanation: 'Exception handling with try-catch prevents program crashes. Catch specific exceptions (NumberFormatException, ArithmeticException) to provide meaningful error messages. Always catch more specific exceptions first.',
    tags: ['oop', 'exception-handling'],
  },
  {
    id: 54,
    title: 'Reverse a String Without Built-in',
    category: 'Arrays & Strings',
    difficulty: 'Easy',
    description: 'Reverse a string without using StringBuilder.reverse() or any built-in reverse methods.',
    starterCode: `public class Solution {
    public static String reverseString(String s) {
        // Your code here
        return "";
    }

    public static void main(String[] args) {
        System.out.println(reverseString("Euromonitor"));
        System.out.println(reverseString("Hello World"));
    }
}`,
    solution: `public class Solution {
    public static String reverseString(String s) {
        char[] chars = s.toCharArray();
        int left = 0, right = chars.length - 1;
        while (left < right) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }
        return new String(chars);
    }

    public static void main(String[] args) {
        System.out.println(reverseString("Euromonitor"));
        System.out.println(reverseString("Hello World"));
    }
}`,
    expectedOutput: 'rotinomoruE\ndlroW olleH',
    hints: ['Convert to char array for in-place swapping', 'Use two pointers from both ends'],
    explanation: 'Convert to char array, then use two-pointer technique to swap characters from both ends moving inward. Time: O(n), Space: O(n) for the char array.',
    tags: ['strings', 'two-pointers'],
  },
  {
    id: 55,
    title: 'Pattern: Number Pyramid',
    category: 'Recursion',
    difficulty: 'Easy',
    description: 'Print a number pyramid pattern of n rows using nested loops.',
    starterCode: `public class Solution {
    public static void printPyramid(int n) {
        // Your code here
    }

    public static void main(String[] args) {
        printPyramid(5);
    }
}`,
    solution: `public class Solution {
    public static void printPyramid(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = n - i; j > 0; j--) {
                System.out.print(" ");
            }
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        printPyramid(5);
    }
}`,
    expectedOutput: '    1 \n   1 2 \n  1 2 3 \n 1 2 3 4 \n1 2 3 4 5',
    hints: ['Use spaces to create the pyramid shape', 'First loop for spaces, second loop for numbers in each row'],
    explanation: 'The outer loop controls rows. First inner loop prints spaces (n-i spaces for row i). Second inner loop prints numbers 1 to i. This creates a centered pyramid pattern.',
    tags: ['loops', 'patterns'],
  },
  {
    id: 56,
    title: 'Observer Design Pattern',
    category: 'Design Patterns',
    difficulty: 'Medium',
    description: 'Implement the Observer pattern where a NewsAgency notifies subscribers when news is published.',
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    interface Observer {
        void update(String news);
    }

    static class NewsAgency {
        List<Observer> observers = new ArrayList<>();
        // addObserver, removeObserver, notifyObservers, publishNews methods
    }

    static class Subscriber implements Observer {
        String name;
        Subscriber(String name) { this.name = name; }
        // Implement update method
    }

    public static void main(String[] args) {
        NewsAgency agency = new NewsAgency();
        Subscriber s1 = new Subscriber("Alice");
        Subscriber s2 = new Subscriber("Bob");
        agency.addObserver(s1);
        agency.addObserver(s2);
        agency.publishNews("Breaking: Java 21 Released!");
    }
}`,
    solution: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    interface Observer {
        void update(String news);
    }

    static class NewsAgency {
        List<Observer> observers = new ArrayList<>();

        public void addObserver(Observer o) {
            observers.add(o);
        }

        public void removeObserver(Observer o) {
            observers.remove(o);
        }

        public void notifyObservers(String news) {
            for (Observer o : observers) {
                o.update(news);
            }
        }

        public void publishNews(String news) {
            System.out.println("Publishing: " + news);
            notifyObservers(news);
        }
    }

    static class Subscriber implements Observer {
        String name;
        Subscriber(String name) { this.name = name; }

        @Override
        public void update(String news) {
            System.out.println(name + " received: " + news);
        }
    }

    public static void main(String[] args) {
        NewsAgency agency = new NewsAgency();
        Subscriber s1 = new Subscriber("Alice");
        Subscriber s2 = new Subscriber("Bob");
        agency.addObserver(s1);
        agency.addObserver(s2);
        agency.publishNews("Breaking: Java 21 Released!");
    }
}`,
    expectedOutput: 'Publishing: Breaking: Java 21 Released!\nAlice received: Breaking: Java 21 Released!\nBob received: Breaking: Java 21 Released!',
    hints: ['Observers register with the subject (NewsAgency)', 'When news is published, iterate through all observers and call update()'],
    explanation: 'Observer pattern defines a one-to-many dependency. When the subject (NewsAgency) changes state, all registered observers are notified. This promotes loose coupling between the subject and observers.',
    tags: ['design-patterns', 'observer'],
  },
];
