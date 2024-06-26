import InputMovie from "../components/InputMovie";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

export default function AddMovie() {
  return (
    <Layout>
      <Navbar />

      <div className="mt-20 mx-6">
        <h1 className="font-primary text-2xl">ADD MOVIE...</h1>

        <form className="mt-10">
          <div className="flex">
            <div className="flex-1 grid gap-7">
              <InputMovie text="Movie Title" />
              <InputMovie text="Release Year" />
              <InputMovie text="Genre" />
            </div>

            <div className="flex-1">photo here</div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
