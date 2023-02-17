import { useNotification } from "@/context/notification";
import { Alert } from "@supabase/ui";

export default function Notification() {
  const { opened, data } = useNotification();

  return opened
    ? (
      <div className="absolute bottom-5 right-5 animation-slideIn">
        <Alert
          title={data?.title!}
          variant={data?.variant ?? "success"}
          withIcon
          closable
        >
          {data?.message}
        </Alert>
      </div>
    )
    : null;
}
