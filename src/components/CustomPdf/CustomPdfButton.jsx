import React, { useEffect, useState } from 'react';
import { Alert } from '@twilio-paste/core/alert';
import { Theme } from '@twilio-paste/core/theme';
import { Button } from '@twilio-paste/core/button';
import { FileIcon } from "@twilio-paste/icons/esm/FileIcon";
import { DownloadIcon } from "@twilio-paste/icons/esm/DownloadIcon";
import { createPDF } from '../../helpers';

class CustomPdfButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        isOpen: true,
        showPDFButton : false
        };
    }


  render() {
  const conversationSid = this.props.task.attributes?.conversationSid;  
  return (
    <Theme.Provider theme="default">
        <Button variant="secondary_icon" size="icon" 
                onClick={ () => createPDF({conversationSid : conversationSid})}>
          <FileIcon decorative={false} title="Conversation Download" />
          <DownloadIcon decorative={false} title="Conversation Download" />
        </Button>
    </Theme.Provider>
  );
}
};

export default CustomPdfButton;
