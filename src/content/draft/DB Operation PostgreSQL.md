title: DB Operation PostgreSQL
date: 2022/2/01 16:19:54
categories:

 - sql
 - postgresql

tags:
 - postgresql

---

# Introduction

* https://www.postgresql.org/

# Installation

```shell
# ubuntu 20
sudo apt update
sudo apt install postgresql
sudo -u postgres psql -c "SELECT version();"

# added user and db
sudo su - postgres -c "createuser jik1992"
sudo su - postgres -c "createdb demo_db"
sudo -u postgres psql
grant all privileges on database demo_db to jik1992;
ALTER USER jik1992 PASSWORD 'xxx';

# configration
vim /etc/postgresql/12/main/postgresql.conf
listen_addresses = '*' 

vim /etc/postgresql/12/main/pg_hba.conf
host    all             all            0.0.0.0/0                md5

# restart and check
service postgresql restart
ss -nlt | grep 5432
```

# Usage

```shell

```

