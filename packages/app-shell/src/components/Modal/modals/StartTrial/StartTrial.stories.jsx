import React from 'react'
import StartTrial from './index'
import { UserContext } from '../../../../common/context/User'
import response from '../../../../common/mocks/trialExpiredMock'

export default {
  title: 'Start Trial Modal',
  component: StartTrial,
}

const Template = (args) => (
  <UserContext.Provider value={response.data.account}>
    <StartTrial {...args} />
  </UserContext.Provider>
)

export const Example = Template.bind({})
Example.args = {
}
