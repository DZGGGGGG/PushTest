//
//  SecondViewController.m
//  pushViewTest
//
//  Created by mt010 on 2020/11/27.
//  Copyright © 2020 live. All rights reserved.
//

#import "SecondViewController.h"

@interface SecondViewController ()

@end

@implementation SecondViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.title = @"第二个页面";
    self.view.backgroundColor = UIColor.whiteColor;
    
    UIButton *leftButton = [UIButton buttonWithType:UIButtonTypeSystem];
    leftButton.frame = CGRectMake(0, 0, 50, 50);
    UIImage *leftImage = [UIImage imageNamed:@"test"];
    [leftImage imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    [leftButton setBackgroundImage:leftImage forState:UIControlStateNormal];
    [leftButton addTarget:self action:@selector(leftBackClicked:) forControlEvents:UIControlEventTouchUpInside];
    UIBarButtonItem *leftButtonItem = [[UIBarButtonItem alloc] initWithImage:leftImage style:UIBarButtonItemStylePlain target:self action:@selector(leftBackClicked:)];
    
    self.navigationItem.leftBarButtonItem = leftButtonItem;
}
- (void)leftBackClicked:(UIButton *)btn{
    [self.navigationController popViewControllerAnimated:YES];
}
- (void)addClick:(UIButton *)btn{
    NSLog(@"添加");
}
- (void)viewDidDisappear:(BOOL)animated{
    [super viewDidDisappear:animated];
}
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
@end
