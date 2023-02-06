import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Manager } from "@twilio/flex-ui";



pdfMake.vfs = pdfFonts.pdfMake.vfs;
const fontDefinition = {
  'Roboto': {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

export const createPdfContent = (data) => {
  if (Array.isArray(data.items)) {
    //console.log('##### Items ', data.items)
    //return 
    return data.items.map((m, index) => [
      //console.log('##### m.body', m.body) [
      {
        text: m.author,
        normal: true,
        bold: true,
        fontSize: 10,
        font: 'Roboto'
      },
      {
        text: m.body,
        normal: true,
        fontSize: 9,
        font: 'Roboto'
      },
      {
        text: '\n',
      }
    ]);
  }
  return [];
};

export const createPDF = async (payload) => {
    console.log('#### creating PDF file for Conversation : ', payload.conversationSid)

    const conversationSid = payload.conversationSid;
    const conversation = await Manager.getInstance().conversationsClient.getConversationBySid(conversationSid);
    // console.log('###### conversation : ', conversation)
    
    //retrive conversation messages 
    let messages = await conversation.getMessages();
    //console.log('###### messages ', messages);

    //Generate the PDF content passing the conversation messages
    const pdfContent = await createPdfContent(messages);
    
    //append Header to PDF Content
    pdfContent.unshift( {
      text: `Transcript for Conversation Id : ${conversationSid}` + '\n\n\n',
      style: "header",
      alignment: "left"
    });
    
    //console.log(pdfContent);

    //create the PDF file with the conversation/transcript
    const docDefinition = {
        pageSize: "A4",
        pageMargins: [40, 60, 40, 60],
        content: pdfContent,
        defaultStyle: {
          font: 'Roboto'
        },
        styles: {
          header: {
            fontSize: 12,
            bold: true
          }
        },
        fonts: fontDefinition
      };
      
      //Crete the PDRF file
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      //Download the PDF File with the conversation Id as file name
      pdfDocGenerator.download(`${conversationSid}.pdf`);

};


