import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ConversationPage } from "./pages/conversations/ConversationsPage";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { AuthContext } from "./utils/context/AuthContext";
import { User } from "./utils/types";
import React, { PropsWithChildren, useState } from "react";
import { ConversationChannelPage } from "./pages/conversations/ConversationChannelPage";
import { SocketContext, socket } from "./utils/context/SocketContext";
import { Socket } from "socket.io-client";
import { AppPage } from "./pages/AppPage";
import { ToastContainer } from "react-toastify";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { FriendsLayoutPage } from "./pages/friends/FriendsLayoutPage";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});
const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#1a1a1a",
        color: "#fff",
        fontFamily: `'Inter', sans-serif`
      }
    }
  }
});
type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  socket: Socket;
};
function AppWithProviders({
  children,
  user,
  setUser
}: PropsWithChildren & Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AppWithProviders user={user} setUser={setUser} socket={socket}>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/signup" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route element={<AuthenticatedRoute children={<AppPage />} />}>
            <Route
              path="/conversations"
              element={
                <AuthenticatedRoute>
                  <ConversationPage></ConversationPage>
                </AuthenticatedRoute>
              }
            >
              <Route path=":id" element={<ConversationChannelPage />} />
            </Route>
            <Route path="/friends" element={<FriendsLayoutPage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </ChakraProvider>
    </AppWithProviders>
  );
}

export default App;
