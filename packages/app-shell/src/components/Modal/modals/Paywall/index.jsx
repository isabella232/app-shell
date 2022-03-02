import React, { useEffect } from 'react';
import { BufferTracker } from '@bufferapp/buffer-tracking-browser-ts';
import { useUser } from '../../../../common/context/User';
import { getActiveProductFromPath } from '../../../../common/utils/getProduct';
import { EngagementContent } from './components/EngagementContent';
import { AnalyticsContent } from './components/AnalyticsContent';

export const Paywall = () => {
  const user = useUser();
  const product = getActiveProductFromPath();

  useEffect(() => {
    BufferTracker.pageViewed({
      name: 'paywall modal',
      product: window.PRODUCT_TRACKING_KEY,
      organizationId: user?.currentOrganization?.organizationId,
    });
  }, [user]);

  return (<>
    {product === 'engage' && (<EngagementContent />)}
    {product === 'analyze' && (<AnalyticsContent />)}
  </>);
};
