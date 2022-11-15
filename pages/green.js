import Layout from "../components/layout/Layout";
import PageIntro from "../components/pageIntro/PageIntro";

const greenPage = () => {
  return (
    <Layout title='Green'>
      <PageIntro
        title='The Greatness of Green'
        text='Scotland- A dynamic blend of Island and Speyside malts, each aged at least 15 years. The taste juxtaposes fresh fruit with wood smoke, pepper, deep vanilla and sandalwood. Perfectly balanced combination of only single malt whiskies that evokes the outdoors with its vibrant fresh flavor.'
        btnText='Shop Green'
      />
    </Layout>
  );
};
export default greenPage;
