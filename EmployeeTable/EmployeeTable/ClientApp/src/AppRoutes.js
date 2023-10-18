import { Home } from "./components/Home";
import GetEmployees from "./components/GetEmployees";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/get-employees',
    element: <GetEmployees />
  }
];

export default AppRoutes;
