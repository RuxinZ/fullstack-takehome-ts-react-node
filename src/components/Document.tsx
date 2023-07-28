import useWebSocket from 'react-use-websocket';
import WS_URL from '../WS_URL';
import { DefaultEditor } from 'react-simple-wysiwyg';

const Document: React.FC<{
  isDocumentEvent: (message: MessageEvent<any>) => boolean;
}> = ({ isDocumentEvent }): JSX.Element => {
  const {
    lastJsonMessage,
    sendJsonMessage,
  }: { lastJsonMessage: any; sendJsonMessage: any } = useWebSocket(
    WS_URL,
    {
      share: true,
      filter: isDocumentEvent,
    }
  );

  const html: string = lastJsonMessage?.data.editorContent || '';

  function handleHtmlChange(e: any) {
    sendJsonMessage({
      type: 'contentchange',
      content: e.target.value,
    });
  }

  return <DefaultEditor value={html} onChange={handleHtmlChange} />;
};

export default Document;
