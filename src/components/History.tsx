import useWebSocket from 'react-use-websocket';
import WS_URL from '../WS_URL';

interface Activity {
  // fix
  message: string;
}

const History: React.FC<{
  isUserEvent: (message: any) => boolean;
}> = ({ isUserEvent }): JSX.Element => {
  console.log('history');
  const {
    lastJsonMessage,
  }: {
    lastJsonMessage: any; // FIX TYPE
  } = useWebSocket(WS_URL, {
    share: true,
    filter: isUserEvent,
  });

  const activities: Activity[] = lastJsonMessage?.data.userActivity || [];

  return (
    <ul>
      {activities.map((activity: Activity, index: number) => (
        <li key={`activity-${index}`}>{activity.message}</li>
      ))}
    </ul>
  );
};

export default History;
