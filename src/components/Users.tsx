import useWebSocket from 'react-use-websocket';
import Avatar from 'react-avatar';
import WS_URL from '../WS_URL';

const Users: React.FC<{
  isUserEvent: (message: MessageEvent<any>) => boolean;
}> = ({ isUserEvent }): JSX.Element[] => {
  const {
    lastJsonMessage,
  }: {
    lastJsonMessage: any | null; // FIX TYPE
  } = useWebSocket(WS_URL, {
    share: true,
    filter: isUserEvent,
  });

  const users: any = Object.values(lastJsonMessage?.data.users || {});

  return users.map((user: any) => (
    <div key={user.username}>
      {/* <p>User</p> */}
      <span id={user.username} className="userInfo" key={user.username}>
        <Avatar name={user.username} size={'40'} round="20px" />
      </span>
      <div>{user.username}</div>
    </div>
  ));
};

export default Users;
