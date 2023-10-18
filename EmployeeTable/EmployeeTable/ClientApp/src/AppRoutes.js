import { Home } from "./components/Home";
import GetEmployees from "./components/GetEmployees";
import AddEmployee from "./components/AddEmployee";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/get-employees',
    element: <GetEmployees />
  },
  {
    path: '/add-employee',
    element: <AddEmployee />
  }
];

export default AppRoutes;
