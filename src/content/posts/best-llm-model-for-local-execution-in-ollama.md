---
title: LLM 大模型试玩
pubDate: 2024-10-19
categories: [ 'LLM' ]
description: ''
---

## 基于Agent RAG的Search工具

* AI工具集 https://ai-bot.cn/
* 国产问题搜索工具 https://kimi.moonshot.cn/
* 金融问题搜索 https://www.perplexity.ai/
* Text-Audio 工具 https://d1tools.com/tools/ai-tts/

## 生产力工具

* 代码生成
    * 在线版本，效果挺好 https://v0.dev/
    * 相对差一点的版本，也能用 https://www.napkins.dev/
    * cline 代码生成器，vscode插件，能跑通demo，但是很慢。[本地模型](https://ollama.com/search?q=cline)
* 草图生成Mind https://excalidraw.com/
* 草图生成UI https://www.figma.com/ai/
* 模型集合 [huggingface](https://huggingface.co/)，这个网站有个国内镜像 [hf-mirror](https://hf-mirror.com/)

## 在线LLM模型

* [OpenRouter](https://openrouter.ai/) 支持多个在线大模型混用，支持openAI的api标准
* [Deepseek](https://www.deepseek.com/) 便宜量管够的国产模型
* Claude 3.5 Sonnet
* OpenGPT4 Series、DALE3、Whisper

## 本地LLM模型

* 能跑的模型一般三种格式 GGUF、Safetensors、Original cpkt
* 常规本地跑LLM应用端工具：Ollama（llama.cpp）、LA studio
* 常规本地LLM前端工具：open-webui、page-assist
* 开发Agent的工具：
    * [coze](https://www.coze.com/) 集市
    * dify 本地开发工具包 [compose启动](https://docs.dify.ai/getting-started/install-self-hosted/docker-compose)
    * [Agent 介绍](https://towardsdatascience.com/intro-to-llm-agents-with-langchain-when-rag-is-not-enough-7d8c08145834)
* 本地一般优先跑 Q5_K_M 或者 Q4_K_M，需要留显存给上下文足够tokens
* 比较火的模型主力，这些主力有系列的剪枝7B模型可以本地12G内存使用
    * 文生文
        * Llama Series，Meta研发的模型
        * Google研发的模型
            * Gemini Series，在线LLM，有本地版本nano 提供图片理解，总结、翻译功能
            * Gemma2 Series，小型模型多种版本剪枝
        * Deepseek2.5，模型有chat/code版本，很便宜
        * Qwen2.5 Series，百度千问团队模型
        * [Doubao](https://www.volcengine.com/product/doubao) Bytedance模型，量大管饱
    * text-to-image text-to-video
        * Stable Diffusion、ComfyUI
        * Pyramid

## 测试集合

* 模型排行 [open_llm_leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
* BigCodeBench
    * 模型排行 [BigCodeBench](https://bigcode-bench.github.io/)
    * 测试集合 https://huggingface.co/datasets/bigcode/bigcodebench
* 样例类目 Knowledge(Multimodal)、Math(Multimodal)、Document、Chart、Scene Text、General Visual QA、Video
  Understanding、Knowledge、Math (Language)、Reasoning (Language)、Coding	