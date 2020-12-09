//
//  AnimatedClass.m
//  pushViewTest
//
//  Created by mt010 on 2020/11/17.
//  Copyright © 2020 live. All rights reserved.
//

#import "AnimatedClass.h"

@implementation AnimatedClass


+ (instancetype)manager {
    AnimatedClass *manager = [[self alloc] init];
    return manager;
}
- (NSTimeInterval)transitionDuration:(nullable id <UIViewControllerContextTransitioning>)transitionContext{
    return 0.4f;
}
- (void)animateTransition:(id <UIViewControllerContextTransitioning>)transitionContext{
    //转场过渡的容器view
    UIView *containerView = [transitionContext containerView];
    //FromVC
    UIViewController *fromViewController = [transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];
    UIView *fromView = fromViewController.view;

    //ToVC
    UIViewController *toViewController = [transitionContext viewControllerForKey:UITransitionContextToViewControllerKey];
    UIView *toView = toViewController.view;
    CGRect toViewFrame = toView.frame;
    CGFloat toViewFrameX = toViewFrame.origin.x;
    CGFloat toViewFrameY = toViewFrame.origin.y;
    CGFloat toViewFrameW = toViewFrame.size.width;
    CGFloat toViewFrameH = toViewFrame.size.height;
    CGRect fromViewFrame = fromView.frame;
    CGFloat fromViewFrameX = fromViewFrame.origin.x;
    CGFloat fromViewFrameY = fromViewFrame.origin.y;
    CGFloat fromViewFrameW = fromViewFrame.size.width;
    CGFloat fromViewFrameH = fromViewFrame.size.height;
    if(self.type == DZGModalTransitionPush){
        NSLog(@"我是push");
        [containerView addSubview:fromView];
        [containerView addSubview:toView];
        toView.frame = CGRectMake(toViewFrameX, toViewFrameY + toViewFrameH, toViewFrameW, toViewFrameH);
        [UIView animateWithDuration:[self transitionDuration:transitionContext] delay:0.0f options:UIViewAnimationOptionCurveEaseInOut | UIViewAnimationOptionCurveEaseOut animations:^{
            toView.frame = toViewFrame;
        } completion:^(BOOL finished) {
            BOOL wasCancelled = [transitionContext transitionWasCancelled];
            if (wasCancelled){
                [fromView removeFromSuperview];
            }
            //设置transitionContext通知系统动画执行完毕
            [transitionContext completeTransition:!wasCancelled];
        }];
    }else if(self.type == DZGModalTransitionPop){
        [containerView addSubview:fromView];
        [containerView addSubview:toView];
        fromView.frame = fromViewFrame;
        [UIView animateWithDuration:[self transitionDuration:transitionContext] delay:0.0f options:UIViewAnimationOptionCurveEaseInOut | UIViewAnimationOptionCurveEaseOut animations:^{
            fromView.frame = CGRectMake(fromViewFrameX, 100, fromViewFrameW, fromViewFrameH);
        } completion:^(BOOL finished) {
            BOOL wasCancelled = [transitionContext transitionWasCancelled];
            if (wasCancelled){
                [fromView removeFromSuperview];
            }
            //设置transitionContext通知系统动画执行完毕
            [transitionContext completeTransition:!wasCancelled];
        }];
    }

}
@end
