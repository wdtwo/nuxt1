---
title: urllib3简单实用教程
date: 2023-06-07 16:56:20
image: https://cdn.wdtwo.com/anzhiyu/python467567.webp
category: 
- 后端
tags: 
- python
- 爬虫
---
https://urllib3.readthedocs.io/en/latest/
<!--more-->
####  基础代码
```python
import urllib3
url = 'http://www.google.com'
    http = urllib3.PoolManager(
        headers = {
           'Upgrade-Insecure-Requests': '1',
           'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
           'Accept-Encoding': 'gzip, deflate, sdch, br',
           'Accept-Language': 'zh-CN,zh;q=0.8',
        }
    )
    res = http.request('GET',url)
    print(res.data.decode('utf-8'))
    
    print(res.status)
    print(res.data)
    print(res.header)
```
####  post
```python
http.request('POST','http://google.com',fields={'hello':'world'})
```
####  json
```python
import json
res = http.request('GET','http://google.com')
json.loads(res.data.decode('utf-8'))
```
####  headers
```python
import json
res = http.request('GET','http://google.com',headers={'X-Something':'value'})
json.loads(res.data.decode('utf-8'))['headers']
```
####  参数
```python
import json
res = http.request('GET','http://google.com',fields={'hello':'world'})
json.loads(res.data.decode('utf-8'))['args']
```
####  表单
```python
import json
res = http.request('GET','http://google.com',fields={'fields':'value'})
json.loads(res.data.decode('utf-8'))['form']
```
####  JSON
```python
import json
encoded_data = json.dumps({'attribute':'value'}).encode('utf-8')
res = http.request('GET','http://google.com',body=encoded_data,headers={'Content-Type': 'application/json'})
json.loads(res.data.decode('utf-8'))['json']
```
####  文件和二进制流
```python
with open('example.txt') as fp:
    file_data = fp.read()
res = http.request(
    'POST',
    'http://httpbin.org/post',
    fields={
        'filefield': ('example.txt', file_data),
    })
json.loads(res.data.decode('utf-8'))['files']

# 指定类型
r = http.request(
    'POST',
    'http://httpbin.org/post',
    fields={'filefield': ('example.txt', file_data, 'text/plain')}
)
# 发送原始二进制数据
with open('example.jpg', 'rb') as fp:
	binary_data = fp.read()
r = http.request(
    'POST',
    'http://httpbin.org/post',
    body=binary_data,
    headers={'Content-Type': 'image/jpeg'}
)
json.loads(r.data.decode('utf-8'))['data']
```

## 高级用法

#### 自定义池
```python
import urllib3
http = urllib3.PoolManager(num_pools=50)

```
#### 代理
用ProxyManager通过HTTP代理隧道请求  
用法ProxyManager与相同PoolManager
```python
import urllib3

proxy = urllib3.ProxyManager('http://localhost:3128/')
proxy.request('GET', 'http://google.com/')
```
安装了PySocks，您可以使用 SOCKSProxyManager
```python
from urllib3.contrib.socks import SOCKSProxyManager
proxy = SOCKSProxyManager('socks5://localhost:8889/')
proxy.request('GET', 'http://google.com/')
```

## 证书验证

```python
import certifi
import urllib3

http = urllib3.PoolManager(
    cert_reqs='CERT_REQUIRED',
    ca_certs=certifi.where()
)
```
```python
http.request('GET', 'https://google.com')

http.request('GET', 'https://expired.badssl.com')
```
## 自定义SSL证书
#### 不使用certifi
```python
import urllib3

http = urllib3.PoolManager(
    cert_reqs='CERT_REQUIRED',
    ca_certs='/path/to/your/certificate_bundle'
)
```
#### 客户端证书
您还可以指定客户端证书。当服务器和客户端都需要验证彼此的身份时，这很有用。通常，这些证书是从同一机构颁发的。要使用客户端证书，请在创建时提供完整路径PoolManager：
```python
http = urllib3.PoolManager(
    cert_file='/path/to/your/client_cert.pem',
    cert_reqs='CERT_REQUIRED',
    ca_certs='/path/to/your/certificate_bundle'
)
```
如果您具有加密的客户端证书私钥，则可以使用key_password参数指定用于解密密钥的密码。
```python
http = urllib3.PoolManager(
    cert_file='/path/to/your/client_cert.pem',
    cert_reqs='CERT_REQUIRED',
    key_file='/path/to/your/client.key',
    key_password='keyfile_password'
)
```
如果您的密钥未加密，key_password则不需要此参数。









#
