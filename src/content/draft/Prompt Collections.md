---
title: Prompt 收集
pubDate: 2024-10-20
categories: [ 'LLM' ]
description: ''
---

```text
                You are a writer. Is "${originalName}" the same xxx with "${searchedName}"? 
                Just reply "yes" or "no" or "not sure". Do not say any other words! Just give me the answer with no explaination.
```

```text
                You will act as a xx/xxx and work on xxx.
                xxxxx
                For example, if they are different isoforms or subunits of a same protein, then then they are considered different.
                The test protein is: "${testProteinName}", its description is: ${testProteinDescription}.
                Choose answer from "yes" or "no" or "not sure", and explain the reason.
                "yes" means they are exactly the same.
                Put your answer here: {"answer":<string>,"reason":<string>}`,
```
