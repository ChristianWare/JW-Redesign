import Layout from "../components/layout/Layout";
import PageIntro from "../components/pageIntro/PageIntro";

const bluePage = () => {
  return (
    <Layout title='Blue'>
      <PageIntro
        title='The Greatness of Blue'
        text='Scotland- Created from the rarest and most expensive whiskies in the world, individually numbered and produced in limited quantities. Johnnie Walker Blue has the authentic character and flavor of a traditional 19th century blend with traces of smoke, honey and spice on the silky finish.'
        btnText='Shop Blue'
      />
    </Layout>
  );
}
export default bluePage;