//
//  MSTabBarController.m
//  pushViewTest
//
//  Created by mt010 on 2020/11/30.
//  Copyright © 2020 live. All rights reserved.
//

#import "MSTabBarController.h"
#import "AccountBookViewController.h"
#import "ViewController.h"
#import "BaseNavViewController.h"
#import "AddBillInfoViewController.h"

@interface MSTabBarController ()

@end

@implementation MSTabBarController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self addAllChildViewController];
}
- (void)addAllChildViewController{
    // 利用KVO来使用自定义的tabBar
    MSCustomTabBar *CenterTabbar = [[MSCustomTabBar alloc] init];
    CenterTabbar.DZGCenterBtnDelegate = self;
    
    [self setValue:CenterTabbar forKey:@"tabBar"];
    
    AccountBookViewController *accountVC = [[AccountBookViewController alloc] init];
    BaseNavViewController *accountNav = [[BaseNavViewController alloc] initWithRootViewController:accountVC];
    accountNav.navigationBar.translucent = NO;
    accountNav.tabBarItem = [[UITabBarItem alloc] initWithTabBarSystemItem:UITabBarSystemItemMostViewed tag:1];
    
    ViewController *homeVC = [ViewController new];
    BaseNavViewController *homeNav = [[BaseNavViewController alloc] initWithRootViewController:homeVC];
    homeNav.navigationBar.translucent = NO;
    homeNav.tabBarItem = [[UITabBarItem alloc] initWithTabBarSystemItem:UITabBarSystemItemTopRated tag:2];
    
    [self addChildViewController:accountNav];
    [self addChildViewController:homeNav];
}
- (void)centerBtnClick:(UIButton *)btn{
    AddBillInfoViewController *abVC = [AddBillInfoViewController new];
    abVC.modalPresentationStyle = UIModalPresentationFullScreen;
    [self presentViewController:abVC animated:YES completion:nil];
    NSLog(@"实现点击的协议");
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
