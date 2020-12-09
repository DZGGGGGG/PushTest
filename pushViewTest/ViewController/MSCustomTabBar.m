//
//  MSCustomTabBar.m
//  pushViewTest
//
//  Created by mt010 on 2020/11/30.
//  Copyright © 2020 live. All rights reserved.
//

#import "MSCustomTabBar.h"
@interface MSCustomTabBar ()
@property (nonatomic,strong)UIButton *centerBtn;
@end


@implementation MSCustomTabBar
- (UIButton *)centerBtn{
    if(!_centerBtn){
        _centerBtn = [UIButton buttonWithType:UIButtonTypeSystem];
        _centerBtn.frame = CGRectMake(0, 0, 60, 60);
        [_centerBtn setImage:[UIImage imageNamed:@"4444"] forState:UIControlStateNormal];
        _centerBtn.imageView.layer.cornerRadius = 30;
        [_centerBtn addTarget:self action:@selector(centerClick:) forControlEvents:UIControlEventTouchUpInside];
    }
    return _centerBtn;
}
- (void)centerClick:(UIButton *)btn{
    if ([self.DZGCenterBtnDelegate respondsToSelector:@selector(centerBtnClick:)]){
        [self.DZGCenterBtnDelegate centerBtnClick:btn];
    }
}
- (void)layoutSubviews{
    [super layoutSubviews];
    NSMutableArray *tabBarButtonArray = [NSMutableArray array];
    for (UIView *view in self.subviews) {
        if([view isKindOfClass:NSClassFromString(@"UITabBarButton")]){
            [tabBarButtonArray addObject:view];
        }
    }
    CGFloat barWidth = self.bounds.size.width;
    CGFloat barHeight = self.bounds.size.height;
    CGFloat centerBtnWidth = CGRectGetWidth(self.centerBtn.frame);
    CGFloat centerBtnHeight = CGRectGetHeight(self.centerBtn.frame);
    // 设置中间按钮的位置，居中，凸起一丢丢
    self.centerBtn.center = CGPointMake(barWidth / 2, barHeight - centerBtnHeight / 2 - 20);
    // 重新布局其他 tabBarItem
    // 平均分配其他 tabBarItem 的宽度
    CGFloat barItemWidth = (barWidth - centerBtnWidth) / tabBarButtonArray.count;
    
    [tabBarButtonArray enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        UIView *view = obj;
        CGRect frame = view.frame;
        if (idx >= tabBarButtonArray.count / 2) {
            // 重新设置 x 坐标，如果排在中间按钮的右边需要加上中间按钮的宽度
            frame.origin.x = idx * barItemWidth + centerBtnWidth;
        } else {
            frame.origin.x = idx * barItemWidth;
        }
        // 重新设置宽度
        frame.size.width = barItemWidth;
        view.frame = frame;
    }];
    // 把中间按钮带到视图最前面
    //[self bringSubviewToFront:self.centerBtn];
    [self addSubview:self.centerBtn];
    
}

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event
{
    if (self.clipsToBounds || self.hidden || (self.alpha == 0.f)) {
        return nil;
    }
    UIView *result = [super hitTest:point withEvent:event];
    // 如果事件发生在 tabbar 里面直接返回
    if (result) {
        return result;
    }
    // 这里遍历那些超出的部分就可以了，不过这么写比较通用。
    for (UIView *subview in self.subviews) {
        // 把这个坐标从tabbar的坐标系转为 subview 的坐标系
        CGPoint subPoint = [subview convertPoint:point fromView:self];
        result = [subview hitTest:subPoint withEvent:event];
        // 如果事件发生在 subView 里就返回
        if (result) {
            return result;
        }
    }
    return nil;
}
@end
