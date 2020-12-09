//
//  TestViewController.m
//  pushViewTest
//
//  Created by mt010 on 2020/11/17.
//  Copyright © 2020 live. All rights reserved.
//

#import "TestViewController.h"
#import "ViewController.h"
#define KdeviceWidth UIScreen.mainScreen.bounds.size.width
#define KdeviceHeight UIScreen.mainScreen.bounds.size.height

@interface TestViewController ()
@end

@implementation TestViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = UIColor.redColor;
    UIButton *push = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 100, 50)];
    [push addTarget:self action:@selector(pop) forControlEvents:UIControlEventTouchUpInside];
    [push setTitle:@"返回" forState:UIControlStateNormal];
    push.backgroundColor = UIColor.blackColor;
    push.center = CGPointMake(KdeviceWidth/  2, KdeviceHeight / 2);
    [push setTitleColor:UIColor.whiteColor forState:UIControlStateNormal];
    [self.view addSubview:push];
    
}

- (void)pop{
    NSLog(@"跳转");
    if(!self.navigationController){
        [self dismissViewControllerAnimated:YES completion:nil];
    }else{
        self.navigationController.delegate = self;
        [self.navigationController popViewControllerAnimated:YES];
    }
}

- (nullable id <UIViewControllerAnimatedTransitioning>)navigationController:(UINavigationController *)navigationController animationControllerForOperation:(UINavigationControllerOperation)operation fromViewController:(UIViewController *)fromVC toViewController:(UIViewController *)toVC{
    AnimatedClass *transition = [AnimatedClass new];
    transition.type = DZGModalTransitionPop;
    return transition;
}
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

- (void)methodOne{
    NSLog(@"我是必须实现的方法一");
}
- (void)methodTwo{
    NSLog(@"我是必须实现的方法二");
}
- (void)methodFour{
    NSLog(@"我是可实现可不实现的方法四");
    
}
- (void)methodThree{
    NSLog(@"我是可实现可不实现的方法三");
}
@end
