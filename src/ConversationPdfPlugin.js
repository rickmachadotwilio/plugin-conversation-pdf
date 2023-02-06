import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomPdfButton from './components/CustomPdf/CustomPdfButton';

const PLUGIN_NAME = 'ConversationPdfPlugin';

export default class ConversationPdfPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const options = { sortOrder: -1 };
    // flex.AgentDesktopView.Panel1.Content.add(<CustomPdfButton key="CustomPdfButton-component" />, options);
       flex.TaskCanvasHeader.Content.add(<CustomPdfButton key="CustomPdfButton-component" />, 
          {
            sortOrder: 1,
            if: props =>
              props.channelDefinition.capabilities.has('Chat') &&
              props.task.taskStatus === 'wrapping'
          }
       )
  }
}
