import Layout from "../components/layout/Layout";
import PageIntro from "../components/pageIntro/PageIntro";

const redPage = () => {
  return (
    <Layout title='Red'>
      <PageIntro
        title='The Greatness of Red'
        text="Scotland- One of the world's best selling Scotch whiskies. Fresh and robust, this powerful combination of spicy, smoky malts and lingering, lighter grains is perfect for mixing. A distinctive strength of character and a fullness of flavor provides international appeal."
        btnText='Shop Red'
      />
    </Layout>
  );
};
export default redPage;
