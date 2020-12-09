//
//  AppDelegate.m
//  pushViewTest
//
//  Created by mt010 on 2020/11/17.
//  Copyright © 2020 live. All rights reserved.
//

#import "AppDelegate.h"
#import "MSTabBarController.h"
@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    self.window = [[UIWindow alloc] initWithFrame:UIScreen.mainScreen.bounds];
//    AccountBookViewController *accountVC = [[AccountBookViewController alloc] init];
//    BaseNavViewController *accountNav = [[BaseNavViewController alloc] initWithRootViewController:accountVC];
//    accountNav.navigationBar.translucent = NO;
//    accountNav.tabBarItem = [[UITabBarItem alloc] initWithTabBarSystemItem:UITabBarSystemItemMostViewed tag:1];
//
//    ViewController *homeVC = [ViewController new];
//    BaseNavViewController *homeNav = [[BaseNavViewController alloc] initWithRootViewController:homeVC];
//    homeNav.navigationBar.translucent = NO;
//    homeNav.tabBarItem = [[UITabBarItem alloc] initWithTabBarSystemItem:UITabBarSystemItemTopRated tag:2];
//
//
//    UITabBarController *tabbarCr = [[UITabBarController alloc] init];
//    [tabbarCr addChildViewController:accountNav];
//    [tabbarCr addChildViewController:homeNav];
    
    MSTabBarController *baseTabbarVC = [MSTabBarController new];
    
    [self.window setRootViewController:baseTabbarVC];
    [self.window makeKeyAndVisible];
    
    
    return YES;
}

@end
