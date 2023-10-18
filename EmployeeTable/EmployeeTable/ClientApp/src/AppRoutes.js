import { Home } from "./components/Home";
import GetEmployees from "./components/GetEmployees";
import AddEmployee from "./components/AddEmployee";
import RemoveEmployee from "./components/RemoveEmployee";
import EditEmployee from "./components/EditEmployee";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/get',
    element: <GetEmployees />
  },
  {
    path: '/add',
    element: <AddEmployee />
  },
  {
    path: '/remove',
    element: <RemoveEmployee />
  },
  {
    path: '/edit',
    element: <EditEmployee />
  }
];

export default AppRoutes;
