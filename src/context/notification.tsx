import Notification from "@/components/Notification";
import { Alert } from "@supabase/ui";
import {
  ComponentPropsWithoutRef,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

type Data = ComponentPropsWithoutRef<typeof Alert> & {
  message: string;
};

interface NotificationState {
  opened: boolean;
  data: Data | null;
  showNotification: (data: Data) => void;
}

const NotificationContext = createContext<NotificationState>({
  opened: false,
  data: null,
  showNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export default function NotificationProvider(
  { children }: { children: ReactNode },
) {
  const [data, setData] = useState<Data | null>(null);

  const showNotification = (data: Data) => {
    setData(data);

    setTimeout(() => {
      setData(null);
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{ opened: !!data, data, showNotification }}
    >
      {children}
      <Notification />
    </NotificationContext.Provider>
  );
}
