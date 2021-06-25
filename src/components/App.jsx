import "../styles/index.sass";
import Recipes from "./Recipes";
const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>This is React</h1>
        </section>
      </main>

      <Recipes />
    </>
  );
};

export default App;
