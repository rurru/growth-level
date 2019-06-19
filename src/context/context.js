import React from 'react';

const appContext = React.createContext ({
    level: 1,
    xp: 0,
    levelingSpeed: "balanced",
    questDecay: 3
});

export default appContext;