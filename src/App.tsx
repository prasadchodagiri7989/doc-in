
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetail from "./pages/QuestionDetail";
import Profile from "./pages/Profile";
import AISolver from "./pages/AISolver";
import NotFound from "./pages/NotFound";
import Signup from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Questions from "./pages/Questions";
import PostAuthRedirect from "./pages/PostAuthRedirect";
import DoctorForm from "./pages/DoctorRole";
import SelectRole from "./pages/SelectRole";
import StudentForm from "./pages/StudentRole";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ask-question" element={<AskQuestion />} />
          <Route path="/questions/:id" element={<QuestionDetail />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/ai-solver" element={<AISolver />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup/>} />
          <Route path="/post-auth-redirect" element={<PostAuthRedirect />} />
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/doctor-form" element={<DoctorForm />} />
          <Route path="/student-form" element={<StudentForm />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
