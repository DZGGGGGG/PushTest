//
//  AnimatedClass.h
//  pushViewTest
//
//  Created by mt010 on 2020/11/17.
//  Copyright © 2020 live. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
typedef NS_ENUM(NSUInteger, DZGModalTransitionType) {
  DZGModalTransitionPresent = 1 << 1,
  DZGModalTransitionDismiss = 1 << 2,
  DZGModalTransitionPush = 1 << 1,
  DZGModalTransitionPop = 1 << 2
};
//typedef NS_ENUM(NSUInteger, DZGModalTransitionAction) {
//  kHYBModalTransitionPresent = 1 << 1,
//  kHYBModalTransitionDismiss = 1 << 2,
//  kHYBModalTransitionPush = 1 << 1,
//  kHYBModalTransitionPop = 1 << 2
//};
@interface AnimatedClass : NSObject<UIViewControllerAnimatedTransitioning,UIViewControllerInteractiveTransitioning>


/// Transition the view controller to this step.
@property (nonatomic) DZGModalTransitionType type;

/// Style the transition this way
//@property (nonatomic) DZGModalTransitionType style;

/// The duration of the transition
@property (nonatomic) NSTimeInterval duration;
/**
 *  Creates a transition manager object for you.
 *
 *  @return Transition manager object
 */
+ (instancetype)manager;
@end

NS_ASSUME_NONNULL_END
