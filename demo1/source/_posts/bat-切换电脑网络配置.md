---
title: bat-切换电脑网络配置
date: 2024-06-13
description: ''
image: ''
tags: []
category: ''
draft: false 
---


```bat
@echo off
setlocal enabledelayedexpansion

REM 定义两个配置的变量
set CONFIG1_IP=192.168.2.4        内网ip1
set CONFIG1_SUBNET=255.255.255.0  子网掩码
set CONFIG1_GATEWAY=192.168.2.1   路由网关

set CONFIG2_IP=192.168.2.5        内网ip2
set CONFIG2_SUBNET=255.255.255.0  子网掩码
set CONFIG2_GATEWAY=192.168.2.155 旁路由网关

REM 指定要配置的网络接口名称
set INTERFACE_NAME="以太网"

REM 获取当前的IP地址
for /f "tokens=2 delims=:" %%A in ('netsh interface ipv4 show address name^=%INTERFACE_NAME% ^| findstr "IP Address"') do set CURRENT_IP=%%A
set CURRENT_IP=%CURRENT_IP:~1%

echo 当前IP地址为: %CURRENT_IP%

REM 根据当前IP地址切换到另一个配置
if "%CURRENT_IP%"=="%CONFIG1_IP%" (
     echo 切换到k3
     netsh interface ipv4 set address name=%INTERFACE_NAME% source=static addr=%CONFIG1_IP% mask=%CONFIG1_SUBNET% gateway=%CONFIG1_GATEWAY%
) else (
    echo 切换到玩客云
    netsh interface ipv4 set address name=%INTERFACE_NAME% source=static addr=%CONFIG2_IP% mask=%CONFIG2_SUBNET% gateway=%CONFIG2_GATEWAY%
   
)

echo 配置已切换
pause

```