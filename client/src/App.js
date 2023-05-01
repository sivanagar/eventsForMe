import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import FileUpload from "./components/FileUpload";
import FileDownload from "./components/FileDownload";
//import { EventList } from "./components/EventList/EventList";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Cart from "./components/Cart/Cart";
import CreateEvent from "./pages/CreateEvent/CreateEvent";

import MyTickets from "./pages/MyTickets/MyTickets";
import Account from "./pages/AccountDetails/AccountDetails";

import NoMatch from "./pages/NoMatch";

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

//establish a new link to the GraphQL server
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



//wrap JSX with ApolloProvider
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />

          <div className="container">
            {/* <Home /> */}

            <Routes>
              <Route index element={<Home />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="sign-up" element={<Signup />}></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="create-event" element={<CreateEvent />}></Route>
              <Route path="cart" element={<Cart />}></Route>

              <Route path="file-upload" element={<FileUpload />}></Route>
              <Route path="file-download" element={<FileDownload />}></Route>
              <Route path="my-tickets" element={<MyTickets />}></Route>
              <Route path="account" element={<Account />}></Route>

              <Route path="*" element={<NoMatch />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
