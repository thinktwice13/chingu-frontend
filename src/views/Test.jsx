import React from 'react';
import Button from 'components/UI/Button';

const Avatar = props => (
  <img
    src='https://avatars0.githubusercontent.com/u/6613473?v=4'
    alt='avatar'
    className='avatar'
    onClick={() => {
      console.log('clicked');
    }}
  />
);

const Test = () => (
  <div style={{ paddingTop: '128px', paddingBottom: '64px', display: 'flex', flexWrap: 'wrap' }}>
    <Button>default</Button>
    <Button disabled rounded>
      disabled rounded
    </Button>
    <Button size='small' theme='error'>
      small error
    </Button>
    <Button size='small' inverted theme='warning' rounded>
      small warning
    </Button>
    <Button size='large' inverted>
      large inverted
    </Button>
    <Button size='large' disabled>
      large disabled
    </Button>
  </div>
);

export default Test;
