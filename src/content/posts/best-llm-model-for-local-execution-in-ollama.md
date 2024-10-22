---
title: LLM Awesome
pubDate: 2024-10-19
categories: [ 'LLM' ]
description: ''
---

# 应用层

## 基于Agent RAG的Search工具

* AI工具集 https://ai-bot.cn/
* 问题搜索工具 https://kimi.moonshot.cn/
* 金融问题搜索 https://www.perplexity.ai/
* Text-Audio 工具 https://d1tools.com/tools/ai-tts/
* Text-Video 工具 https://runwayml.com/ https://www.midjourney.com/home

## 生产力工具

### 代码生成

1. 产品设计
    * 草图生成Mind https://excalidraw.com/
2. 原型获取
    * [canva](https://www.canva.cn/)
    * [figma](https://www.figma.com/ai/)
3. 前端代码生成
    * 效果挺好 https://v0.dev/
    * 相对差一点，也能用 https://www.napkins.dev/
4. 逻辑生成
    * cline 代码生成器，vscode插件，能跑通demo，但是很慢。[本地模型](https://ollama.com/search?q=cline)
    * cursor https://www.cursor.com/

# 模型训练

## 在线LLM模型

模型集合 [huggingface](https://huggingface.co/)，这个网站有个国内镜像 [hf-mirror](https://hf-mirror.com/)

* [OpenRouter](https://openrouter.ai/) 支持多个在线大模型混用，支持openAI的api标准
* [Deepseek2.5](https://www.deepseek.com/) 便宜量管够的国产模型
* Claude 3.5 Sonnet
* OpenGPT4 Series、DALE3、Whisper
* Gemini
* Copilot

## 本地LLM模型

### 基础模型介绍

* 能跑的模型一般三种格式 GGUF、Safetensors、Original cpkt
* 常规本地跑LLM应用端工具：Ollama（llama.cpp）、LA studio
* 常规本地LLM前端工具：open-webui、page-assist
* 本地一般优先跑 Q5_K_M 或者 Q4_K_M，需要留显存给上下文足够tokens
* 比较火的模型主力，这些主力有系列的剪枝7B模型可以本地12G内存使用
    * 文生文
        * Deepseek2.5，模型有chat/code版本，很便宜，质量性价比高
        * Meta模型 Llama Series，
        * Google模型
            * Gemma2 Series
            * Gemini Series 有各种剪枝版本，提供图片理解，总结、翻译功能
        * Alibaba模型 [Qwen2.5](https://github.com/QwenLM) Series
        * ByteDance模型 [Doubao](https://www.volcengine.com/product/doubao)
    * text-to-image text-to-video
        * Stable Diffusion、ComfyUI
        * Pyramid

## 编写Agent

* [Agent 介绍](https://towardsdatascience.com/intro-to-llm-agents-with-langchain-when-rag-is-not-enough-7d8c08145834)
* [19 类 Agent 框架对比](https://my.oschina.net/u/4662964/blog/11052098)
* [coze](https://www.coze.com/) Agent 模板集市
* Agent WebUI Flow：
    * AutoGPT https://github.com/Significant-Gravitas/AutoGPT
    * Dify 本地开发工具包 [compose启动](https://docs.dify.ai/getting-started/install-self-hosted/docker-compose)
    * [RAGFlow](https://github.com/infiniflow/ragflow)
* Agent Framework:
    * babyAgent https://github.com/yoheinakajima/babyagi
    * [AgentGPT](https://github.com/reworkd/AgentGPT)
    * MetaGPT https://github.com/geekan/MetaGPT
* Flow Framework：
    * [llama_index](https://github.com/run-llama/llama_index)
    * [langchain](https://www.langchain.com/)

## Fine-tuning 训练模型

[2024年模型微调微调简介 ](https://blog.gopenai.com/leveraging-large-language-models-for-automated-code-migration-and-repository-level-tasks-part-ii-6377e7a76c8e)
![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*jp0Kh8qzaPxiiWvJ5FrbBw.png)

* 线性代数（矩阵、向量）、微积分（偏导数、梯度下降）、概率统计（概率分布、期望、方差）
* 租用算力平台 A100
* 学习使用 Flux/LoRA 做剪枝

## 测试集合

* 模型排行 [open_llm_leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
* BigCodeBench `实时看最新的本地大模型评分`
    * 模型排行 [BigCodeBench](https://bigcode-bench.github.io/)
    * 测试集合 https://huggingface.co/datasets/bigcode/bigcodebench
* 样例类目 Knowledge(Multimodal)、Math(Multimodal)、Document、Chart、Scene Text、General Visual QA、Video
  Understanding、Knowledge、Math (Language)、Reasoning (Language)、Coding	