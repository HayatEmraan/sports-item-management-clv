import MainLayOut from "./components/layout/layout";
import PrivateRoute from "./routes/private.route";

function App() {
  return (
    <PrivateRoute>
      <MainLayOut />
    </PrivateRoute>
  );
}

export default App;
