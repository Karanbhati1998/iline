// src/SocketContext.js
import React, { createContext, useContext, useEffect } from "react";
import socketInstance from "./socket";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    return () => {
      socketInstance.disconnect(); // Clean up on unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};
