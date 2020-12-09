//
//  AddBillInfoViewController.m
//  pushViewTest
//
//  Created by mt010 on 2020/12/9.
//  Copyright © 2020 live. All rights reserved.
//

#import "AddBillInfoViewController.h"
#import "DZGHeaderCollectionViewCell.h"
#import "DZGContentCollectionViewCell.h"

#import "Masonry.h"
static NSString *DZGHeaderCollectionViewCellC = @"DZGHeaderCollectionViewCell";
static NSString *DZGContentCollectionViewCellC = @"DZGContentCollectionViewCell";
@interface AddBillInfoViewController () <UICollectionViewDelegate,UICollectionViewDataSource>
@property (nonatomic ,strong) UICollectionView *collView;
@end

@implementation AddBillInfoViewController

- (void)viewDidLoad {
    [super viewDidLoad];
}
- (void)setPageUI{
    self.view.backgroundColor = UIColor.whiteColor;
    UIView *footerView = [[UIView alloc] init];
    [self.view addSubview:footerView];
    [self.view addSubview:_collView];
}
- (UICollectionView *)collView{
    if(!_collView){
        _collView = [[UICollectionView alloc] init];
        UICollectionViewFlowLayout *layout = [[UICollectionViewFlowLayout alloc]init];
        layout.sectionHeadersPinToVisibleBounds = YES;
        layout.sectionInset = UIEdgeInsetsMake(10.0, 10.0, 10.0, 10.0);//section之间的间距
        layout.minimumInteritemSpacing = 10.0; // cell的纵向间距
        layout.minimumLineSpacing = 10.0;// cell的横向间距
        
        _collView.backgroundColor = UIColor.whiteColor;
        [_collView registerClass:[DZGHeaderCollectionViewCell class] forCellWithReuseIdentifier:DZGHeaderCollectionViewCellC];
        [_collView registerClass:[DZGContentCollectionViewCell class] forCellWithReuseIdentifier:DZGContentCollectionViewCellC];
        _collView.collectionViewLayout = layout;
        _collView.showsHorizontalScrollIndicator = NO;
        _collView.dataSource = self;
        _collView.delegate = self;
    }
    return _collView;
}
- (void)backClick{
    [self dismissViewControllerAnimated:YES completion:nil];
}
- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView{
    return 1;
}
- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section{
    return 1;
}
- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout referenceSizeForHeaderInSection:(NSInteger)section {
    if (section == 0) {
        return CGSizeMake(UIScreen.mainScreen.bounds.size.width, [DZGHeaderCollectionViewCell getHeaderHeight]);
    } else {
        
    }
    return CGSizeMake(0, 0);
}
//- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath{
//}
@end
