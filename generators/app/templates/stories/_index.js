import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import <%= zooidName %> from '../src'

storiesOf('<%= zooidName %>', module)
  .add('Basic', () => (
    <<%= zooidName %> />
  ))
