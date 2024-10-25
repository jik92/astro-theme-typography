---
title: Architecture Collections
pubDate: 2024-10-25
categories: [ 'architecture' ]
description: ''
---

推荐、广告、搜索相关架构和算法整理

## 广告

Hypers平台

* CDP 客户数据平台
    * 渠道接入 埋点对接、广告数据、业务系统、数据库、电商平台
    * 数据治理 标准化数据、规范化、接口化、可视化
    * 数据关联
    * 标签和人群圈选 用户分层
    * 用户洞察 分层模型、RFM模型、AIPL模型、CLV价值预测、购买意向、商品推荐、流失预警模型、TGI图谱分析
    * 价值激活 公域广告投放、SCRM、卡卷、多维度分析BI

* MA 自动化营销平台
    * 营销策略管理
    * 圈选活动目标人群
    * 设计活动内容/渠道
    * 发布活动流程
    * 复盘分析

* 全域用户行为分析平台
    * 全域行为采集 埋点、API对接、数据库同步
    * 用户行为分析

## 电商

* ERP
    * WMS
        * 库存管理
        * 入库管理
        * 出库管理
        * 仓库布局
        * 报表分析
    * CRM
        * 报价订单管理
        * 销售机会管理
        * 销售任务管理
        * 潜在客户管理
    * 订单模块
        * 订单同步
        * 订单拆单合单
        * 订单打印，出库退单
    * 供应链
        * 采购管理
        * 供应商管理
    * 财务管理模块
        * 成本管理
        * 核销管理
    * 物流管理
    * 商品管理
        * item sku管理
        * 商品上下架
        * 店铺搬家
* 企业OA
    * 员工信息管理
    * 培训
    * 考勤
    * 绩效评估
    * 工资发放

## 推荐

https://github.com/datawhalechina/fun-rec/tree/master

### 基础架构

* 离线层 数据处理、数据存储、特征工程、离线特征计算、离线模型训练、输出Redis/Hive/RDBMS
* 近线层 Kafka/Flume数据源-> Spark/Flink/Doris->Redis/HDFS/ES
* 在线层 UI

### 推荐系统四个阶段

* 物料库、召回（content-based、behavior-based、feature-based）、粗排、精排、重排

## 搜索NLP

* 搜索词分词