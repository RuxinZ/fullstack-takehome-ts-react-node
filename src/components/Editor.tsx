// import Users from './Users';
import Document from './Document';
import History from './History';
import './Editor.css';
const Editor: React.FC<{
  isUserEvent: (message: MessageEvent<any>) => boolean;
  isDocumentEvent: (message: MessageEvent<any>) => boolean;
}> = props => {
  return (
    <div className="main-container">
      <div className="doc-container">
        <div className="current-users">
          List of current users
          {/* {<Users isUserEvent={props.isUserEvent} />} */}
        </div>
        <Document isDocumentEvent={props.isDocumentEvent} />
      </div>
      <div className="history-container">
        Activity Log
        <History isUserEvent={props.isUserEvent} />
      </div>
    </div>
  );
};

export default Editor;
