import { mount } from '@vue/test-utils';
import SubscriptionsView from "@/views/SubscriptionsView.vue";

import { RouterLinkStub } from '@vue/test-utils';

describe('SubscriptionsView.vue', () => {
  it('emits "unsubscribe" event when Unsubscribe button is clicked', () => {
    const subscriptions = [
      { id: 1, show: 'Show 1', expiryDate: '2023-07-30' },
      { id: 2, show: 'Show 2', expiryDate: '2023-07-15' },
    ];

    const wrapper = mount(SubscriptionsView, {
        stubs: {
            RouterLink: RouterLinkStub
        },
      propsData: {
        subscriptions: subscriptions,
      },
    });

    const unsubscribeButton = wrapper.find('button');

    unsubscribeButton.trigger('click');

    expect(wrapper.emitted('unsubscribe')).toBeTruthy();
  });
});
