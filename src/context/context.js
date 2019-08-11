import React from 'react';

const appContext = React.createContext ({
    level: 1,
    xp: 0,
    levelMultiplier: 2, //1 = fast, 2 = balanced, 3 = slow
    questDecay: 3  // "No decay" option for individual tasks/quests?
});

export default appContext;