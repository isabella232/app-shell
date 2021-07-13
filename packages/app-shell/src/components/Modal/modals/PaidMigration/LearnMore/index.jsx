import React from 'react';

import Text from '@bufferapp/ui/Text';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import { purple, white, blue, teal } from '@bufferapp/ui/style/colors';

import { Holder, Content, Hero, IconWrapper, Feature, Label } from './style';

const LearnMore = () => {
  return (
    <Holder>
      <Hero>
        <img
          src="https://buffer-ui.s3.amazonaws.com/avatars/avatar-joel.jpg"
          width="117"
          height="117"
        />
        <Text type="p">
          Hey, it’s Joel the CEO here. I wanted to say that we’re embarking on a
          new future here at Buffer that involves what we believe to be better
          plans, better pricing that works for you and your online business.
        </Text>

        <IconWrapper>
          <FlashIcon size="large" />
        </IconWrapper>

        <Text type="h1">Introducing the Essentials plan</Text>
      </Hero>

      <Feature>
        <Label color={purple}>
          <FlashIcon size="medium" verticalAlign="middle" />
          <Text type="p">Included with Essentials</Text>
        </Label>

        <Text type="h2">Take your posting power to the next level</Text>
        <Text type="p">
          With advanced Instagram features like our Hashtag Manager, Shop Grid
          and Instagram Stories scheduling you can take things further
        </Text>
      </Feature>

      <Feature backgroundColor={blue}>
        <Label color={white}>
          <FlashIcon size="medium" verticalAlign="middle" />
          <Text type="p">Included with Essentials</Text>
        </Label>

        <Text type="h2" color="white">
          Giving you the best of what we offer
        </Text>
        <Text type="p" color="white">
          You get the full package with our comprehensive publishing, analytics
          and engagement tools to power your business
        </Text>
      </Feature>

      <Feature backgroundColor={teal}>
        <Label color={white}>
          <FlashIcon size="medium" verticalAlign="middle" />
          <Text type="p">Included with Essentials</Text>
        </Label>

        <Text type="h2" color="white">
          Know where to take your business next
        </Text>
        <Text type="p" color="white">
          Go deeper with comprehensive cross-network analytics that will let you
          see the bigger picture and help you shape where to go next
        </Text>
      </Feature>
    </Holder>
  );
};

export default LearnMore;
