//
//  ViewController.m
//  pushViewTest
//
//  Created by mt010 on 2020/11/17.
//  Copyright © 2020 live. All rights reserved.
//

#import "ViewController.h"
#import "AccountBookViewController.h"
#import "Masonry.h"
#define KdeviceWidth UIScreen.mainScreen.bounds.size.width
#define KdeviceHeight UIScreen.mainScreen.bounds.size.height

@interface ViewController ()
@property (nonatomic, strong) AnimatedClass *transition;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"首页";
    
    self.view.backgroundColor = UIColor.whiteColor;
        UIButton *push = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 100, 50)];
        [push addTarget:self action:@selector(push) forControlEvents:UIControlEventTouchUpInside];
        [push setTitle:@"跳转" forState:UIControlStateNormal];
        push.backgroundColor = UIColor.blackColor;
        push.center = CGPointMake(KdeviceWidth/  2, KdeviceHeight / 2 - 50);
        [push setTitleColor:UIColor.whiteColor forState:UIControlStateNormal];
        [self.view addSubview:push];
        UIButton *push2 = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 100, 50)];
        [push2 addTarget:self action:@selector(push2) forControlEvents:UIControlEventTouchUpInside];
        [push2 setTitle:@"跳转原生效果" forState:UIControlStateNormal];
        push2.backgroundColor = UIColor.blackColor;
        push2.center = CGPointMake(KdeviceWidth/  2, KdeviceHeight / 2 + 50);
        [push setTitleColor:UIColor.whiteColor forState:UIControlStateNormal];
        [self.view addSubview:push2];
        [self animationTest];
        UIWindow *topWindow = [[[UIApplication sharedApplication] delegate] window];
    
    NSLog(@"%@",[(UITabBarController *)topWindow.rootViewController viewControllers]);
//    [self gcdSyncTest];
//    [self gcdQueueTest];
    [self masonryTest];
}
- (void)masonryTest{
    UIView *testWindow = [UIView new];
    testWindow.backgroundColor = UIColor.orangeColor;
    [self.view addSubview:testWindow];
    
    UIView *testWindowTwo = [UIView new];
    testWindowTwo.backgroundColor = UIColor.blueColor;
    [self.view addSubview:testWindowTwo];
    
    UIView *squareOne = [UIView new];
    squareOne.backgroundColor = UIColor.redColor;
    [testWindow addSubview:squareOne];
    
    UIView *squareTwo = [UIView new];
    squareTwo.backgroundColor = UIColor.redColor;
    [testWindow addSubview:squareTwo];
    
    UIView *squareThree = [UIView new];
    squareThree.backgroundColor = UIColor.redColor;
    [testWindow addSubview:squareThree];
    
    
    UIView *squareFour = [UIView new];
    squareFour.backgroundColor = UIColor.redColor;
    [testWindowTwo addSubview:squareFour];
    
    UIView *squareFive = [UIView new];
    squareFive.backgroundColor = UIColor.redColor;
    [testWindowTwo addSubview:squareFive];
    
    UIView *squareSix = [UIView new];
    squareSix.backgroundColor = UIColor.redColor;
    [testWindowTwo addSubview:squareSix];
    
    [testWindow mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.mas_equalTo(self.view);
        make.height.mas_offset(200);
        make.width.mas_offset(300);
        make.bottom.mas_equalTo(self.view).mas_offset(0);
    }];
    
    [testWindowTwo mas_makeConstraints:^(MASConstraintMaker *make) {
        make.height.mas_offset(300);
        make.width.mas_offset(100);
        make.centerX.mas_equalTo(self.view);
    }];
    [squareOne mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_offset(20);
        make.bottom.mas_offset(-20);
    }];
    [squareTwo mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_offset(20);
        make.bottom.mas_offset(-20);
    }];
    [squareThree mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_offset(20);
        make.bottom.mas_offset(-20);
    }];
    [squareFour mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.mas_offset(20);
        make.right.mas_offset(-20);
    }];
    [squareFive mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.mas_offset(20);
        make.right.mas_offset(-20);
    }];
    [squareSix mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.mas_offset(20);
        make.right.mas_offset(-20);
    }];
    [@[squareOne,squareTwo,squareThree] mas_distributeViewsAlongAxis:MASAxisTypeHorizontal withFixedSpacing:20.0 leadSpacing:20.0 tailSpacing:20.0];
    
    [@[squareFour,squareFive,squareSix] mas_distributeViewsAlongAxis:MASAxisTypeVertical withFixedSpacing:20.0 leadSpacing:20.0 tailSpacing:20.0];
    
    
}
- (void)animationTest{
    CALayer *layer = [CALayer new];
    layer.frame = CGRectMake(100, 100, 100, 100);
    layer.backgroundColor = [UIColor redColor].CGColor;
    [self.view.layer addSublayer: layer];
    
    CABasicAnimation *animation  = [CABasicAnimation animationWithKeyPath:@"position"];
    animation.duration = 2;
    
    animation.fromValue = [NSValue valueWithCGPoint:layer.position];
    
    animation.toValue = [NSValue valueWithCGPoint:CGPointMake(300, 300)];
    // 指定动画重复是否累加
    animation.cumulative = NO;
    // 动画完成是否移除动画
    animation.removedOnCompletion = YES;
    // 设置移动的效果为快入快出
    animation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    // 设置无限循环动画
    animation.repeatCount = HUGE_VALF;
    // 设置动画完成时，自动以动画回到原点
    animation.autoreverses = YES;
    // 设置动画完成时，返回到原点
    animation.fillMode = kCAFillModeForwards;
    
    [layer addAnimation:animation forKey:nil];
}
- (void)gcdSyncTest{
//    NSLog(@"开始执行同步任务 线程堵塞不会影响UI动画");
//    dispatch_sync(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
//        sleep(2); //使用sleep函数 会阻塞当前线程 模拟任务所需时间
//        NSLog(@"任务执行完毕 交给后面的b验收");
//        sleep(1);
//    });
//    NSLog(@"验收成功");
//    NSLog(@"开始执行异步任务 不会阻塞当前线程");
//    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
//        sleep(2); //开始执行任务
//        NSLog(@"任务执行完毕 交给后面的b验收");
//        sleep(1);
//        NSLog(@"验收成功");
//    });
//    NSLog(@"任务执行中");
}
- (void)gcdQueueTest{
    dispatch_queue_t queue = dispatch_get_main_queue();
    NSLog(@"获取的主队列%@",queue);
    //创造一个串行队列
    dispatch_queue_t createQueueOne = dispatch_queue_create("com.dzg.QueueOne", NULL);
    NSLog(@"创建的串行队列1%@",createQueueOne);
    //创造一个串行队列
    dispatch_queue_t createQueueTwo = dispatch_queue_create("com.dzg.QueueTwo", DISPATCH_QUEUE_SERIAL);
    NSLog(@"创建的串行队列2%@",createQueueTwo);
    //创造一个并行队列
    dispatch_queue_t createQueueThere= dispatch_queue_create("com.dzg.QueueThere", DISPATCH_QUEUE_CONCURRENT);
    NSLog(@"创建的并行队列3%@",createQueueThere);
    //OBJECTIVE-C 这是全局的并行队列
    dispatch_queue_t createQueueFour = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    NSLog(@"全局的并行队列4%@",createQueueFour);
}


- (void)push2{
    AccountBookViewController *sec = [AccountBookViewController new];
    sec.modalPresentationStyle = UIModalPresentationFullScreen;
    [self.navigationController presentViewController:sec animated:YES completion:nil];
    
}
- (void)push{
    AccountBookViewController *sec = [AccountBookViewController new];
    self.navigationController.delegate = self;
    self.transition.type = DZGModalTransitionPush;
    self.hidesBottomBarWhenPushed = YES;
    [self.navigationController pushViewController:sec animated:YES];
    self.hidesBottomBarWhenPushed = NO;
}
//- (nullable id <UIViewControllerAnimatedTransitioning>)navigationController:(UINavigationController *)navigationController animationControllerForOperation:(UINavigationControllerOperation)operation fromViewController:(UIViewController *)fromVC toViewController:(UIViewController *)toVC{
//    AnimatedClass *aaa = [AnimatedClass new];
//    aaa.type = DZGModalTransitionPush;
//    return aaa;
//}


// 代理方法2
// 返回一个实现了UIViewControllerInteractiveTransitioning协议的对象，即完成动画交互（动画进度）的对象
//- (id<UIViewControllerInteractiveTransitioning>)navigationController:(UINavigationController *)navigationController interactionControllerForAnimationController:(id<UIViewControllerAnimatedTransitioning>)animationController
//{
//    
//    AnimatedClass *aaa = [AnimatedClass new];
//    if([animationController isKindOfClass:[AnimatedClass class]])
//    {
//        return aaa;
//    }
//    return nil;
//}
@end
