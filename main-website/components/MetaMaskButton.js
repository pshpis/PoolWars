import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import meta from "../styles/meta.module.css";
export const MetaMaskButton = () => {
  const connectWithMetamask = useMetamask();
  const disconnectWithMetamask = useDisconnect();
  const address = useAddress();

  return (
    <div>
      {address ? (
        <button
          id={meta.MetamaskLogin}
          className={`${meta.button} ${meta.button_primary}  ${meta.button_medium} ${meta.button_outline}`}
          onClick={disconnectWithMetamask}
        >
          <span className={meta.button__user_name}>{address} </span>
        </button>
      ) : (
        <button
          id={meta.MetamaskConnect}
          className={`${meta.button} ${meta.button_primary}  ${meta.button_medium} ${meta.button_outline}`}
          onClick={connectWithMetamask}
        >
          <span>Connect MetaMask</span>
        </button>
      )}
    </div>
  );
};
