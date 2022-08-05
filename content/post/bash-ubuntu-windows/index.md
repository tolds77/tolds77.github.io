---
date: 2016-04-08T12:55:46-05:00
title: "Bash on Ubuntu on Windows"
#tags: [ windows ]
authors: 
- jamesolds

aliases:
- /tutorial/bash-ubuntu-windows/
---

In the latest test build of Windows 10 (build 14316), Microsoft introduced
Ubuntu userland as a windows exe. This means you can apt-get anything in
ubuntu’s repositories and PPAs right from windows! This is actually pretty cool.

More background can be found at
<https://blogs.windows.com/windowsexperience/2016/04/06/announcing-windows-10-insider-preview-build-14316/>

**Join Windows Insider**
--------------------

1.  Goto windows update settings, click on Advanced options

2.  Join the Windows Insider program

3.  After your account is linked, change your Insider level to Fast

    -   I rebooted after this and had to wait about 10 minutes

4.  Goto Insider hub (windows key -> “insider”)

    -   Goto your account settings -> devices

    -   Click update build (if its not available just wait a few more mins)


**Install Ubuntu**
--------------

1.  After you have the new windows build, launch programs and features

    -   windows key -> “windows features”

2.  Check “Windows Subsystem for Linux (Beta)

3.  Launch bash (windows key -> “bash”)

4.  Hit y to install Ubuntu

5.  windows key -> “bash” will now give you bash on ubuntu... on windows


