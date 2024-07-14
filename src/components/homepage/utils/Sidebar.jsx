import React from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";


const Sidebar = ({ tabs, selectedTab, addNewTab, setSelectedTab, deleteTab, recentSearches }) => {
  const handleDelete = (tabId) => {
    deleteTab(tabId);
  };

  return (
    <div className='min-h-screen min-w-[15vw] flex flex-col p-[20px] gap-[15px]'>
      <span className='text-center text-[25px] font-semibold bg-[#e5ac39] text-gray-800 rounded-[15px]'>
        Movies Mania
      </span>
      <div className='flex flex-col mt-[20px]'>
        <span className='text-[#a55635] mb-[10px]'>Recent searches</span>
        <div className='ml-[10px]'>
          {recentSearches.map((search, index) => (
            <div key={index} className='text-sm'>{search}</div>
          ))}
        </div>
      </div>
      <hr className="border-t-2 border-orange-500 my-6"></hr>
      <div onClick={addNewTab} className='cursor-pointer flex flex-row justify-center text-[#a55635] gap-[10px] items-center'>
        <FaRegPlusSquare className='text-[20px]'/>
        <span className='text-top'>New tab</span>
      </div>
      <div className='flex flex-col gap-[10px] '>
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`cursor-pointer flex justify-between p-[10px] rounded-lg ${selectedTab === tab.id ? 'bg-[#e3e3e3]' : ''}`}
          >
            {tab.name}
            {tabs.length > 1 && (
              <button className='ml-2 text-red-500' onClick={(e) => { e.stopPropagation(); handleDelete(tab.id); }}>
                <MdDeleteOutline className='text-[20px]' />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
