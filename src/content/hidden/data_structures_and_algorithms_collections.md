---
title: Data Structures And Algorithms Collections
pubDate: 2024-10-24
categories: [ 'base' ]
description: ''
---

# 学习算法小抄笔记

## 时间复杂度表示法

时空复杂度用 Big 0 表示法表示(类似 O(1),O(n2),0(logn)等)。它们都是估计值，不需要精确计算，且仅保留最高增长项。

## 数据结构

Tree、Array、List、 、Hash、图

* Array
* List
* Queue、Stack
* 树 红黑树（二叉搜索树）、多叉树、 二叉堆、 图、 Dict Tree、BST（Binary Search Tree）、DFS、BFS
* 图 Union-Find

## 算法分类

* 动态（Dynamic Program）规划求最值，三要素：重叠子问题、最优子结构、状态转移方程，动态规划本质是穷举所有问题的和，用N叉来看待，带备忘录
    * 最长递增子序列（LIS）、LCS
    * 背包问题
    * 零钱兑换
    * 高楼扔鸡蛋、戳气球、
    * 正则表达
    * 四键键盘
    * 字符串匹配算法 KMP
    * 编辑距离 DP+回溯
    * 股票买卖 DPTable
    * House Robber
* 回溯
    * 决策树，N皇后问题
    * DFS、BFS（找二叉树最小路径）
    * 排列、子集、组合
    * 树独、合法括号
* 双指针
    * 快慢指针（判断是否有环）、二分法 左边界二分法、右边界二分法
    * 滑动窗口算法 最小覆盖子串、字符串排列、找到字符串中所有的异位词、无重复字符串最长子串
    * 两数之和、反转数组
* 贪心算法 局部导致全局最优
    * 区间调度
* 二分图
* 二叉堆 PriorityQueue、Twitter
* 哈希表-双向链表 LRU、twoSum
* 树
    * BST
    * 线索树
    * Tried Tree
    * LSM-Tree
* monotonic stack
* 单调队列 滑动窗口、最小覆盖字串
* 链表问题 双指针、左右指针、滑动窗口
* 位操作
    * |
    * n&(n-1)
* 双精度计算
* FooldFill 扫雷、消除、自动魔棒
* 排序问题
  信封嵌套问题

### 分布式 CAP/BASE 算法

* Raft
* Paxso ZAB

### 未分类算法

* MySQL的 B+ 树
* Redis的 一致性hash
* CPU多线程运行队列，cfs_rq 红黑树

### Google 算法

* 分布式日志 Dapper
* 分布式文件 GFS (Bloom filter)
* 分布式调度 MapReduce （Hadoop）
* 分布式数据库 Bigtable(LevelDB LSM-tree)

