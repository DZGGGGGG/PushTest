//
//  MSCustomTabBar.h
//  pushViewTest
//
//  Created by mt010 on 2020/11/30.
//  Copyright © 2020 live. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@protocol DZGCenterBtnDelegate<NSObject>
@required
//点击事件的返回      这个东西叫协议
- (void) centerBtnClick:(UIButton *)btn;
@end
@interface MSCustomTabBar : UITabBar
@property (nonatomic,weak)id <DZGCenterBtnDelegate> DZGCenterBtnDelegate;

@end

NS_ASSUME_NONNULL_END
