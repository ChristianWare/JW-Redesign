import Layout from "../components/layout/Layout";
import PageIntro from "../components/pageIntro/PageIntro";

const blackPage = () => {
  return (
    <Layout title='Black'>
      <PageIntro
        title='The Greatness of Black'
        text='Scotland- The original Walker family blend, handcrafted from as many as 40 of the finest Scotch whiskies aged a minimum of 12 years, for a smooth and robust blend. Rich smoky malt, peat and sherry fruit character deliver a satisfyingly complex flavor on the long, lingering finish.'
        btnText='Shop Black'
      />
    </Layout>
  );
};
export default blackPage;
