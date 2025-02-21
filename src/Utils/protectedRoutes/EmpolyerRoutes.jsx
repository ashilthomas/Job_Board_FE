import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginModel from "../../Pages/LoginModal"
import { useToast } from "@/hooks/use-toast";

import instance from "../Axios";
import { useNavigate } from "react-router-dom";

const EmpolyerRoutes = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState(null); // Null means loading
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authView, setAuthView] = useState("login"); // 'login' or 'signup'
  const {toast} = useToast()

  // Function to open the modal
  const openModal = (view) => {
    setAuthView(view);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsAuthenticated(true); // User logged in
    navigate("/")
    
  };

  useEffect(() => {
    const checkEmployer = async () => {
      try {
        const res = await instance.get("auth/checkEmployer", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token properly
          },
        });

        if (res.data.success) {
          setIsAuthenticated(true);
          toast({
            title: "Success!",
            description: res.data.message || "Authentication successful.",
          });
        } else {
          openModal("login");
          setIsAuthenticated(false);
          toast({
            title: "Authentication Required",
            description: res.data.message || "Please log in to continue.",
            variant: "destructive",
          });
        }
      } catch (error) {
        openModal("login");
        setIsAuthenticated(false);
        toast({
          title: "Error",
          description: error.response?.data?.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    };

    if (token) {
        checkEmployer();
    } else {
      openModal("login");
      setIsAuthenticated(false);
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page.",
        variant: "destructive",
      });
    }
  }, [token]); // Re-run when the token changes

  if (isAuthenticated === null) {
    return <h2>Loading...</h2>; // Show loading while checking auth
  }

  return (
    <>
      {isModalOpen && <LoginModel closeModal={closeModal} initialView={authView} />}
      {!isModalOpen && isAuthenticated && children}
    </>
  );
};

export default EmpolyerRoutes;
