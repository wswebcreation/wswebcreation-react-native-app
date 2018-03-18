import React from 'react';
import { storiesOf } from '@storybook/react-native';
import defaultDecorator from '../../decorators/defaultDecorator';
import AnimationStory from './AnimationStory';
import BorderTextStory from './BorderTextStory';
import ChatInputStory from './ChatInputStory';
import CustomHeaderStory from './CustomHeaderStory';
import MessageBubbleStory from './MessageBubbleStory';

storiesOf('Components', module)
  .addDecorator(defaultDecorator)
  .add('Animation example', () => <AnimationStory/>)
  .add('Border Text', () => <BorderTextStory/>)
  .add('Chat Input', () => <ChatInputStory/>)
  .add('Custom Header', () => <CustomHeaderStory/>)
  .add('Message Bubbles', () => <MessageBubbleStory/>);
