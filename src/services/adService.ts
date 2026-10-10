// Ads architecture abstraction for commercial mobile games
export interface AdRewardCallback {
  onRewarded: () => void;
  onClosed?: () => void;
  onError?: (err: string) => void;
}

class MobileAdManager {
  private bannerEnabled = false;
  private rewardedReady = true;

  public isRewardedReady(): boolean {
    return this.rewardedReady;
  }

  public showRewardedAd(callback: AdRewardCallback) {
    // Simulated pleasant rewarded ad popup/dialog for hints
    const confirmed = window.confirm('🎁 Watch a short relaxing message to reveal 3 free hints?');
    if (confirmed) {
      setTimeout(() => {
        callback.onRewarded();
      }, 300);
    } else {
      callback.onClosed?.();
    }
  }

  public toggleBanner(show: boolean) {
    this.bannerEnabled = show;
  }

  public isBannerEnabled(): boolean {
    return this.bannerEnabled;
  }
}

export const adManager = new MobileAdManager();
