

import { UAPageView, UAEvent } from '@/types/analytics';

const dataLayerPush = (data: Record<string, unknown>) => {
  window?.dataLayer && window.dataLayer.push(data);
};

const pushEventDataLayer = ({ action = '', category = '', label = '', value = '' }: UAEvent) => {
  const event = {
    event: 'GAEvent',
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    eventValue: value
  };

  dataLayerPush(event);
};

const pushPageViewDataLayer = ({ url, title }: UAPageView) => {
  const pageEvent = {
    event: 'GAPageView',
    pageViewUrl: url,
    pageViewTitle: title
  };

  dataLayerPush(pageEvent);
};

export { dataLayerPush, pushEventDataLayer, pushPageViewDataLayer };
