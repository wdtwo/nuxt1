---
title: mysql5.6最低配置
date: 2023-12-07 15:48:34
image: https://cdn.wdtwo.com/anzhiyu/mysqlo02u3345.webp
category: 
- 后端
tags: 
- 数据库
---

```bash
[client]
#password	= your_password
port		= 3306
socket		= /tmp/mysql.sock

[mysqld]
binlog_cache_size = 64K
thread_stack = 256K
join_buffer_size = 1024K
query_cache_type = 0
max_heap_table_size = 16M
port		= 3306
socket		= /tmp/mysql.sock
datadir = /www/server/data
default_storage_engine = InnoDB
performance_schema_max_table_instances = 100
table_definition_cache = 100
skip-external-locking
key_buffer_size = 8M
max_allowed_packet = 4M
table_open_cache = 64
sort_buffer_size = 256K
net_buffer_length = 2K
read_buffer_size = 128K
read_rnd_buffer_size = 256K
myisam_sort_buffer_size = 2M
thread_cache_size = 16
query_cache_size = 0
tmp_table_size = 8M
sql-mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES

explicit_defaults_for_timestamp = true
#skip-name-resolve
max_connections = 50
max_connect_errors = 10
open_files_limit = 4096

log-bin=mysql-bin
binlog_format=row
server-id = 1
expire_logs_days = 3
slow_query_log=0
slow-query-log-file=/www/server/data/mysql-slow.log
long_query_time=3
#log_queries_not_using_indexes=on


innodb_data_home_dir = /www/server/data
innodb_data_file_path = ibdata1:10M:autoextend
innodb_log_group_home_dir = /www/server/data
innodb_buffer_pool_size = 16M
innodb_log_file_size = 2M
innodb_log_buffer_size = 4M
innodb_flush_log_at_trx_commit = 1
innodb_lock_wait_timeout = 10
innodb_max_dirty_pages_pct = 75
innodb_read_io_threads = 1
innodb_write_io_threads = 1

[mysqldump]
quick
max_allowed_packet = 16M

[mysql]
no-auto-rehash

[myisamchk]
key_buffer_size = 8M
sort_buffer_size = 8M
read_buffer = 1M
write_buffer = 1M

[mysqlhotcopy]
interactive-timeout
```