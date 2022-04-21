import "./App.css";
import StudentsList from './App1';
import { LoginSignup } from "./LoginSignup";

export default function Main() {
  return (
    sessionStorage.getItem('college-management-system-token') ?
        <StudentsList />
        :
        <LoginSignup />
  );
}