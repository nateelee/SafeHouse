import React, { useState } from "react";

export default UserContext = React.createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const resetUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

const { Consumer } = UserContext;

export { UserContextProvider, Consumer as UserContextConsumer };
