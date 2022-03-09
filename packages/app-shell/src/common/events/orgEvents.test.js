import eventDispatcher from 'utils/eventDispatcher'
import {
  getActionFromEvent,
  ACTIONS,
  EVENT_KEY,
  ACTION_KEYS,
  MISSING_USER_ERROR,
} from './orgEvents';

jest.mock('utils/eventDispatcher');

describe('startTrial action', () => {
  beforeEach(() => {
      jest.clearAllMocks()
  })

  it('to throw if missing user data', async () => {
    expect(ACTIONS.startTrial).toThrow(MISSING_USER_ERROR);
  })

  it('dispatch the action', async () => {
    const user = 'fooUser';
    const data = 'testData';
    ACTIONS.startTrial({ user, data })
    expect(eventDispatcher).toHaveBeenCalledWith(EVENT_KEY, {
      action: ACTION_KEYS.startTrial,
      options: { user, data  },
    })
  })
})

describe('handleOrgEvents', () => {
  it('to throw if missing user data', async () => {
    expect(() => getActionFromEvent({
      detail: {
        action: ACTION_KEYS.startTrial,
      }
    })).toThrow(MISSING_USER_ERROR);
  })
})
