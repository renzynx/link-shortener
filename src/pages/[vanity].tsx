import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

const Redir: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ data }) => {
    return (
      <main className="flex min-w-full min-h-[100vh] justify-center items-center">
        <h1 className="text-3xl">
          Redirecting to{"  "}
          <span className="text-sky-400 underline cursor-pointer">
            {data.link}
          </span>
        </h1>
      </main>
    );
  };

export default Redir;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { vanity } = ctx.query as Record<string, string>;

  if (!vanity) {
    return {
      notFound: true,
    };
  }

  const supabase = createServerSupabaseClient<Database>(ctx);

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("slug", vanity)
    .single();

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
    redirect: {
      permanent: false,
      destination: data.link,
    },
  };
};
