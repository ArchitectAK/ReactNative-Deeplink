#import <Foundation/Foundation.h>
#import <EXUpdates/EXUpdatesAppController.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <UMCore/UMAppDelegateWrapper.h>

@interface AppDelegate : UMAppDelegateWrapper <RCTBridgeDelegate, EXUpdatesAppControllerDelegate, UNUserNotificationCenterDelegate>

@end
