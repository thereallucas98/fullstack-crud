import { Route, Routes } from "react-router-dom";

import { DefaultLayout } from "../layouts";

import { CreateUser } from "../pages/private/CreateUser";
import { Dashboard } from "../pages/private/Dashboard";
import { UserList } from "../pages/private/UserList";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<CreateUser />} />
      </Route>
    </Routes>
  );
}