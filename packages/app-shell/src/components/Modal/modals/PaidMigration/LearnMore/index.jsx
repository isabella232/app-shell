import React from 'react';

import Text from '@bufferapp/ui/Text';

import  { Holder, Content, Intro } from './style'

const LearnMore = () => {
  return ( 
    <Holder>
      <Content>
        <Intro>
          <img src="https://buffer-ui.s3.amazonaws.com/avatars/avatar-joel.jpg" width="117" height="117"/>
          <Text type="p">Hey, it’s Joel the CEO here. I wanted to say that we’re embarking on a new future here at Buffer that involves what we believe to be better plans, better pricing that works for you and your online business.</Text>
        </Intro>
      
      </Content>
    </Holder>
   );
}
 
export default LearnMore;