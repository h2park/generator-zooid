import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import <%= zooidName %> from '../src'

storiesOf('<%= zooidName %>', module)
  .addWithInfo('Basic', 'added Description', () => (
    <<%= zooidName %> />
  ), { inline: true })
  .add('Basic', () => (
    <<%= zooidName %> />
  ))
