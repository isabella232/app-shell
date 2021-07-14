import React from 'react';

import Text from '@bufferapp/ui/Text';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import { purple, white, blue, teal } from '@bufferapp/ui/style/colors';

import {
  Holder,
  Hero,
  IconWrapper,
  Feature,
  Label,
  InstagramPosting,
  BufferSuite,
  OneBuffer,
  FreePlanBorder,
  EssentialsPlanBorder,
} from './style';

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

        <InstagramPosting></InstagramPosting>
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

        <BufferSuite></BufferSuite>
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

        <OneBuffer></OneBuffer>
      </Feature>

      <TableContainer>
        <Text type="h2">There is so much to gain</Text>
        <Text type="p">
          Supercharging your plan with so much more than what you have today
        </Text>

        <FreePlanBorder></FreePlanBorder>
        <EssentialsPlanBorder></EssentialsPlanBorder>
        <FeaturesTable>
          <thead>
            <tr>
              <th>Category</th>
              <th>
                <span>Free</span>
                <div>
                  <p>$0 per social channel</p>
                </div>
              </th>
              <th>
                <span>Essentials</span>
                <div>
                  <p>Starts at $6/mo</p>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <FeatureName>
                <div>Feature Name</div>
                <span>Feature Description</span>
              </FeatureName>
              <td>{checkIfBoolean(feature.free)}</td>
              <td>{checkIfBoolean(feature.essential)}</td>
            </tr>
          </tbody>
        </FeaturesTable>
      </TableContainer>
    </Holder>
  );
};

export default LearnMore;
