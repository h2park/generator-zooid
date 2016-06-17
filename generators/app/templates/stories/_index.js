import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import <%= zooidname %> from '../src'

storiesOf('<%= zooidname %>', module)
  .add('Basic', () => (
    <<%= zooidname %>/>
  ))
