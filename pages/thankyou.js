import Layout from "../components/layout/Layout";
import PageIntro from "../components/pageIntro/PageIntro";
import Types from "../components/types/Types";

function thankyou() {
  return (
    <Layout title='Thank You'>
      <PageIntro title='Thank you for your purchase!' text='You will receive confirmation once order is shipped.' btnText='Contune Shopping' href='/' />
      <Types />
    </Layout>
  );
}

thankyou.auth = true;
export default thankyou;
