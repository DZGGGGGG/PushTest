//
//  TestObject.h
//  pushViewTest
//
//  Created by mt010 on 2020/12/2.
//  Copyright © 2020 live. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface TestObject : NSObject
//nonatomic 一般都用这个 执行效率高
//atomiac 不知？
//readwrite 访问属性可操作GetSet方法  默认为这个属性
//readonly 访问属性只能操作get方法 无法进行set方法
//assign 基本数据类型需要使用这个  不是对象的属性使用
//retain 为手动管理内存是使用的属性
//strong 自动管理内存使用 默认为这个属性
//weak 避免循环应用

#pragma KVC理解
// KVC 有各种捕捉异常的方法 如 setNilValueForKey 如果传入的值为nil 默认抛出异常 可以重写该方法自行处理异常
// setValue：forUndefinedKey 该方法为setValue时 如果没有找到对应的key 会默认抛出异常  可重写该方法自行处理异常
// valueForUndefinedKey 该方法为getValue时 其与上相同
// accessInstanceVariablesDirectly 为 在找不到setName方法时 是否需要继续向下寻找 isName,_name,_isName（类比） 如果重写该方法并且返回NO（默认为YES） 则在找不到setName方法时 直接调用抛出异常的方法 setValue：forUndefinedKey
// key与keyPath  key通常在数据结构为一层时使用 如果当数据结构为多层 使用多个key去查找显然不够方便，于是便可以使用keyPath直接使用链式语法去查找
#pragma KVO理解
//用于监听某个值或者某个状态发生变化时进行操作
// 当不需要监听或者页面将要消失的时候 一般在delloc里移除监听 否则会造成内存泄露
#pragma 基础对象理解
//NSSet 为无序列表 无法通过下标顺序去访问    于此相对的是    NSArray 有序列表 可以通过顺序访问
//NSSet 相对效率更高 在不需要通过顺序访问时 尽量使用NSSet

@property (nonatomic,strong)NSString *name;
@property (nonatomic,strong)NSString *age;
//@property (nonatomic,strong)NSString *isName;
@end

NS_ASSUME_NONNULL_END
