import Layout from "../components/layout/Layout";
import PageIntro from "../components/pageIntro/PageIntro";

const specialties = () => {
  return (
    <Layout title='Specialties'>
      <PageIntro
        title='Johnnie Walker Specialties'
        text='Scotland- This new whisky is chill filtered to 1.5 degrees celcius and best served cold directly from the freezer. Featuring notes of caramelized sugar and vanilla, fresh red berries with a touch of orchard fruit, this whisky develops in complexity as it warms to room temperature.'
        btnText='Shop Specialties'
      />
    </Layout>
  );
};
export default specialties;
