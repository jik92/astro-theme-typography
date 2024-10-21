title: Python Data Migration Tool Alembic
date: 2021/1/20 16:19:54
categories:

 - python
 - data-migration

tags:
 - Alembic

---

# Introduction

* https://alembic.sqlalchemy.org/en/latest/tutorial.html

# Feautre

- Migration-tool

# Installation

```
pip install alembic
```

# Usage

```shell
alembic init db_migration
# set sqlalchemy.url in alembic.ini
# set metadata in db_migration/env.py
##
import os
import sys
sys.path.append(os.path.join(os.getcwd(), '../..'))
from task_online.labwork.db import meta
target_metadata = meta
##

# diff from database, add a version of metadata
alembic revision --autogenerate -m "init db"
# sync table structure to database
alembic upgrade head 
alembic downgrade base
# offline export sql
alembic upgrade c603929036a4:head --sql > migration.sql
```

