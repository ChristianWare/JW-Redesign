import { useRouter } from "next/router";
import PageIntro from "../components/pageIntro/PageIntro";
import Layout from "../components/layout/Layout";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title='Unauthorized Page'>
      <PageIntro
        title='Access Denied'
        text='You are not authorized to view the contents of this page.'
        btnText='home'
      />
      {message && <div className='text-red-500'>{message}</div>}
    </Layout>
  );
}
