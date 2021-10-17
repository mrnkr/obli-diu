import { gql, useMutation } from '@apollo/client';
import useInterval from './useInterval';

const SEND_HEARTBEAT_MUTATION = gql`
  mutation SendHeartbeat {
    sendHeartbeat {
      id
      lastHeartbeatAt
    }
  }
`;

const useHeartbeat = () => {
  const [mutateFn] = useMutation(SEND_HEARTBEAT_MUTATION);
  useInterval(mutateFn, 30000);
};

export default useHeartbeat;
