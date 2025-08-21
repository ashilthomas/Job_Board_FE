import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import instance from "../Axios";
import LoginModel from "@/Pages/LoginModal";
import Loader from "@/Components/Loader/Loader";

const ProtectedRoute = ({ children, checkEndpoint }) => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authView, setAuthView] = useState("login");

  const openModal = (view = "login") => {
    setAuthView(view);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/"); // redirect home on close
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await instance.get(`/auth/${checkEndpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setIsAuthenticated(true);
        } else {
          openModal();
          setIsAuthenticated(false);
          toast({
            title: "Authentication Required",
            description: res.data.message || "Please log in to continue.",
            variant: "destructive",
          });
        }
      } catch (error) {
        openModal();
        setIsAuthenticated(false);
        toast({
          title: "Error",
          description: error.response?.data?.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    };

    if (token) {
      checkAuth();
    } else {
      openModal();
      setIsAuthenticated(false);
    }
  }, [token, checkEndpoint]);

  if (isAuthenticated === null) return <Loader/>;

  return (
    <>
      {isModalOpen && <LoginModel closeModal={closeModal} initialView={authView} />}
      {!isModalOpen && isAuthenticated && children}
    </>
  );
};

export default ProtectedRoute;
