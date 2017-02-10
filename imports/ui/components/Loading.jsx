import React from 'react';

import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const Loading = () => {
  return (
    <Segment>

      <Dimmer active inverted>
        <Loader size='medium'>Loading</Loader>
      </Dimmer>

      <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>
  );

};

export default Loading;
