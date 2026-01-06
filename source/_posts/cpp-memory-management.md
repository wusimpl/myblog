---
title: C++ 智能指针深度解析
date: 2024-12-02 14:30:00
tags:
  - C++
  - 内存管理
  - 编程
categories:
  - 技术
---

现代 C++ 中的智能指针是内存管理的利器，让我们告别手动 delete 的时代。

<!-- more -->

## unique_ptr

独占所有权的智能指针：

```cpp
#include <memory>

auto ptr = std::make_unique<int>(42);
// ptr 离开作用域时自动释放
```

## shared_ptr

共享所有权，引用计数：

```cpp
auto sp1 = std::make_shared<std::string>("Hello");
auto sp2 = sp1; // 引用计数 +1
```

## 最佳实践

1. 优先使用 `make_unique` 和 `make_shared`
2. 避免循环引用，必要时使用 `weak_ptr`
3. 不要混用裸指针和智能指针
