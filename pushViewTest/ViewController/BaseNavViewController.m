//
//  BaseNavViewController.m
//  pushViewTest
//
//  Created by mt010 on 2020/11/27.
//  Copyright © 2020 live. All rights reserved.
//

#import "BaseNavViewController.h"

@interface BaseNavViewController () <UIGestureRecognizerDelegate>

@end

@implementation BaseNavViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    // 获取系统自带滑动手势的target对象
    id target = self.interactivePopGestureRecognizer.delegate;

    // 创建全屏滑动手势，调用系统自带滑动手势的target的action方法
    UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc] initWithTarget:target action:@selector(handleNavigationTransition:)];

    // 设置手势代理，拦截手势触发
    pan.delegate = self;

    // 给导航控制器的view添加全屏滑动手势
    [self.view addGestureRecognizer:pan];

    // 禁止使用系统自带的滑动手势
    self.interactivePopGestureRecognizer.enabled = NO;
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
