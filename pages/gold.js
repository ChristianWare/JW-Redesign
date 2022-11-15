import Layout from "../components/layout/Layout";
import PageIntro from "../components/pageIntro/PageIntro";

const goldPage = () => {
  return (
    <Layout title="Gold">
      <PageIntro
        title='The Greatness of Gold'
        text="Scotland- A skillful fusion of rare aged whiskies inspired by the notes originally kept by Sir Alexander Walker. Crafted from only a small number of Scotland's most renowned distilleries. Exceptionally smooth, creamy and delicate. Available in limited edition bottle. Perfect for gifts."
        btnText='Shop Gold'
      />
    </Layout>
  );
}
export default goldPage;