import React, { useState, useEffect } from 'react';
import Sidebar from './utils/Sidebar';
import Content from './utils/Content';

const HomePage = () => {
  const initialTabs = JSON.parse(sessionStorage.getItem('tabs')) || [
    { id: 1, name: 'Tab 1', searchState: { query: '', results: [], selectedMovie: null } }
  ];
  const initialSelectedTab = JSON.parse(sessionStorage.getItem('selectedTab')) || 1;
  const initialRecentSearches = JSON.parse(sessionStorage.getItem('recentSearches')) || [];

  const [tabs, setTabs] = useState(initialTabs);
  const [selectedTab, setSelectedTab] = useState(initialSelectedTab);
  const [recentSearches, setRecentSearches] = useState(initialRecentSearches);

  useEffect(() => {
    sessionStorage.setItem('tabs', JSON.stringify(tabs));
    sessionStorage.setItem('selectedTab', JSON.stringify(selectedTab));
    sessionStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [tabs, selectedTab, recentSearches]);

  const addNewTab = () => {
    const newTab = {
      id: Date.now(),
      name: `Tab ${tabs.length + 1}`,
      searchState: { query: '', results: [], selectedMovie: null }
    };
    setTabs([...tabs, newTab]);
    setSelectedTab(newTab.id);
  };

  const deleteTab = (tabId) => {
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(updatedTabs);
    sessionStorage.removeItem(`searchState_${tabId}`);

    if (selectedTab === tabId && updatedTabs.length > 0) {
      setSelectedTab(updatedTabs[0].id);
    } else if (updatedTabs.length === 0) {
      setSelectedTab(null);
    }
  };

  const updateSearchState = (tabId, newState) => {
    setTabs(tabs.map(tab => (tab.id === tabId ? { ...tab, searchState: newState } : tab)));
  };

  const addRecentSearch = (movieTitle) => {
    setRecentSearches(prev => {
      const newRecentSearches = [...prev.slice(-4), movieTitle];
      return newRecentSearches;
    });
  };

  const currentTab = tabs.find(tab => tab.id === selectedTab);

  return (
    <div className='flex max-sm:flex-col max-sm:min-h-screen w-auto bg-orange-400 min-h-auto bg-gradient-to-b from-orange-400 to-[#f06e62]'>
      <Sidebar
        tabs={tabs}
        selectedTab={selectedTab}
        addNewTab={addNewTab}
        setSelectedTab={setSelectedTab}
        deleteTab={deleteTab}
        recentSearches={recentSearches}
      />
      {currentTab && (
        <Content
          key={currentTab.id}
          tabId={currentTab.id}
          searchState={currentTab.searchState}
          updateSearchState={updateSearchState}
          addRecentSearch={addRecentSearch}
        />
      )}
    </div>
  );
};

export default HomePage;
