import "./App.css";
import StudentsManagement from './StudentsManagement';
import { LoginSignup } from "./LoginSignup";
import StudentsTable from "./StudentsTable";

export default function Main() {
  return (
    sessionStorage.getItem('college-management-system-token') ?
        <div>
          <StudentsManagement />
          {/* <StudentsTable /> */}
        </div>
        :
        <LoginSignup />
  );
}