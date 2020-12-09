//
//  AccountBookViewController.m
//  pushViewTest
//
//  Created by mt010 on 2020/11/20.
//  Copyright © 2020 live. All rights reserved.
//

#import "AccountBookViewController.h"
#import "ViewController.h"
#import "SecondViewController.h"
#import "Masonry.h"

#import "TestObject.h"
@interface AccountBookViewController ()<UIGestureRecognizerDelegate>

@end

@implementation AccountBookViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.title = @"账本";
    self.view.backgroundColor = UIColor.whiteColor;
    UIButton *tiao = [UIButton buttonWithType:UIButtonTypeSystem];
    
    [tiao setTitle:@"跳转" forState:UIControlStateNormal];
    tiao.backgroundColor = UIColor.blackColor;
    [tiao setTitleColor:UIColor.whiteColor forState:UIControlStateNormal];
    
    [tiao addTarget:self action:@selector(tiaozhuan) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:tiao];
    
    [tiao mas_makeConstraints:^(MASConstraintMaker *make) {
        make.center.mas_equalTo(self.view);
        make.height.offset(100);
        make.width.offset(100);
    }];
    TestObject *bbb = [TestObject new];
//    [bbb addObserver:self forKeyPath:@"name" options:NSKeyValueObservingOptionNew context:nil];
//    [bbb addObserver:self forKeyPath:@"age" options:NSKeyValueObservingOptionNew context:nil];
    
    bbb.name = @"我是第一次赋值";
    bbb.age = @"dhjasjkd";
    
//    NSLog(@"bbb.name = %@",bbb.name);
    [bbb setValue:@"我是通过kvc赋值" forKey:@"age"];
//    NSLog(@"bbb.name = %@",[bbb valueForKey:@"name"]);
//    [bbb setValue:@"我是cccc" forKeyPath:@"name"];
//    NSLog(@"bbb.name = %@",[bbb valueForKey:@"name"]);
    //    NSSet *testSet = [[NSSet alloc] initWithObjects:@"1",@"2",@"3",@"4",@"5",@"6", nil];
    //
    //    NSEnumerator *enumer=[testSet objectEnumerator];
    //
    //    id object;
    //    while ((object=[enumer nextObject]) != nil) {
    //
    //        NSLog(@"%@",object);
    //    }
}
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context{
    if ([keyPath isEqualToString:@"name"]){
        id oldName = [change objectForKey:NSKeyValueChangeOldKey];
        NSLog(@"oldName----------%@",oldName);
        id newName = [change objectForKey:NSKeyValueChangeNewKey];
        NSLog(@"newName-----------%@",newName);
    }else if ([keyPath isEqualToString:@"age"]){
        id oldName = [change objectForKey:NSKeyValueChangeOldKey];
        NSLog(@"oldName----------%@",oldName);
        id newName = [change objectForKey:NSKeyValueChangeNewKey];
        NSLog(@"newName-----------%@",newName);
    }
}
- (void)tiaozhuan{
    SecondViewController *vc = [SecondViewController new];
    self.hidesBottomBarWhenPushed = YES;
    [self.navigationController pushViewController:vc animated:YES];
    self.hidesBottomBarWhenPushed = NO;
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
